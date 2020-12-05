import expressWinston from 'express-winston'
import MongoDb from 'winston-mongodb'
import winston from 'winston'
import  winstonFile from "winston-daily-rotate-file";
import {ElasticsearchTransport } from 'winston-elasticsearch'


const getmessage = (req ,res)=>{
    let obj  ={
        correlationId : req.headers['x-correlation-id'],
        requestbody: req.body
    }
    return JSON.stringify(obj)
}

const mongoErrorTransport = (mongourl) => new winston.transports.MongoDB({
    db:mongourl,
    metaKey:'meta'
}
)

 export const errorLogger = (mongourl)=> expressWinston.errorLogger({
    transports:[
        // new winston.transports.Console(),
        mongoErrorTransport(mongourl),
    ],
    format:winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ) ,
    meta:true,
    msg:getmessage
})

