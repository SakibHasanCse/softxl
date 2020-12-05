import joi from 'joi'
const schema = joi.object().keys({
    email: joi
        .string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    password: joi
        .string()
        .alphanum()
        .required()
        .min(2)

})

const validation = (data) => {
    const result = schema.validate(data)
    result.value = data;
    return result
}

export default validation