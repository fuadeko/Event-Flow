function auth(req, res, next) {
    try {
        if (req.session.userId) {
            next()
        } else {
            throw new Error('Please Login First')
        }
    } catch (error) {
        res.send(error)
    }
}

module.exports = auth