export class BlogContentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BlogContentError';
  }
}

export class ContentExtractionError extends BlogContentError {
  constructor(message: string) {
    super(message);
    this.name = 'ContentExtractionError';
  }
}

export class NetworkError extends BlogContentError {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class ValidationError extends BlogContentError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}