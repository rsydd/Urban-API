const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("test");
})

router.use('/api/categories', require('./category.routes'));
router.use('/api/countries', require('./country.routes'));
router.use('/api/locations', require('./location.routes'));
router.use('/api/explorations', require('./exploration.routes'));
router.use('/api/explorers', require('./explorer.routes'));


module.exports = router;