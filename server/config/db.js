import mongoose from 'mongoose'
import dns from 'dns'

dns.setServers(['1.1.1.1', '8.8.8.8'])

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}