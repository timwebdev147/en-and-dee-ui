
const Message = require("../model/chatMessages");

//add

const postMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get

const getMessage = async (req, res) => {
  const {roomId} = req.params
  try {
    const messages = await Message.find({
      "conversationId": roomId
    });
    if(messages){

      res.status(200).json(messages);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {postMessage, getMessage};