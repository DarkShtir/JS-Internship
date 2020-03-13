const express = require('express');
const auth = require('../middleware/auth');

const DialogController = require('../controllers/dialog-controller');
const dialog_controller = new DialogController();

const router = new express.Router();

router.post('/', auth, dialog_controller.createDialog);
router.get('/dialogs/:userId', auth, dialog_controller.getDialogsByUserId);
router.get('/members', auth, dialog_controller.getDialogByMembersId);
router.get('/messages', auth, dialog_controller.getMessagesByDialogId);
router.get('/:id', auth, dialog_controller.getDialogById);

module.exports = router;
