const express = require('express')
const app = express()
const consign = require('consign')
const bodyparser = require('body-parser')
const cors = require("cors")
const morgan  = require('morgan')
const helmet = require("helmet")
const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config()
const apk = process.env.TOKEN


console.log(apk)
 

 /* app.use(app.static(path.join(__dirname,'../')) ) */
app.use(bodyparser.json())
app.use(morgan("combined"))
app.use(cors()) 
app.use(helmet()); // Add security headers

const services = [
    {
      route: "/auth",
      target: "https://teste/auth",
    },
    {
      route: "/users",
      target: "https://your-deployed-service.herokuapp.com/users/",
    },
    {
      route: "/chats",
      target: "https://your-deployed-service.herokuapp.com/chats/",
    },
    {
      route: "/payment",
      target: "https://your-deployed-service.herokuapp.com/payment/",
    },
    // Add more services as needed
  ];


// Define rate limit constants
const rateLimit = 20; // Max requests per minute
const interval = 60 * 1000; // Time window in milliseconds (1 minute)

// Object to store request counts for each IP address
const requestCounts = {};

// Reset request count for each IP address every 'interval' milliseconds
setInterval(() => {
  Object.keys(requestCounts).forEach((ip) => {
    requestCounts[ip] = 0; // Reset request count for each IP address
  });
}, interval);

// Middleware function for rate limiting and timeout handling
function rateLimitAndTimeout(req, res, next) {
  const ip = req.ip; // Get client IP address

  // Update request count for the current IP
  requestCounts[ip] = (requestCounts[ip] || 0) + 1;

  // Check if request count exceeds the rate limit
  if (requestCounts[ip] > rateLimit) {
    // Respond with a 429 Too Many Requests status code
    return res.status(429).json({
      code: 429,
      status: "Error",
      message: "Rate limit exceeded.",
      data: null,
    });
  }

  // Set timeout for each request (example: 10 seconds)
  req.setTimeout(15000, () => {
    // Handle timeout error
    res.status(504).json({
      code: 504,
      status: "Error",
      message: "Gateway timeout.",
      data: null,
    });
    req.abort(); // Abort the request
  });

  next(); // Continue to the next middleware
}

// Apply the rate limit and timeout middleware to the proxy
app.use(rateLimitAndTimeout);

// Set up proxy middleware for each microservice
services.forEach(({ route, target }) => {
  // Proxy options
  const proxyOptions = {
    target,
    changeOrigin: true,
    pathRewrite: {
      [`^${route}`]: "",
    },
  };

  // Apply rate limiting and timeout middleware before proxying
  app.use(route, rateLimitAndTimeout, createProxyMiddleware(proxyOptions));
});


  
/* consign()
.include('../src/models/')
.then('../src/routes')
.into(app) */



module.exports = app

