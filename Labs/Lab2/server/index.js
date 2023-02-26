const express = require('express')
const app = express()
const cors = require('cors')


// server on port
const PORT = 3002
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" })
  })

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true,
  })
)