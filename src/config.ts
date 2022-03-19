import * as typedDotenv from 'typed-dotenv'
import type { Env } from 'typed-dotenv/dist/lib/types'
import type { Mongoose } from 'mongoose'
import mongoose from 'mongoose'

const { error, env } = typedDotenv.config({
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

export const connectToDatabase = async (dbname?: string): Promise<Mongoose> => {
  const mongodbURI = config.MONGODB_URI
  try {
    return await mongoose.connect(mongodbURI as string, { dbName: dbname })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export const closeDatabaseConnection = async () => {
  try {
    await mongoose.disconnect()
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
