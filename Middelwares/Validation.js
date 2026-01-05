const { body,validationResult } = require("express-validator");

exports.ValidSignUp=[
    body('email',"does not seems like Email").isEmail(),
    body('password','your pass must containes at least 8 caracters').isLength({min:8})
]

exports.ValidSignIn=[
    body('email',"does not seems like Email").isEmail(),
    body('password','your pass must containes at least 8 caracters').isLength({min:8})
]


exports.Validation=(req,res,next)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).send(errors)
    }

    next()
}