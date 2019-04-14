const whitelist = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://gg.raredevil.co.uk',
  'https://gg.raredevil.co.uk'
];

/**
 * Sets cors configuration for the response
 * 
 * If the origin domain is not in the whitelist then throw an error
 */
const corsConfig = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Origin (' + origin + ') is not allowed by CORS.'))
    }
    
  }  
}

export default corsConfig;