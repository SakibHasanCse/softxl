
import { usersRagister, usersLogin } from './../service/user';
export const userRagister = async (req, res, next) => {
    try {
        await usersRagister(req.body, 'student', req, res)
    } catch (error) {
        return next(error, req, res)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        await usersLogin(req.body, res)
    } catch (error) {
        return next(error, req, res)
    }
}


export const userProfile = async (req, res, next) => {
    try {
        const user = req.user
         return res.status(200).json({
            success: true,
            name: user.name,
            email: user.email,
            role: user.role
    })
    } catch (error) {
        return next(error, req, res) 
    }
}