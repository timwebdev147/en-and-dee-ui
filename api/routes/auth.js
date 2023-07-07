const express = require("express");
const router = express.Router();
// users controllers
const { signUp, signIn, onGetAllUsers, onGetUserById, onDeleteUserById, updateUserById } = require("../controller/user");

//chat room controllers
const {} = require('../controller/chatRoom.js')
const { joinRoom, getUsersInRoom } = require("../controller/conversation");
const {postMessage, getMessage} = require('../controller/chatMessages.js')

//delete controllers
const { deleteMessageById} = require('../controller/deleteController')

//validators
const {  
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest,
} = require("../validators/auth");

//decoder users requesting
const { decode } = require("../middlewares/jwt");
const { newConversation } = require("../controller/PrivateChatMessages");
const { upload } = require("../middlewares/multer");
const { uploadPost, getPost, getSinglePost } = require("../controller/blogPost");


//user routes
router.route("/signin").post(validateSignInRequest, isRequestValidated, signIn);
router.route("/signup").post(validateSignUpRequest, upload.single("file"), isRequestValidated, signUp);
router.route("/user").get(onGetAllUsers);
router.route("/user/:id").get(onGetUserById);
router.route("/user/:id").delete(onDeleteUserById);
router.route("/user/:id").put(updateUserById);

//chat room routes
router.route("/chatroom/joinRoom").post( decode ,joinRoom);
router.route("/chatroom/:roomId").get( decode ,getUsersInRoom);

//Private chat routes
router.route("/privatechat/newConversation").post(decode, newConversation)

//Chat messages routes
router.route("/chatroom/message").post( decode ,postMessage);
router.route("/chatroom/message/:roomId").get( decode ,getMessage);

//blog post
router.route("/blog/post").post(upload.single("file"), uploadPost)
router.route("/blog/post").get( getPost)
router.route("/blog/post/:id").get( getSinglePost)

//delete routes
router.route("/delete/message/:messageId").delete(decode, deleteMessageById)





module.exports = router;