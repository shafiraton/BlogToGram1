import axios from 'axios';
import axiosRetry from 'axios-retry';

const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://api.allorigins.win/raw?url=',
  'https://proxy.cors.sh/'
];

const http = axios.create({
  timeout: 15000,
  headers: {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
});

// Configure retry behavior
axiosRetry(http, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
           error.code === 'ECONNABORTED' ||
           error.response?.status === 429;
  },
  onRetry: (retryCount, _error, requestConfig) => {
    // Try different CORS proxy on each retry
    if (requestConfig.url) {
      const originalUrl = decodeURIComponent(requestConfig.url.split('?url=').pop() || '');
      const nextProxy = CORS_PROXIES[retryCount % CORS_PROXIES.length];
      requestConfig.url = `${nextProxy}${encodeURIComponent(originalUrl)}`;
    }
  }
});

export default http;