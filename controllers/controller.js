const formatRupiah = require('../helpers/helper');
const isAdmin = require('../middlewares/isAdmin');
const { Op } = require('sequelize')
const { User, Event, Transaction, Profile } = require('../models');

class Controller {
    static async home(req, res) {
        try {
            const { search } = req.query
            let opt = {
                include: 'EventCategories'
            }
            if (search) {
                opt.where = {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }
            }
            const events = await Event.findAll(opt)
            res.render('home', { events, isAdmin, formatRupiah })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async eventDetail(req, res) {
        try {
            const event = await Event.findByPk(req.params.eventId, {
                include: ['EventCategories', 'Transactions']
            })
            if (!event) throw new Error('Event not found')
            res.render('event-detail', { event, isAdmin, formatRupiah })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async buyTicket(req, res) {
        try {
            const event = await Event.findByPk(req.params.eventId)
            if (!event) throw new Error('Event not found')
            res.render('buy-ticket', { event })
        } catch (error) {
            console.log(error)

            res.send(error.message)
        }
    }
    static async postBuyTicket(req, res) {
        try {
            const event = await Event.findByPk(req.params.eventId)
            if (!event) throw new Error('Event not found')

            const quantity = parseInt(req.body.quantity)
            if (isNaN(quantity) || quantity < 1) throw new Error('Invalid quantity')

            if (event.ticketsAvailable < quantity) {
                return res.redirect(`/events/${event.id}/buy?error=Not enough tickets`)
            }

            await Transaction.create({
                quantity,
                status: 'pending',
                UserId: req.session.userId,
                EventId: event.id
            })

            await event.decrement('ticketsAvailable', { by: quantity })

            res.redirect('/profile')
        } catch (error) {
            console.log(error)
            res.send(error.message)
        }
    }

    static async profile(req, res) {
        try {
            const user = await User.findByPk(req.session.userId, {
                include: [
                    { model: Profile },
                    {
                        model: Transaction,
                        include: [Event]
                    }
                ]
            })
            if (!user) throw new Error('User not found')
            res.render('profile', { user: user.get({ plain: true }), isAdmin, formatRupiah })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async addEvent(req, res) {
        try {
            res.render('add-event')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postAddEvent(req, res) {
        try {
            await Event.create({
                name: req.body.name,
                date: req.body.date,
                location: req.body.location,
                price: req.body.price,
                ticketsAvailable: req.body.ticketsAvailable,
                description: req.body.description
            })
            res.redirect('/login')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async editEvent(req, res) {
        try {
            const event = await Event.findByPk(req.params.eventId);
            res.render('edit-event', { event })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async postEditEvent(req, res) {
        try {
            await Event.update({
                name: req.body.name,
                date: req.body.date,
                location: req.body.location,
                price: req.body.price,
                ticketsAvailable: req.body.ticketsAvailable,
                description: req.body.description
            }, {
                where: { id: req.params.eventId }
            })
            res.redirect('/login')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async deleteEvent(req, res) {
        try {
            await Event.destroy({
                where: { id: req.params.eventId }
            })
            res.redirect('/admin/events')
        } catch (error) {
            res.send(error.message)
        }
    }

    static adminDashboard(req, res) {
        try {
            res.render('admin-dashboard')
        } catch (error) {
            res.send(error.message)
        }
    }

    static async listEvent(req, res) {
        try {
            const events = await Event.findAll()
            res.render('list-event', { events })
        } catch (error) {
            res.send(error.message)
        }
    }

    static async logout(req, res) {
        try {
            req.session.destroy()
            res.redirect('/login')
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = Controller;
