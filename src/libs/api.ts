export const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_URL || '/backend';
  }
  return process.env.BACKEND_URL || 'http://campgroundbackend.us-east-1.elasticbeanstalk.com';
};