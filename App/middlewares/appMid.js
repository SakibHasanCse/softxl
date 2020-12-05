


import { GenaralError, BadRequest } from '../utils/error';
export const errorhandle = (err, req, res, next) => {
    let code = 500

    if (err instanceof GenaralError) {
        code = err.getCode();


    }
    if (code === 500) {
        let correlationIds = req.headers['x-correlation-id']
        return res.status(code).json({
            correlationId: correlationIds,
            message: err.message
        })
    }
    return res.status(code).json({
        message: err.message
    })

}

export const validatorhandler = (validate) => {
    console.log(validate)

    return (req, res, next) => {
        const result = validate(req.body)

        if (result.error == null) {

            return next()
        }
      
        const  {details}  = result.error
        const messages = details.map(msg => msg.message)
        const msg = messages.join(',')

        throw new BadRequest(msg)
    }
}


export const setCorrelationId = async (req, res, next) => {
    let correlationId = req.headers['x-correlation-id']
    if (!correlationId) {
        correlationId = Date.now().toString();
        req.headers['x-correlation-id'] = correlationId

    }
    res.set('x-correlation-id', correlationId)
    return next();
}


export const defaultlibrarian  = {
    name: 'Librarian',
    email: 'librarian@gmail.com',
    password: '1234567890',
    role:'librarian'
}


const imagetypes = ['image/jpeg', 'image/png', 'image/jpg' , 'image/gif']

export const bookImage = (book , image) =>{
    if (!image) return null;
    const img =JSON.parse(image)
    if(img != null && imagetypes.includes(img.type)){
        book.img = new Buffer.from(img.data , 'base64')
        book.imgType =img.type

    }

}