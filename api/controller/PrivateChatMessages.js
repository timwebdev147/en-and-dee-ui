const PrivateRoom = require('../model/privateChat')


const newConversation = async (req, res) => {
    const newConvo = new PrivateRoom({
        members:[req.body.senderId, req.body.receiverId]
    })

    
    try {
        let users = await PrivateRoom.findOne({"members": [req.body.senderId, req.body.receiverId]})
        let usersReverse = await PrivateRoom.findOne({"members": [req.body.receiverId, req.body.senderId]})
        
        if (users || usersReverse) {
          
          if (users == null) {
            users = usersReverse
            return res.status(200).json({
              message: "this private room already exists",
              users
            })
          }
          return res.status(200).json({
            message: "this private room already exists",
            users
          })
        }
        const savedConvo = await newConvo.save();
        return res.status(200).json({
          message: "this private room has been initiated",
          savedConvo
        });
      } catch (err) {
        res.status(500).json(err);
      }
}

module.exports = {newConversation}