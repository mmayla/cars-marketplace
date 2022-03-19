import dotenv from 'typed-dotenv'
import type { Env } from 'typed-dotenv/dist/lib/types'
import mongoose from 'mongoose'

const { error, env } = dotenv.config({
  includeProcessEnv: true,
  template: {
    path: '.env.template',
    errorOnFileNotFound: true,
    errorOnMissingAnnotation: true,
  },
})

if (error) {
  console.error('Error validating environment variables')
  console.error(error)
}

export const config = env as Env

export const connectToDatabase = async () => {
  const mongodbURI = config.MONGODB_URI
  try {
    await mongoose.connect(mongodbURI as string)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
