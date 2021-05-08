const isProduction = process.env.NODE_ENV === 'production';

const devApiConfig = {
  baseUrl: process.env.REACT_APP_BASE_API_URL as string,
};

const prodApiConfig = {
  baseUrl: process.env.REACT_APP_BASE_API_URL as string,
};

const apiConfig = isProduction ? prodApiConfig : devApiConfig;

export { apiConfig };
