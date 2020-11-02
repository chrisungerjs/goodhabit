import { MongoClient } from 'mongodb'

let uri = process.env.MONGODB_URI
let dbName = process.env.MONGODB_DB

let cachedClient = null
let cachedDb = null

if (!uri) throw new Error('please define MONGODB_URI')
if (!dbName) throw new Error('please define MONDODB_DB')

export const connectToDatabase = async () => {
  if (cachedClient && cachedDb) return { client: cachedClient, db: cachedDb }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = client.db(dbName)
  cachedClient = client
  cachedDb = db
  return { client, db }
}