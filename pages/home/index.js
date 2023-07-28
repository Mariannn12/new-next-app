import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import ResponsiveAppBar from '@/src/Components/NavBar';
import {getServerSession} from "next-auth/next"
import  {authOptions}  from '../api/auth/[...nextauth]';

export async function getServerSideProps(context){

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=86400"

  )

  const session = await getSession(context)


 

  return {
    props:{
      usersession : await getServerSession(context.req, context.res, authOptions),
      userlocations : await (await fetch(`http://localhost:3000/api/db/recentlocations?email=${session.user.email}`)).json()
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

export default function SearchPlaces({usersession}){

  
  return (
    <>
      <ResponsiveAppBar session={usersession} logOut={()=>logOut()}/>
    
      
    </>
  )
}
