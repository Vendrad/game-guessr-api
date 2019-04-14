/**
 * General AsyncController Wrapper to handle catching errors
 *
 * Wraps an asynchronous controller in a try catch block to
 * avoid extra language within each controller. If a controller
 * should handle errors specifically then it can omit this wrapper.
 *
 * @param {*} SpecificController
 */
const AsyncController = SpecificController => async function SpecificControlCall(req, res, next) {
  try {
    const view = await SpecificController.call(this, req, res, next);
    return res.send(view);
  } catch (err) {
    next(err);
  }
};

export default AsyncController;
