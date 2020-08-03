const express = require('express')
const app = express()
const cors = require('cors')
const userCtr = require('../controllers/UserController')
app.use(cors())

app.get('/', (req, res)=>{res.json({msg: 'hello'})})
app.post('/create_user', userCtr.createUser)

module.exports = app