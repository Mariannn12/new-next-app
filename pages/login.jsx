import React from 'react'
import {useSession, signIn, signOut} from 'next-auth/react'
import { useRouter } from 'next/router'


const Login= () =>{
    const {data:session} = useSession({required:true})
   const router = useRouter()
    if(session){
       

       router.push("/home")
        
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