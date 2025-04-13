import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
    try {
      const decision = await aj.protect(req, { requested: 1 });
  
      if (decision.conclusion === "DENY") {
  
        if (decision.reason?.type === "RATE_LIMIT") {
          return res.status(429).json({ error: "Too Many Requests" });
        }
  
        if (decision.reason?.type === "BOT") {
          return res.status(403).json({ error: "No bots allowed" });
        }
  
        return res.status(403).json({ error: "Access denied" });
      }
  
      // ✅ allow request to continue
      next();
    } catch (error) {
      console.log(`Arcjet Middleware Error: ${error}`);
      next(error);
    }
  };
  

export default arcjetMiddleware;
