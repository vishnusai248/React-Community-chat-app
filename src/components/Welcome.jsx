import React from 'react'
import '../components/styles/welcome.scss';
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

export default function Welcome() {
  const signin=()=>{
    console.log(window.location);
    const provider =new GoogleAuthProvider();
    signInWithRedirect(auth,provider)
  }
  return (
    <>
      <div className='welcome'>
        <h1>Ta Da ..!</h1>
        {/* <br /> */}
        <h1>Welcome to the Chat Dojo!</h1> 
        <button onClick={signin} className='btn btn-primary'>Sign In</button>
      </div>
    </>
  )
}
