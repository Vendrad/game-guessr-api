'use strict';

const error = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  
  console.log(err)

  if (process.env.NODE_ENV === 'development') {
    res.send(err.message);
  } else {
    res.sendStatus(500);
  }
}

export default error;