module.exports = (request, options) => {
  // Remove any query parameters in the request path
  // (e.g. ?worker, which Vite uses for worker imports)
  if (request.includes('?')) {
    return options.defaultResolver(request.replace(/\?.*/,''), options);
  }

  return options.defaultResolver(request, options);
};
