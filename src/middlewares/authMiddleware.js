const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

exports.requireAuth = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("Token", token);    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }
    
    try {
      const decodedToken = jwt.decode(token);
      if (decodedToken) {
        // Successfully decoded token
        const userId = decodedToken.sub;
        // Use the decoded information as needed
        req.userId = userId;
        next();
      } else {
        return res.status(401).json({ message: 'Invalid token' });
      }
    } catch (err) {
      console.error(err); // Log any decoding errors
      return res.status(401).json({ message: 'Invalid token' });
    }
    
};
