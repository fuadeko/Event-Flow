const express = require('express')
const session = require('express-session')
const UserController = require('./controllers/usercontroller')
const auth = require('./middlewares/auth')
const isAdmin = require('./middlewares/isAdmin')
const Controller = require('./controllers/controller')
const app = express()
const port = 3002

app.use(session({
    secret: "fuad_ganteng",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        sameSite: true
    }
}))

app.use((req, res, next) => {
    res.locals.loggedIn = !!req.session.userId;
    res.locals.isAdmin = (req.session && req.session.role === 'admin')
    next()
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

// Routes
app.get('/register', UserController.getRegister)
app.post('/register', UserController.postRegister)

app.get('/login', UserController.getLogin)
app.post('/login', UserController.postLogin)

app.get('/', Controller.home)
app.get('/events/:eventId', Controller.eventDetail)
app.get('/events/:eventId/buy', auth, Controller.buyTicket)
app.post('/events/:eventId/buy', auth, Controller.postBuyTicket)
app.get('/profile', auth, Controller.profile)
app.post('/logout', Controller.logout)


app.get('/admin/dashboard', auth, isAdmin, Controller.adminDashboard)
app.get('/admin/add_event', auth, isAdmin, Controller.addEvent)
app.post('/admin/add_event', auth, isAdmin, Controller.postAddEvent)
app.get('/admin/events', auth, isAdmin, Controller.listEvent)
app.get('/admin/:eventId/edit', auth, isAdmin, Controller.editEvent)
app.post('/admin/:eventId/edit', auth, isAdmin, Controller.postEditEvent)
app.get('/admin/:eventId/delete', auth, isAdmin, Controller.deleteEvent)

app.listen(port, () => {
    console.log('Helpp ', port, 'x')
})
