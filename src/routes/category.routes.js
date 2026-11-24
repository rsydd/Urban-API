const router = require('express').Router();
const a = require('../controller/category.controller');

router.get('/', a.getAllCategories);
router.get('/slug/:slug', a.getBySlug);
router.get('/:id', a.getById);
router.post('/', a.postCategory);
router.put('/:id', a.putCategory);
router.patch('/:id', a.patchCategory);
router.delete('/:id', a.deleteCategory);

module.exports = router;