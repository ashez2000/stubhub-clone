import express from 'express'
import cors from 'cors'
import cookieSession from 'cookie-session'
import mongoose from 'mongoose'

import { config } from './config.js'
import { notFound, globalError } from './middlewares.js'
import { authRouter } from './router.js'

mongoose
    .connect(config.mongoUri)
    .then(() => {
        console.log('main: connected to mongodb')
    })
    .catch((err) => {
        console.log('main: error connecting to mongodb', err.message)
    })

const app = express()

app.use(cors())
app.use(
    cookieSession({
        signed: false,
        secure: true,
    })
)

app.use(express.json())

app.get('/ping', (req, res) => {
    res.send('OK')
})

app.use('/api/auth', authRouter)

app.use(notFound)
app.use(globalError)

app.listen(3000, () => {
    console.log('main: server running on port 3000')
})
