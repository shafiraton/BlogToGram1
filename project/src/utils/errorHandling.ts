import { OpenAIError } from '../types/openai';

export function handleOpenAIError(error: unknown): Error {
  if (error instanceof Error) {
    const openAIError = error as OpenAIError;
    
    // Handle specific OpenAI API errors
    if (openAIError.status === 429) {
      return new Error('Rate limit exceeded. Please try again later.');
    }
    if (openAIError.code === 'invalid_api_key') {
      return new Error('Invalid API key. Please check your configuration.');
    }
    if (openAIError.message.includes('fetch')) {
      return new Error('Unable to fetch blog content. Please check the URL and try again.');
    }
    
    // Return the original error message if it's a known error
    return error;
  }
  
  // Generic error for unknown cases
  return new Error('An unexpected error occurred. Please try again.');
}