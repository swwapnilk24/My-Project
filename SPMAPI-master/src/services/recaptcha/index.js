import request from 'request';

const SECRETKEY = '6LeIA0UUAAAAADvwK7UyaCF7UhHwNu2zWkvaU2lT';

const recaptchaAPI = 'https://www.google.com/recaptcha/api/siteverify';

export const verifyCaptcha = (req, res, next) => {
  const params = {
    secret: SECRETKEY,
    response: req.body.captchaResponse
  };
  request.post(recaptchaAPI, {form: params}, (err, result) => {
    if (err) {
      // console.log(err);
      res.send(err);
    } else if (result.body.success) {
        next();
    } else {
      res.send({message: 'Sorry, some error occured. Please try again'});
    }
  });
};
