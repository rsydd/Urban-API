const router = require('express').Router()

router.get('/', (req, res) => {
    res.send("test");
})

router.use('/categories', require('./category.routes'));
router.use('/countries', require('./country.routes'));
router.use('/locations', require('./location.routes'));
router.use('/explorations', require('./exploration.routes'));
router.use('/explorer', require('./explorer.routes'));


module.exports = router;