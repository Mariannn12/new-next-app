import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import ResponsiveAppBar from '@/src/Components/NavBar';
import {getServerSession} from "next-auth/next"
import  {authOptions}  from '../api/auth/[...nextauth]';

export async function getServerSideProps(context){

  const session = await getServerSession(context.req, context.res, authOptions);

    return {
      props:{
        usersession : session,
        userlocations : session ? await (await fetch(`http://localhost:3000/api/mongo/getuser?email=${session.user.email}`)).json() : {}

      }
    }
  
}


export default function SearchPlaces({usersession}){
  const {data:session} = useSession({required:true})
  
  return (
    <>
      <ResponsiveAppBar session={usersession} logOut={()=>signOut()}/>

      <button onClick={()=> signOut()}>Sign out</button>
    

      <pre>
        {JSON.stringify(usersession,null,2)}
      </pre>

     
  
    </>
  )
}
