const express=require('express')
const mongoose=require('mongoose')
const path= require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'account.html'))
})

mongoose.connect('mongodb://127.0.0.1:27017/account')
const db = mongoose.connection
db.once('open', ()=>{
  console.log('Mongodb connect successful')
})

const AccountSchema = new mongoose.Schema({
  emailregister: String,
  passwordregister: String
})

const Account = mongoose.model("data", AccountSchema) 

app.listen(port, ()=>{
  console.log('Server Started')
})

app.post('/post', async (req, res)=>{
  const {emailregister, passwordregister} = req.body
  const account = new Account({
    emailregister,
    passwordregister
  })

  await account.save()
  console.log(account)
  res.send('Register account successful')
})