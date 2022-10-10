const Router = require('express')
const router = new Router()
const controller = require('./authController')

router.post('/registration', controller.registration); // регистрация
router.post ('/login', controller.login); // вход
// router.post ('/logout', controller.logout); // как выйти? токен удалить?
router.get ('/user/:user_id', controller.user); // показать пользователю его страничку
router.get ('/user/:user_id/chats', controller.chats); // показать чаты
router.get ('/user/:user_id/:chat_id', controller.getChat); // показать чат с конкретным пользователем

// router.delete ('/user:id/chat:id/delete', controller.chatDell);
// router.post ('/user:id/chat:id/message:id', controller.message);
// router.delete ('/user:id/chat:id/message:id/delete', controller.messageDell);
// router.post ('/user:id/block:id', controller.blockList);
// router.put ('/user:id/updade', controller.userUpdade);

module.exports = router