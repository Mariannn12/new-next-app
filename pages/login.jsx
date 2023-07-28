import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'



const Login= () =>{
    const {data:session} = useSession({required:true})
   
    if(session){
        signIn('google', {callbackUrl : 'http://localhost:3000/nonexistent'})
        
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
                <button onClick={()=>signIn('google',{callbackUrl : 'http://localhost:3000'})}>Log in</button>
            </div>
        )
    }
}

export default Login;