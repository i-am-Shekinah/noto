import ratelimit from '../config/upstash.js';

const rateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip || req.connection.remoteAddress;
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return res.status(429).json({
        message: 'Too many requests, please try again later.',
        description: 'You have exceeded the rate limit for this endpoint. Please wait before making more requests.'
      });
    }
    next();
  } catch (error) {
    console.error('Rate limiter error:', error);
    res.status(500).json({
      message: 'Internal server error',
      description: 'An error occurred while processing your request. Please try again later.'
    });
    next(error);
  }
}

export default rateLimiter;