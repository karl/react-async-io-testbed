export const Placeholder = ({ isLoading, fallback, children }) => {
  return isLoading ? fallback : children;
};
