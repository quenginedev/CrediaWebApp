const express = require('express')
const axios = require('axios')
const app = express()
const authorizer = require('../middleware/authorizer')
const cors = require('cors')

// Get Verified.ng configs
const {
    verifiedNG
} = require('../configs')

// Set up http request handler
const http = axios.create({
    baseURL: verifiedNG.endpoint,
    headers: {
        'api-key': verifiedNG["api-key"],
        'userid': verifiedNG.userid
    }
})


app.use(cors())
app.get('/', authorizer, (req, res)=>{
    // res.json({
    //     verified: true
    // })
    let data = req.body
    http.post('sfx-verify/v2/bvn', {
        "firstname": "Jane",
        "surname": "Doe",
        "dob": "2019-08-21",
        "bvn": "22222222223",
        "phone": "07030000000",
        "email": "laderemi@seamfix.co,",
        "callbackURL": "https://yoursite.com/callback"
    })
    // axios.get('https://jsonplaceholder.typicode.com/todos', data)
        .then(verifiedData=>{
            res.json(verifiedData.data)
        }).catch(error=>{
            // console.error(error)
            res.status(401).send(error)
    })
})

module.exports = app