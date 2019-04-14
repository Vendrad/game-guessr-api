/* eslint-disable consistent-return */
import log from '../logging/Logger';

/**
 * Handles displaying errors in the app
 *
 * @param {*} err The error that occured
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next Next middleware
 */
const standardError = (err, req, res, next) => {
  // If headers already sent then move on to the next middleware in the stack
  if (res.headersSent) {
    return next(err);
  }

  // Log error to console
  log(err);

  /**
   * If in development then return the error message as a
   * response to the requestor otherwise send server error status
   */
  if (process.env.NODE_ENV === 'development') {
    res.send(err.message);
  } else {
    res.sendStatus(500);
  }
};

export default standardError;
