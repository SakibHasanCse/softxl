import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { defaultlibrarian } from '../App/middlewares/appMid';
import User from '../App/model/user';


export const DBCON = (mongourl) => {
    mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async () => {
            console.log('database connected')
            const users = await User.find()
            if (users.length == 0 || users.length == null) {
                let user = defaultlibrarian
                const password = await bcrypt.hash(user.password, 12)
                const newuser = new User({
                    ...user,
                    password
                })
                await newuser.save()
            }
        }
        )
        .catch((err) => console.log(err.message));

    mongoose.set('useFindAndModify', false)
}

