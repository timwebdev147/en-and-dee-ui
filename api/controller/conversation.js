const { StatusCodes } = require("http-status-codes");
const ChatRoom = require("../model/chatRoom.js");

const joinRoom = async (req, res) => {
    
    const {roomName, member} = req.body
    
    try {
        const room = await ChatRoom.findOne({ roomName });
        // const user = await ChatRoom.findOne({members: [memberId]})
        if(room ){
            ChatRoom.updateOne(
                {roomName: roomName}, 
                {$addToSet: { members: member } }
            ).then((data, error) => {
                if (error) res.status(StatusCodes.BAD_REQUEST).json({ error });
                else
                res
                .status(StatusCodes.CREATED)
                .json({ 
                    message: "User added Successfully",
                    room
                });
            });
            
        }
        else{
            const newRoom = new ChatRoom({roomName})
            const addedRoom = await newRoom.save()

            if(addedRoom){

                ChatRoom.updateOne(
                    {roomName: roomName}, 
                    {$addToSet: { members: member } }
                )
            }
            res
                .status(StatusCodes.CREATED)
                .json({
                     message: "Room has been initiated",
                });
        }
    } catch (err) {
      res.status(500).json(err);
    }
  };

  const getUsersInRoom = async (req, res) => {
    const {roomId} = req.params
    try{

        const room = await ChatRoom.findOne({"_id": roomId})
        if(room){
    
            res.status(StatusCodes.ACCEPTED).json(room)
        }
    }
    catch{

        res.status(StatusCodes.BAD_REQUEST).json("does not exist")
    }
  }



module.exports = {joinRoom, getUsersInRoom};