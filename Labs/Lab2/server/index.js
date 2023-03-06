const express = require('express')
const app = express()
const countriesRouter = require('./country-objects/fetch')

// create server on port 3002
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

// route for fetching countries' data
app.use('/', countriesRouter)


