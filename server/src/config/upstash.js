import dotenv from 'dotenv';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

dotenv.config();

// create a ratelimiter that allows 100 requests per 15 minutes
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, '10 s'),
});


export default ratelimit;