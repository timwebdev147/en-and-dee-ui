const makeValidation = require("@withvoid/make-validation");
const ChatRoom = require("../model/chatRoom")
const ChatMessageModel = require("../model/chatMessages");
const userModel = require("../model/userModel");



const initiate = async (req, res) => {
    try {
        const validation = makeValidation(types => ({
          payload: req.body,
          checks: {
            userIds: { 
              type: types.array, 
              options: { unique: true, empty: false, stringOnly: true } 
            },
            type: { 
              type: types.string,   
            },
          }
        }));
        if (!validation.success) return res.status(400).json({ ...validation });
    
        const { userIds, type } = req.body;
        const { _id: chatInitiator } = req;
        const allUserIds = [...userIds, chatInitiator];
        const chatRoom = await ChatRoom.initiateChat(allUserIds, type, chatInitiator);
        return res.status(200).json({ success: true, chatRoom });
      } catch (error) {
        return res.status(500).json({ success: false, error: error })
      }
 };
const postMessage = async (req, res) => {
  try {
    const { roomId } = req.params;
    const validation = makeValidation(types => ({
      payload: req.body,
      checks: {
        messageText: { type: types.string },
      }
    }));
    if (!validation.success) return res.status(400).json({ ...validation });

    const messagePayload = {
      messageText: req.body.messageText,
    };
    const currentLoggedUser = req._id
    const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
    
    return res.status(200).json({ success: true,  post });
  } catch (error) {
    return res.status(500).json({ success: false, error: error })
  }
}
const getRecentConversation = async (req, res) => { };
const getConversationByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoom.getChatRoomByRoomId(roomId)
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      })
    }
    const users = await userModel.getUserByIds(room.userIds);
    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
    };
    const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
    return res.status(200).json({
      success: true,
      conversation,
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
 };
const markConversationReadByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoom.getChatRoomByRoomId(roomId)
    if (!room) {
      return res.status(400).json({
        success: false,
        message: 'No room exists for this id',
      })
    }

    const currentLoggedUser = req._id;
    const result = await ChatMessageModel.markMessagesRead(roomId, currentLoggedUser);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
 };
  
module.exports = {initiate, postMessage, getRecentConversation, getConversationByRoomId, markConversationReadByRoomId }