

import bodyparser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { errorhandle, setCorrelationId } from './App/middlewares/appMid'
import { errorLogger } from './App/middlewares/logger'
import bookRouter from './App/router/book'
import authRouter from './App/router/user'
import passport from 'passport'
import { conPassport } from './App/middlewares/auth'
import { DBCON } from './config/dbCon'
import helmet from 'helmet'
import xss from 'xss-clean'
import fileUpload from 'express-fileupload'
const app = express()

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: './config/config.env' })
    app.use(morgan('dev'))
}


const mongourl = process.env.MONGODBURL

app.use(fileUpload())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(passport.initialize())
conPassport(passport)

DBCON(mongourl)
app.use(setCorrelationId)


app.use(authRouter)
app.use(bookRouter)
app.use(errorLogger(mongourl))
app.use(errorhandle)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Page Not Found'
    })
})


export default app
