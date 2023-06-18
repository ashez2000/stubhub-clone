import jwt from 'jsonwebtoken'
import { Router } from 'express'

import { config } from './config.js'
import { User } from './user.model.js'

const router = Router()

router.post('/sign-up', async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await User.create({ name, email, password })

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
            },
            config.jwtSecret
        )

        req.session = {
            jwt: token,
        }

        res.status(201).json({ user })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' })
        }

        if (user.password !== password) {
            res.status(400).json({ error: 'Invalid credentials' })
        }

        res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error })
    }
})

export { router as authRouter }
