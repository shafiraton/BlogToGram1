import * as cheerio from 'cheerio';
import { convert } from 'html-to-text';
import { ContentExtractionError } from './errors';

const CONTENT_SELECTORS = [
  'article',
  '.post-content',
  '.entry-content',
  '.content',
  'main',
  '#main-content',
  '.blog-post',
  '.post',
  'article[role="article"]',
  '[itemprop="articleBody"]'
];

export function extractContent(html: string): string {
  try {
    const $ = cheerio.load(html);
    
    // Remove unnecessary elements
    $('script, style, nav, header, footer, iframe, noscript, .comments, .sidebar, .advertisement').remove();
    
    // Try to find content using selectors
    let content = '';
    for (const selector of CONTENT_SELECTORS) {
      const element = $(selector).first();
      if (element.length > 0) {
        content = element.html() || '';
        break;
      }
    }

    // Fallback to body if no content found
    if (!content) {
      content = $('body').html() || '';
    }

    if (!content) {
      throw new ContentExtractionError('No content found in HTML');
    }

    // Convert HTML to plain text
    const plainText = convert(content, {
      wordwrap: 130,
      selectors: [
        { selector: 'img', format: 'skip' },
        { selector: 'a', options: { ignoreHref: true } }
      ]
    });

    // Clean up the text
    const cleanText = plainText
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n')
      .trim();

    if (!cleanText) {
      throw new ContentExtractionError('No text content found after cleaning');
    }

    return cleanText;
  } catch (error) {
    if (error instanceof ContentExtractionError) {
      throw error;
    }
    throw new ContentExtractionError('Failed to extract content from HTML');
  }
}