const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(express.static('public'))

app.post()

const PORTA = process.env.PORT || 8888

app.listen(PORTA, () => {
    console.log(`O servidor está a ouvir na porta http://localhost:${PORTA}`)
})

