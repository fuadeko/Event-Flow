function isAdmin(req, res, next) {
    try {
        console.log('Checking admin status:', req.session.role)
        if (req.session.role === 'admin') {
            next()
        } else {
            console.log('Not an Admin!')
            res.redirect('/')
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = isAdmin