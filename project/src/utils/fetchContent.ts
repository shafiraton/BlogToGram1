import axios from 'axios';
import { isValidUrl } from './validation';
import http from './http';
import { extractContent } from './contentExtractor';
import { BlogContentError, NetworkError, ValidationError } from './errors';
import toast from 'react-hot-toast';

export async function fetchBlogContent(url: string): Promise<string> {
  try {
    // Validate URL
    if (!isValidUrl(url)) {
      throw new ValidationError('Invalid URL format');
    }

    // Try to fetch without proxy first
    try {
      const directResponse = await http.get(url);
      if (directResponse.data) {
        return extractContent(directResponse.data);
      }
    } catch (directError) {
      // If direct request fails, continue with proxy
      console.log('Direct request failed, trying proxy...');
    }

    // Use CORS proxy with retry mechanism
    const corsProxy = 'https://corsproxy.io/?';
    const proxyUrl = `${corsProxy}${encodeURIComponent(url)}`;
    
    const response = await http.get(proxyUrl);

    if (!response.data) {
      throw new NetworkError('Empty response from server');
    }

    // Extract and clean content
    const content = extractContent(response.data);
    
    if (!content || content.length < 50) {
      throw new BlogContentError('Insufficient content extracted from the blog');
    }

    return content;
  } catch (error) {
    if (error instanceof ValidationError) {
      toast.error('Please enter a valid URL');
      throw error;
    }
    if (error instanceof NetworkError) {
      toast.error('Unable to fetch blog content. Please check your internet connection.');
      throw error;
    }
    if (error instanceof BlogContentError) {
      toast.error('Unable to extract content from the blog. Please try a different URL.');
      throw error;
    }
    if (axios.isAxiosError(error)) {
      toast.error('Network error occurred. Please try again.');
      throw new NetworkError(`Network error: ${error.message}`);
    }
    
    toast.error('An unexpected error occurred. Please try again.');
    throw new BlogContentError('Failed to fetch blog content');
  }
}