import jwt from 'jsonwebtoken'
import { config } from './config.js'

export const protect = (req, res, next) => {
  const { jwt: token } = req.session

  if (!token) {
    return res.status(401).json({ error: 'Not authorized' })
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret)
    req.user = payload

    next()
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized' })
  }
}

export const globalError = (err, req, res, next) => {
  console.log('global-error: ', err.message)
  res.status(500).json({ error: err.message })
}

export const notFound = (req, res, next) => {
  res.status(404).json({ error: 'Not found' })
}
