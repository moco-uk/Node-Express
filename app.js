
const path = require('path')
const express = require('express')

const app = express()

const mongoConnect = require('./util/database').mongoConnect

app.set('view engine', 'ejs')
app.set('views', 'views')

const adminRoutes = require('./route/admin')
const shopRoutes = require('./route/shop')

app.use(express.urlencoded({ extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/admin', adminRoutes)
app.use(shopRoutes)

app.use((req, res, next) => {
    res.status(404).send('<h2>Not found</h2>')
})

mongoConnect(() => {
    app.listen(8000)
})
