import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import Router from 'next/router'


const Login= () =>{
    const {data:session} = useSession({required:true})

    if(session){

        window.location.href = "/home"

        return(
            
            <div>

                <p>Welcome, {session.user.email}</p>
                <button onClick={()=>signOut()}>Sign out</button>
            </div>
            
        )
        
    }else{
        return(
            <div>

                <p>You are not signed in.</p>
                <button onClick={()=>signIn('google',{callbackUrl : '/home'})}>Log in</button>
            </div>
        )
    }
}

export default Login;