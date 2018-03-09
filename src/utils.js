export const cachedAsync = (fn) => {
  let promise = null;
  return (...args) => {
    if (!promise) {
      promise = fn(...args);
    }
    return promise;
  };
};
