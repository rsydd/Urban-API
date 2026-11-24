const router = require('express').Router();
const a = require('../controller/country.controller');

router.get('/', a.getAllCountries);
router.get('/:id', a.getById);
router.post('/', a.postCountry);
router.put('/:id', a.putCountry);
router.patch('/:id', a.patchCountry);
router.delete('/:id', a.deleteCountry);

module.exports = router;