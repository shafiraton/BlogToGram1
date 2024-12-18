export interface PromptConfig {
  system: {
    role: 'system';
    content: string;
  };
  temperature: number;
  max_tokens: number;
}

export interface GenerateIdeaParams {
  blogUrl: string;
  stage: string;
  postType: string;
}

export interface OpenAIError extends Error {
  status?: number;
  code?: string;
}

export type PostType = 'Single Image' | 'Video' | 'Carousel' | 'Story' | 'Reel';

export type PostTypePrompts = {
  [K in PostType]: string;
};