const router = require('express').Router();
const a = require('../controller/location.controller');

router.get('/', a.getAllLocations);
router.get('/slug/:slug', a.getBySlug);
router.get('/:id', a.getById);
router.post('/', a.postLocation);
router.put('/:id', a.putLocation);
router.patch('/:id', a.patchLocation);
router.delete('/:id', a.deleteLocation);

module.exports = router;