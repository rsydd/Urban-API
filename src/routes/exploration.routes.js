const router = require('express').Router();
const a = require('../controller/exploration.controller');

router.get('/', a.getAllExplorations);
router.get('/:id', a.getById);
router.post('/', a.postExploration);
router.put('/:id', a.putExploration);
router.patch('/:id', a.patchExploration);
router.delete('/:id', a.deleteExploration);

module.exports = router;