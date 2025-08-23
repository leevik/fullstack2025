const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

mongoose.set('strictQuery', false)

const password = process.env.PASSWORD
const url = `mongodb+srv://botlsj:${password}@cluster0.ijp4znr.mongodb.net/personApp?retryWrites=true&w=majority`

console.log('connecting to', url)
const connectToDb = async () => {
  try{
    await mongoose.connect(url)
    console.log('connected to mongoDB')
  } catch(error) {
    console.log('Connection failed: ', error.message)
  }
}
connectToDb()

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regex for phone number format: 2-3 digits, hyphen, 6-8 digits
        // Examples: 040-123456, 12-3456789, 123-456789
        return /^\d{2,3}-\d{6,8}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number! Use format: XX-XXXXXXX or XXX-XXXXXXX`
    }
  },
  id: Number
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema, 'person')