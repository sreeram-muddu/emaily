const express = require('express')
const app = express()


app.get('/', (req,res) => {
    res.send({'hi': 'muddu here'})
})

const PORT = process.env.PORT || 5000
console.log('listening to the server at port ',PORT)
app.listen(PORT)