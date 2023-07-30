import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import React from 'react';
import ResponsiveAppBar from '@/src/Components/NavBar';
import {getServerSession} from "next-auth/next"
import  {authOptions}  from '../api/auth/[...nextauth]';
import SearchAnyLocation from '@/src/Components/Search';
import { useColorScheme } from '@mui/material';

export async function getServerSideProps(context){

  const session = await getServerSession(context.req, context.res, authOptions);

    return {
      props:{
        usersession : session,
        userlocations : session ? await (await fetch(`https://${context.req.headers.host}/api/mongo/getuser?email=${session.user.email}`)).json() : {},
        hostname: context.req.headers.host,
        googlekey : session ? await (await fetch(`https://${context.req.headers.host}/api/googleapikey`)).json() : {}

      }
    }
  
}


function loadScript(src, position, id){

  if(!position){
    return;
  }
  
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
  
}


export default function SearchPlaces({usersession, userlocations,hostname,googlekey}){
  const {data:session} = useSession({required:true})

  const loaded = React.useRef(false);

  if(typeof window !== 'undefined' && !loaded.current){
    if(!document.querySelector('#google-maps')){
      loadScript(`https://maps.googleapis.com/maps/api/js?key=${googlekey.key}&libraries=places`,
      document.querySelector('head'),
      'google-maps',
      )
    }
    loaded.current = true
  }

  React.useEffect(()=>{
    ;(async function(){
      await fetch(`https://${hostname}/api/mongo/postuser`, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },

        body : JSON.stringify({
          name: useSession.user.name,
          email: usersession.user.email,
          created_at : new Date().toLocaleString(),
          recentplaces : []
        })
      })
    })()
  }, [])
  
  return (
    <>
      <ResponsiveAppBar session={usersession} logOut={()=>signOut()} hostname={hostname} />
      <SearchAnyLocation/>

      
    

      
    </>
  )
}
