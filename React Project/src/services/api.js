import axios from 'axios';
import { store } from '../store';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
console.log('API Key available:', !!API_KEY); 

if (!API_KEY) {
  console.error('TMDb API key is missing. Please check your .env file.');
}

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_LANGUAGE = 'en';
const DEFAULT_POSTER_URL = '/placeholder.jpg';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: DEFAULT_LANGUAGE,
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('Successful API response from:', response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
        params: error.config.params
      });
      throw new Error(error.response.data.status_message || 'API Error occurred');
    } else if (error.request) {
      console.error('Network Error:', error.request);
      throw new Error('Network error occurred. Please check your connection.');
    } else {
      console.error('Request Error:', error.message);
      throw error;
    }
  }
);

// Request interceptor to add language parameter
api.interceptors.request.use((config) => {
  const state = store.getState();
  config.params = {
    ...config.params,
    language: state.language.currentLanguage,
  };
  return config;
});

// API endpoints with error handling
export const getMovies = async (page = 1, language = 'en') => {
  try {
    const response = await api.get('/movie/now_playing', { params: { page, language } });
    return response;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId, language = 'en') => {
  try {
    const response = await api.get(`/movie/${movieId}`, { params: { language } });
    return response;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getMovieRecommendations = async (movieId, language = 'en') => {
  try {
    const response = await api.get(`/movie/${movieId}/recommendations`, { params: { language } });
    return response;
  } catch (error) {
    console.error('Error fetching movie recommendations:', error);
    throw error;
  }
};

export const getMovieReviews = async (movieId, language = 'en') => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews`, { params: { language } });
    return response;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};

export const searchMovies = async (query, page = 1, language = 'en') => {
  try {
    const response = await api.get('/search/movie', { params: { query, page, language } });
    return response;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const getTVShows = async (page = 1, language = 'en') => {
  try {
    const response = await api.get('/tv/popular', { params: { page, language } });
    return response;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    throw error;
  }
};

export const getTVShowDetails = async (tvId, language = 'en') => {
  try {
    const response = await api.get(`/tv/${tvId}`, { params: { language } });
    return response;
  } catch (error) {
    console.error('Error fetching TV show details:', error);
    throw error;
  }
};

export const getImageUrl = (path) => {
  if (!path) {
    console.log('No image path provided, using placeholder');
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  // Make sure path starts with a forward slash
  const formattedPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${IMAGE_BASE_URL}${formattedPath}`;
  console.log('Generated image URL:', fullUrl);
  return fullUrl;
};

export const setLanguage = (language) => {
  api.defaults.params.language = language;
  // Update document direction based on language
  document.dir = language === 'ar' ? 'rtl' : 'ltr';
};

// Export configuration
export const config = {
  API_KEY,
  BASE_URL,
  IMAGE_BASE_URL,
  SUPPORTED_LANGUAGES: ['en', 'ar', 'fr', 'zh'],
};

export default api; 