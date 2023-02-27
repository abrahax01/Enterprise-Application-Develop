const express = require('express')
const app = express()
const countriesRouter = require('./country-objects/fetch')

// server on port
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})

app.use('/', countriesRouter)


