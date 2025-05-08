const { User, Profile } = require('../models');
const bcrypt = require('bcryptjs');

class UserController {
    static getRegister(req, res) {
        res.render('register_page');
    }

    static async postRegister(req, res) {
        try {
            const { email, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            
            const user = await User.create({
                email,
                password: hashedPassword,
                role: 'user'
            });

            await Profile.create({
                fullName: '',
                phone: '',
                address: '',
                UserId: user.id
            });

            req.session.userId = user.id;
            req.session.role = user.role;
            res.redirect('/');
        } catch (error) {
            res.send(error.message);
        }
    }

    static getLogin(req, res) {
        res.render('login_page')
    }

    static async postLogin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } })

            if (!user || !bcrypt.compareSync(password, user.password)) {
                throw new Error('Invalid email/password')
            }

            req.session.userId = user.id
            req.session.role = user.role

            if (user.role === 'admin') {
                return res.redirect('/admin/dashboard')
            }

            res.redirect('/')
        } catch (error) {
            res.send(error.message)
        }
    }

    static postLogout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}

module.exports = UserController