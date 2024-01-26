import apicache from "apicache"
const cacheController = (req, res, next) => {
  
    if (req.method === 'GET') {
      // Apply apicache middleware for GET requests
      return apicache.middleware('5 minutes')(req, res, next);
    }
    // Continue to the next middleware for non-GET requests
    next();
  };
  export default cacheController;