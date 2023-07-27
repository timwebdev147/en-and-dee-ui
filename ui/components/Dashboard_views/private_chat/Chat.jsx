import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '../private_chat/chatbox.module.scss'
import community_styles from '../community/community.module.scss'
import chatbox_styles from './chatbox.module.scss'
import { useRef } from "react";
import {FiSend} from 'react-icons/fi'
import {RiWechatLine} from 'react-icons/ri'
import {GrGroup} from 'react-icons/gr'
import {VscSmiley} from 'react-icons/vsc'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
// import io from 'socket.io'
import {io} from 'socket.io-client';
import Message from "@/components/message/message";



function Chat(params) {
    
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const ws_url = process.env.NEXT_PUBLIC_WS_URL;
    const [messages, setMessages] = useState([])
    const socket = useRef();
    const MIN_TEXTAREA_HEIGHT = 32;
    const textareaRef = useRef(null);
    const messageBoxRef = useRef(null)
    const [value, setValue] = useState("");
    const onChange = (event) => setValue(event.target.value);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.DietBarUser.userInfo)
    const [chatStatus, setChatStatus] = useState('not started')
    const [conversations, setConversations] = useState([])
    const [chatroomId, setChatroomId] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [messageStatus, setStatus] = useState('not sent')
    const [roomType, setRoomType] = useState('')
    const [active_members, setActiveMember] = useState([])
    const [roomMembers, setRoomMembers] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [conversationId, setConversationId] = useState("")
    const adminId = "63d70fc50fb1af662054087b";
    const [chatWithName, setChatwithName] = useState();
    const [chatWithId, setChatwithId] = useState();
    const [pickerVisibility, setPickerVisibility] = useState("hide");

    //connect and get new messages from the socket
    useEffect(() => {
        //connect to socket
        socket.current = io(ws_url);
        //get new messages from the socket
        

        
    }, [socket])
    //add new messages from the socket to chatbox
    useEffect(  ()  => {
        if (arrivalMessage != null) {
            var newArr = [...messages, arrivalMessage]
            setMessages(newArr)
        }
        console.log("messages", messages);
    }, [arrivalMessage])
    //add users to the room
    function joinRoom (){
        let data = {
                senderId: user._id,
                receiverId: adminId
            }
        //create chatroom and register user's Id to the chatroom
        axios.post(`${api_url}/api/privatechat/newConversation`, data,{
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.data.users != undefined) {
                setConversationId(res.data.users._id)
                setRoomMembers(res.data.users.members)
                getConversations(res.data.users._id)
                socket.current.emit("joinRoom", res.data.users._id)

            }
            else{
                setConversationId(res.data.savedConvo._id)
                setRoomMembers(res.data.savedConvo.members)
                getConversations(res.data.savedConvo._id)
                socket.current.emit("joinRoom", res.data.savedConvo._id)
            }
            console.log("private Chatroom",  res.data);
        }).catch(error => {
            console.log(error);
        })
        //socket call to join the socket room 
            setChatStatus("started")
    }
    //initiate private chat between client and admin
    function adminJoinRoom (id, clientName){
        let data = {
                senderId: user._id,
                receiverId: id
            }
        //create chatroom and register user's Id to the chatroom
        axios.post(`${api_url}/api/privatechat/newConversation`, data,{
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            setChatwithName(clientName)
            setChatwithId(id)
            if (res.data.users != undefined) {
                setConversationId(res.data.users._id)
                setRoomMembers(res.data.users.members)
                getConversations(res.data.users._id)
                socket.current.emit("joinRoom", res.data.users._id)
            }
            else{
                setConversationId(res.data.savedConvo._id)
                setRoomMembers(res.data.savedConvo.members)
                getConversations(res.data.savedConvo._id)
                socket.current.emit("joinRoom", res.data.savedConvo._id)
            }
            console.log("private Chatroom",  res.data);
            console.log("client name",  chatWithName);
        }).catch(error => {
            console.log(error);
        })
        //socket call to join the socket room 
            setChatStatus("started")
    }
    //send message to the socket and save it to the database
    function sendMessage(params) {
        let data = {
            conversationId,
            senderId: user._id,
            senderName: user.firstName,
            senderUsername: user.username,
            senderRole: user.role,
            text: value
        }

        socket.current.emit("sendMessage", {
            room: conversationId,
            senderId: user._id,
            senderName: user.firstName,
            senderUsername: user.username,
            senderRole: user.role,
            text: value
        })
        setStatus('sent')
        setTimeout(() => {
            setStatus('not sent')
        }, 1000);
        setValue('')
        //always bring chat to the bottom after sending a message
        messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;

        //save conversations to the database
        axios.post(`${api_url}/api/chatroom/message`, data, {
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
              }
        }).then(res => {
            console.log("message sent", res.data);
        }).catch(error => {
            console.log("message not sent", error);
            setStatus('not sent')
        })
    }
    
    function getConversations(id) {
        axios.get(`${api_url}/api/chatroom/message/${id}`, {
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
              }
        })
        .then((res) => {
            let convo = res.data;
            setMessages(convo);
            console.log("getconversation", res);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    function getUsers(){
        axios.get(`${api_url}/api/user`, {
            // headers: {
            //     'Authorization': `token ${window.localStorage.getItem('token')}`
            //   }
        })
        .then((res) => {
            let data = res.data;
            setAllUsers(data);
            console.log("All users", data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    function add_emoji_to_text(data){
        setValue(value + data.native)
    }
    // socket emit and events
    useEffect(() => {
        
        //get all users
        getUsers()
        //get welcome event
        socket.current.on('welcome', message => {
            console.log(message);
        })
        //on connect add user to the socket users array
        socket.current.emit("addUser", {
            userId: user._id,
            userFirstName: user.firstName,
            userUsername: user.username,
            userRole: user.role
        })
        // on connect get all users in the socket users array 
        socket.current.on("getUsers", users => {

            
            setActiveMember(users)
            console.log("active", users);
        })
        

    }, [socket])

    //get messages from socket
    useEffect(() => {
        socket.current.on("getMessage", data => {

            setArrivalMessage({
                senderId: data.senderId,
                senderRole: data.senderRole,
                senderUsername: data.senderUsername,
                senderName: data.senderName,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [socket, chatStatus, messages])
    // initiate chat with admin
    useEffect(() => {
        if (user.role != "admin") {
            joinRoom()
            console.log("conversationId", conversationId);
            console.log("roomMembers", roomMembers);
        }
    }, [])
    // increase textarea height when text-overflow
    useLayoutEffect(() => {
        
        if (textareaRef.current ) {
            
            // Reset height - important to shrink on delete
            textareaRef.current.style.height = "30px";
            
            
            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight,
                MIN_TEXTAREA_HEIGHT
                )}px`;
            
            if (parseInt(textareaRef.current.style.height) > "100" ) {
                textareaRef.current.style.height = "100px";
                }
            
            
            // Set height
            

            // !textareaRef.current.style.height <= "300px"? textareaRef.current.style.hei

            messageBoxRef.current.style.marginBottom = "30px";
            
            messageBoxRef.current.style.marginBottom = `${parseInt(textareaRef.current.style.height) + 20}px`
            messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight

            }
    }, [value, chatStatus, sendMessage]);
    // function to send message on key enter
    const handleKeyDown = (event) => {
        // event.preventDefault()
    if (event.key === 'Enter') {
        
        // send message
        sendMessage()
    }
    };
    
    

    return(

        <>
        <div className={community_styles.communityBox}>

        {
            user.role == "admin"?
        <div className={community_styles.chatSideBar}>
            <div className={community_styles.community_name}>
            <label htmlFor=""><RiWechatLine className={community_styles.com_icon}/> Community Name</label>
            <p>Chat with Users</p>
            </div>
            <div className={community_styles.active_members + " " + chatbox_styles.active_users}>
            <label htmlFor=""><GrGroup className={community_styles.com_icon} />Active users</label> 
            {
                active_members?.map((member, index) => (
                    
                        user._id == member.userId?
                        <p key={index} className={styles.admin_user} >Me (Admin)</p>:
                        <p key={index} className={member.userId == chatWithId? styles.current_chat_with: null} onClick={() => adminJoinRoom(member.userId, member.userFirstName)} >{member.userUsername} ({member.userFirstName})</p>
                    
                ))
            }
            </div>
            <div className={community_styles.active_members + " " + chatbox_styles.active_users}>
            <label htmlFor=""><GrGroup className={community_styles.com_icon} />users</label> 
            
            {
                allUsers?.map((member, index) => (
                    user._id == member._id?
                    <p key={index} className={styles.admin_user} >Me (Admin)</p>:
                    <p key={index} className={member._id == chatWithId? styles.current_chat_with: null} onClick={() => adminJoinRoom(member._id, member.firstName)} >{member.username} ({member.firstName})</p>
                ))
            }
            </div>
        </div>:
        null
        }
        
        <div className={styles.chatbox + " " }>
            <div onClick={() => {setPickerVisibility('hide')}} className={styles.messagesBox} ref={messageBoxRef} 
            tabIndex={0}>
                


            {
                messages.length <= 0?
                <h1>{user.role != "admin"? "Start a chat with Dr Toluwanimi (admin)": chatWithName == undefined? "Pick and click a Client to chat with": `Start a chat with ${chatWithName} by sending a message`}</h1>:
                messages?.map((message, index) => (

                message?.senderId == user._id?
                <span key={index} className={styles.userMessage} >
                    <Message message={message} own={styles.myown}/>
                </span>:
                <span key={index} className={styles.adminMessage} >
                    <Message message={message}/>
                </span>

                ))
            }
            </div>

            {
               user.role == "admin"? chatWithName?
            <div className={styles.textareaBox}> 
            {
                pickerVisibility == 'show'?
            <span className={styles.emojiContainer}>
            <Picker 
            data={data}
            onEmojiSelect={(data) =>   add_emoji_to_text(data)}
            previewPosition={"none"}
            />
            </span>:null
            }

            <VscSmiley onClick={() => {pickerVisibility == "show"? setPickerVisibility("hide"): setPickerVisibility('show')}} className={styles.smileyIcon} />

            <textarea 
            onChange={onChange} 
            ref={textareaRef} 
            style={{minHeight: MIN_TEXTAREA_HEIGHT, resize: "none"}}
            value={value} 
            className={styles.messageField}
            placeholder="Type a message"
            onFocus={() => {setPickerVisibility('hide')}}
            onKeyDown={event =>  handleKeyDown(event)}
            tabIndex={0}
            />
            <FiSend  onClick={() => sendMessage()} className={styles.sendIcon} />
            </div>:null:
            <div className={styles.textareaBox}> 
            {
                pickerVisibility == 'show'?
            <span className={styles.emojiContainer}>
            <Picker 
            data={data}
            onEmojiSelect={(data) =>   add_emoji_to_text(data)}
            previewPosition={"none"}
            />
            </span>:null
            }

            <VscSmiley onClick={() => {pickerVisibility == "show"? setPickerVisibility("hide"): setPickerVisibility('show')}} className={styles.smileyIcon} />

            <textarea 
            onChange={onChange} 
            ref={textareaRef} 
            style={{minHeight: MIN_TEXTAREA_HEIGHT, resize: "none"}}
            value={value} 
            className={styles.messageField}
            placeholder="Type a message"
            onFocus={() => {setPickerVisibility('hide')}}
            onKeyDown={event =>  handleKeyDown(event)}
            tabIndex={0}
            />
            <FiSend  onClick={() => sendMessage()} className={styles.sendIcon} />
            </div>
            }

        </div>

        </div>

        </>
    )
}


export default Chat;