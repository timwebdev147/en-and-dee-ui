const chatMessages = require("../model/chatMessages");
const chatRoom = require("../model/chatRoom")

const deleteMessageById = async (req, res) => {
    const {id} = req.params;
    const message = await chatMessages.findByIdAndDelete(id);

    if(!message){
        return res.status(400).json({
            success: false,
            message: 'No nessage exists with this id',
          })
    }
    res.status(200).json({msg: `this message has been deleted successfully!`})
};

module.exports = { deleteMessageById };
