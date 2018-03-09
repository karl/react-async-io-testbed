export const createFetcher = (method) => {
  let resolved = new Map();
  return {
    read: (key) => {
      if (!resolved.has(key)) {
        resolved.set(key, method(key));
      }
      return resolved.get(key);
    },
  };
};
