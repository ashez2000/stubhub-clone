import express from 'express'
import cors from 'cors'
import { authRouter } from './router.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/ping', (req, res) => {
    res.send('OK')
})

app.use('/api/auth', authRouter)

app.listen(3000, () => {
    console.log('main: server running on port 3000')
})
