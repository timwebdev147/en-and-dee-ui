import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from '../private_chat/chatbox.module.scss'
import community_styles from './community.module.scss'
import { useRef } from "react";
import {FiSend} from 'react-icons/fi'
import {RiWechatLine} from 'react-icons/ri'
import {GrGroup} from 'react-icons/gr'
import { VscSmiley } from "react-icons/vsc";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {io} from 'socket.io-client';
import Message from "@/components/message/message";



function Community(params) {
    
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
    const [conversationId, setConversationId] = useState("")
    const [pickerVisibility, setPickerVisibility] = useState("hide");

    //connect and get new messages from the socket
    useEffect(() => {
        //connect to socket
        socket.current = io(`${ws_url}`);
        //get new messages from the socket
        socket.current.on("getMessage", data => {

            setArrivalMessage({
                senderId: data.senderId,
                senderRole: data.senderRole,
                senderName: data.senderName,
                text: data.text,
                createdAt: Date.now()
            })
        })

        
    }, [messages])
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

        let selectElem = document.getElementById('roomType')
        let room = selectElem.value
        let data = {
            roomName: room,
            member: user
        }
        //create chatroom and register user's Id to the chatroom
        axios.post(`${api_url}/api/chatroom/joinRoom`, data,{
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            setConversationId(res.data.room._id)
            setRoomMembers(res.data.room.members)
            getRoomUsers(res.data.room._id)
            getConversations(res.data.room._id)
            console.log("chatroom",  res.data);
        }).catch(error => {
            console.log(error);
        })

        //socket call to join the socket room 
        socket.current.emit("joinRoom", room)
        //get users active in the room
        socket.current.on("getUsersInRoom", data => {
            setRoomType(room)
            setChatStatus("started")
            console.log("room users", data);
        })
    }
    //get users who have joined the room
    function getRoomUsers(id){
        axios.get(`${api_url}/api/chatroom/${id}`,{
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log("room users",res.data);
            setRoomMembers(res.data.members)
        }).catch(err => {
            console.log(err);
        })
    }
    //add emoji to textarea value
    function add_emoji_to_text(data){
        setValue(value + data.native)
    }
    //send message to the socket and save it to the database
    function sendMessage(params) {
        let data = {
            conversationId,
            senderId: user._id,
            senderName: user.firstName,
            senderUserName: user.userName,
            senderRole: user.role,
            text: value
        }

        socket.current.emit("sendMessage", {
            room: roomType,
            senderId: user._id,
            senderName: user.firstName,
            senderUserName: user.username,
            senderRole: user.role,
            text: value
        })
        setStatus('sent')
        setTimeout(() => {
            setStatus('not sent')
        }, 2000);
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
    // socket emit and events
    useEffect(() => {
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

        <>{
            chatStatus == 'not started'?
            <div className={styles.chatboxPrompt + " " + community_styles.prompt}>
            <h1> Hi! {`${user.fullName}`} You're welcome to chat with fellow users, please choose your community. </h1>

            <select name=""  id="roomType">
                <option value="over-weight" onClick={() => joinRoom('over-weight')}>over-weight</option>
                <option value="under-weight" onClick={() => joinRoom('under-weight')}>under-weight</option>
                <option value="diabetes" onClick={() => joinRoom('diabetes')}>diabetes</option>
                <option value="hypertensive" onClick={() => joinRoom('hypertensive')}>hypertensive</option>
            </select>

            <button onClick={() => joinRoom()}>Join Room</button>

        </div>
        :
        <div className={community_styles.communityBox}>

        <div className={community_styles.chatSideBar}>
            <div className={community_styles.community_name}>
            <label htmlFor=""><RiWechatLine className={community_styles.com_icon}/> Community Name</label>
            <p>{roomType}</p>
            </div>
            <div className={community_styles.active_members + " " + styles.active_users}>
            <label htmlFor=""><GrGroup className={community_styles.com_icon} />Active Room Members</label> 
            {
                active_members?.filter(user => { 
                    return roomMembers.some(member => { return user.userId === member._id }) 
                }).map((member, index) => (
                    user.role == 'admin' && member.userRole == "admin"?
                    <p key={index} className={styles.current_chat_with} >Me (Admin)</p>:
                    member.userRole == "admin"?
                    <p key={index} >Diet Bar (Admin)</p>:
                    <p key={index} className={member.userId == user._id? styles.current_chat_with: null} >{member.userUsername} ({member.userFirstName})</p>
                ))
            }
            </div>
            <div className={community_styles.active_members}>
            <label htmlFor=""><GrGroup className={community_styles.com_icon} />Room Members</label> 
            
            {
                roomMembers?.map((member, index) => (
                    member.role == 'admin' && user.role == 'admin'?
                    <p key={index} className={styles.admin_user} >Me (Admin)</p>:
                    member.role == "admin"?
                    <p key={index} >Diet Bar (Admin)</p>:
                    <p key={index} >{member.username} ({member.firstName})</p>
                ))
            }
            </div>
        </div>
        <div className={styles.chatbox + " " + community_styles.community}>
            <div onClick={() => {setPickerVisibility('hide')}} className={styles.messagesBox} ref={messageBoxRef} 
            tabIndex={0}>


            {
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

        </div>

        </div>
        }

        </>
    )
}


export default Community;