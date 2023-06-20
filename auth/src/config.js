import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'jwt_secret',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/stubhub-auth',
}
