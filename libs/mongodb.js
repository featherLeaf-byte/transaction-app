import mongoose from 'mongoose'
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Connected to Database')
  } catch (error) {
    console.log(error)
  }
}
export default connectMongoDB
