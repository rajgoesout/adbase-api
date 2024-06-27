// External Dependencies
import * as mongoDB from "mongodb"
import * as dotenv from "dotenv"

// Global Variables
export const collections = {}

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config()

  const dbConnUrl = process.env.DB_CONN_STRING

  const client = new mongoDB.MongoClient(dbConnUrl)

  await client.connect()

  const db = client.db(process.env.DB_NAME)

  const framesCollection = db.collection("frames")

  collections.frames = framesCollection

  console.log(`Successfully connected to database: ${db.databaseName}`)
}
