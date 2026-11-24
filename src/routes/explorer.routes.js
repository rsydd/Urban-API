const router = require('express').Router();
const a = require('../controller/explorer.controller');

router.get('/', a.getAllExplorer);
router.get('/:id', a.getById);
router.get('/:id/explorations', a.getExplorerExplorations);
router.post('/', a.postExplorer);
router.put('/:id', a.putExplorer);
router.patch('/:id', a.patchExplorer);
router.delete('/:id', a.deleteExplorer);

module.exports = router;