import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import React from 'react';
import ResponsiveAppBar from '@/src/Components/NavBar';
import {getServerSession} from "next-auth/next"
import  {authOptions}  from '../api/auth/[...nextauth]';
import SearchAnyLocation from '@/src/Components/Search';
import UserRecentLocation from '@/src/Components/RecentUserLocations';


export async function getServerSideProps(context){

  const session = await getServerSession(context.req, context.res, authOptions);

  if(!session){

    return {
      redirect:{
        destination : `https://${context.req.headers.host}/api/auth/signin`,
        permanent : false
      }
    }
  }

  return {
    
    props:{

      usersession : session,
      present :  await(await fetch(`https://${context.req.headers.host}/api/mongo/postuser`, {

        method : "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          name: session.user.name,
          email: session.user.email,
          created_at : new Date().toLocaleString(),
          recentplaces : []
        })

      })).json(),
      userlocations : await (await fetch(`https://${context.req.headers.host}/api/db/recentlocations?email=${session.user.email}`)).json() ,
      hostname: context.req.headers.host,
      googlekey : await (await fetch(`https://${context.req.headers.host}/api/googleapikey`)).json() 

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

export default function SearchPlaces({usersession, userlocations,hostname,googlekey,present}){
 
  const {data:session} = useSession({required:true})
  const loaded = React.useRef(false);

  if(typeof window !== 'undefined' && !loaded.current){

    if(!document.querySelector('#google-maps')){

      loadScript(`https://maps.googleapis.com/maps/api/js?key=${googlekey.key}&libraries=places&callback=Function.prototype`,document.querySelector('head'),'google-maps',)

    }

    loaded.current = true

  }

  React.useEffect(()=>{

    ;(async function(){

      

    })()

  }, [])
  

  return (
    <>
      {session && (
        <>
        <ResponsiveAppBar session={usersession} logOut={()=>signOut()} hostname={hostname}/>
        <SearchAnyLocation/>
        <UserRecentLocation locations={userlocations} userSession={usersession} hostname={hostname}/>
        </>
      )}
    </>
  )
}
