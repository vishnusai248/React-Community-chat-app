import React, { useEffect, useRef, useState } from 'react'
// import logo from '../applogo.png'
import './styles/chatinterface.scss';
import { auth,db } from "../firebase";
import { addDoc, collection,orderBy, query,limit, serverTimestamp,onSnapshot } from 'firebase/firestore';
import Message from './Message';
import { useAuthState } from "react-firebase-hooks/auth";

export default function Chatinterface() {
  const [inputmsg,setinputmsg]=useState("");
  const [messages,setmessages]=useState([]); //array to store messages
  const scroll =useRef();
  const [user] = useAuthState(auth);
  useEffect(() => {
    const q=query(collection(db,"messages"),
            orderBy("createdAt","desc"),
            limit(50)
          );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.createdAt - b.createdAt
      );
      setmessages(sortedMessages);
      console.log("allmessages:",sortedMessages)
      scroll.current.scrollTop = scroll.current.scrollHeight;
    });
    return () => unsubscribe; //cleanup when component is dismounted
     }, []);

    

    const logout =()=>{
      auth.signOut()
    }

    const sendmessage= async(event)=>{
      event.preventDefault();
      const { uid, displayName, photoURL } = auth.currentUser;
      console.log("display prop::",auth.currentUser)
      await addDoc(collection(db,"messages"),{
        text: inputmsg,
        name: displayName || "Anonymous",
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid
      });
      setinputmsg("");
    }
  return (
    <div className='chatstyles'>
        <h1 className="">Chat Dojo</h1><span><button onClick={logout} className='btn btn-danger'>Signout</button></span>
        <div className='chatdiv'>
                <header className=''>
                 
                        <h2 className='title px-2'>Community chat</h2>
                    
                </header>
                <section className='flex-grow-1 chatsection'>
                    <div className='chatbox'>
                      <div className='messages-wrapper '>
                      {messages?.map((message) => (
                        <div className={`${message.uid === user.uid ? "right" : ""}`}>
                          <Message key={message.id} message={message} />

                        </div>
                        ))}
                      </div>
                    </div>
                    
                </section>
                <span ref={scroll}></span>
                <footer className='flex-shrink-1'>
                    <div className='messagebox w-100 p-3'>
                        <form onSubmit={(e)=>sendmessage(e)} >
                        <label htmlFor="message" hidden>
                          Enter Message
                        </label>
                        <input name='message' className='form-control w-100' placeholder='type something ...!' value={inputmsg} onChange={(e)=>{setinputmsg(e.target.value)}} type='text'></input>
                        <button className='sendbtn btn btn-primary'>Send</button>

                        </form>
                    </div>
                </footer>
        </div>
    </div>
  )
}
