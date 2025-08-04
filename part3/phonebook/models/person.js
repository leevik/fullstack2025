const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
const connectToDb = async () => {
    try{
        const connection = await mongoose.connect(url)
        console.log("connected to mongoDB")
        console.log("hoplaa yhteys muodostettu")
    } catch(error) {
        console.log("Connection failed: ", error.message)
    }
} 
connectToDb()

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: String,
  id: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema, "person")