const express = require('express')
const cors = require('cors')
const app = express()


// server on port
const PORT = 3002
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

// Cors
app.use(
  cors({
    origin: "*",
    methods: ['GET', 'POST'],
    credentials: true,
  })
)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" })
})