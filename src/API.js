import axios from 'axios';

const API_KEY = 'ad654bc604a2b45319e75bcf6764eb7b';
const baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZDY1NGJjNjA0YTJiNDUzMTllNzViY2Y2NzY0ZWI3YiIsInN1YiI6IjY2NGRkZTdiNjAxYjA2YmQ3ZWYyODBiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eyhwssKI-OzE2A08rrcyL_D2EPYo5NkT8Xq0f8FT8Ws',
  },
};

export const getTrendsMovies = async () => {
  const response = await axios.get(
    `${baseURL}trending/movie/day?api_key=${API_KEY}`,
    {
      params: { language: 'en-US' },
      ...options,
    }
  );

  return response.data;
};

export const getMovieById = async movieId => {
  const response = await axios.get(
    `${baseURL}movie/${movieId}?api_key=${API_KEY}`,
    {
      params: { language: 'en-US' },
      ...options,
    }
  );
  return response.data;
};

export const getCast = async movieId => {
  const response = await axios.get(
    `${baseURL}movie/${movieId}/credits?api_key=${API_KEY}`,
    {
      params: { language: 'en-US' },
      ...options,
    }
  );
  return response.data;
};

export const getReviews = async (movieId, page) => {
  const response = await axios.get(
    `${baseURL}movie/${movieId}/reviews?api_key=${API_KEY}`,
    {
      params: {
        language: 'en-US',
        page: page,
      },
      ...options,
    }
  );
  return response.data;
};

export const getMovieByKeyWord = async query => {
  const response = await axios.get(
    `${baseURL}search/movie?api_key=${API_KEY}`,
    {
      params: {
        language: 'en-US',
        query: query,
        page: 1,
        include_adult: false,
      },
    }
  );

  return response.data;
};
