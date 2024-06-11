require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  id: String,
  content: String,
  lock: Boolean
})

const your_dreams = mongoose.model('your_dreams', userSchema)

app.post('/dream', async (req, res) => {
  const dataRe = req.body;
  const id = '10062005'

  await your_dreams.findOne({ id: id })
    .then(data => {
      if (data) {
        console.log('404 not found')
      } else {
        const newDream = new your_dreams({
          id: id,
          content: dataRe.content,
          lock: false
        })
        newDream.save()
        res.send('oke')
      }
    })

})

app.post('/dream/check', async (req, res) => {
  const checkID = req.body;

  await your_dreams.findOne({ id: checkID.id })
    .then(data => {
      if (data) {
        // console.log(true)
        res.send(true)
      } else {
        // console.log(false)
        res.send(false)
      }
    })
    .catch(err => console.log(err))
})

app.get('/', (req, res) => {
  res.json('Hello world')
})

const PORT = process.env.PORT || 8080

app.listen(PORT, (err, res) => {
  if (err) {
      console.log(err)
      return res.status(500).send(err.message)
  } else {
      console.log('[INFO] Server Running on port:', PORT)
      mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connected to db'))
    .catch(error => console.log('Error to connect to db:', error))
  }
})