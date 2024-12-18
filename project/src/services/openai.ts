import OpenAI from 'openai';
import { postTypePrompts } from '../config/prompts';
import { PostType } from '../types/openai';
import { handleOpenAIError } from '../utils/errorHandling';
import { fetchBlogContent } from '../utils/fetchContent';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error('OpenAI API key is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateInstagramIdea(blogUrl: string, stage: string, postType: string): Promise<string> {
  try {
    const blogContent = await fetchBlogContent(blogUrl);
    
    if (!blogContent) {
      throw new Error('No blog content found to transform');
    }

    const truncatedContent = blogContent.slice(0, 4000);

    const systemPrompt = postTypePrompts[postType as PostType];
    
    if (!systemPrompt) {
      throw new Error('Invalid post type');
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: `Transform this blog content into an Instagram ${postType} post focusing on the ${stage} stage of AIDA. Blog content: ${truncatedContent}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    return content;
  } catch (error) {
    const handledError = handleOpenAIError(error);
    console.error('Error generating Instagram idea:', handledError);
    throw handledError;
  }
}