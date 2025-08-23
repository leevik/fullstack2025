/* const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })
const mongoose = require('mongoose') */

/* console.log('Current directory:', __dirname)
console.log('Looking for .env file at:', path.join(__dirname, '.env'))
console.log('Environment variables:', Object.keys(process.env))
console.log('PASSWORD from env:', process.env.PASSWORD) */

/* if(process.argv.length < 3){
  console.log("give password as argument")
  process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4] */

/* const password = process.env.PASSWORD */
/* const url = `mongodb+srv://botlsj:${password}@cluster0.ijp4znr.mongodb.net/personApp?retryWrites=true&w=majority` */


/* mongoose.set('strictQuery', false) */
/* mongoose.connect(url) */

/* const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String
}) */

/* const Person = mongoose.model('Person', personSchema, 'person') */

/* const person = new Person({
  id: 2,
  name: "leevi",
  number: "04040404010"
}); */



/* ;(async () => {
  try {
    console.log('url: ', url)
    await mongoose.connect(url)

    const count = await Person.countDocuments({})
    console.log(`Total documents: ${count}`)

    if (!name || !number) {
      console.log('Usage: node mongo.js <password> <name> <number>')
      mongoose.connection.close()
      process.exit(1)
    }
    console.log(name, number, count+1)
    const person = new Person({
      id: count + 1,
      name: name,
      number: number
    })
    console.log('person: ', person)

    const saved = await person.save()
    console.log('Person saved!')

    const people = await Person.find({});
    people.forEach(p => console.log(p));
    const people =  await Person.find({})
    people.forEach(person => {
      console.log(person)
    })
    await mongoose.connection.close()
  } catch (err) {
    console.error('Error:', err)
    mongoose.connection.close()
  }
})() */


/* console.log("määrä: " + amount)

person.save().then(result => {
  console.log('Person saved!')
  mongoose.connection.close()
})


Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
}) */