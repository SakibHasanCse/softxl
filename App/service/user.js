
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from './../model/user';

export const usersRagister = async (users, role, req, res) => {
    const user = await User.findOne({ email: users.email })
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists '
        })
    }
    const password = await bcrypt.hash(users.password, 12)
    const newUser = new User({
        ...users,
        password,
        role
    })
    const result = await newUser.save()
    if (result) {

        return res.status(201).json({
            success: true,
            message: 'User Registration successfully'
        })
    }
    return res.status(400).json({
        success: false,
        message: 'Somthing went wrong'
    })


}
export const usersLogin = async (users, res) => {

    const { email, password } = users
    const userEmail = await User.findOne({ email })
    if (!userEmail) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Email And Password'
        })
    }

    const isMatch = await bcrypt.compare(password, userEmail.password)
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Email And Password'
        })
    } else {
        let token = jwt.sign({
            userId: userEmail._id,
            role: userEmail.role,
            email: userEmail.email,
            password: userEmail.password
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIR })

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            name: userEmail.name,
            email: userEmail.email,
            token: `Bearer ${token}`
        })
    }

}

