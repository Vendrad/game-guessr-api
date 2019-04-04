'use strict';

const Controller = SpecificController => {

  return async function(req, res, next) {

    try {

      const view = await SpecificController.call(this, req, res, next);
      
      return res.send(view); 

    } catch (err) {
      next(err);
    }

  };

}

export default Controller