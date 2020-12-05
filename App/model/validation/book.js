import joi from 'joi'

const schema = joi.object().keys({
    name: joi
        .string()
        .min(2)
        .max(100)
        .required(),
    genre: joi
        .string()
        .trim()
        .min(2)
        .required(),
    active: joi
        .boolean(),
    image: joi
        .binary()
        ,
    authorId: joi
        .string()
        .required()
        .trim()
        .min(3)
})

const validate = (data) => {
    const result = schema.validate(data)
    result.value = data
    return result
}

export default validate