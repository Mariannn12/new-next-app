import {useSession, signIn, signOut, getSession} from 'next-auth/react';
import ResponsiveAppBar from '@/src/Components/NavBar';
import {getServerSession} from "next-auth/next"
import  {authOptions}  from '../api/auth/[...nextauth]';

export async function getServerSideProps(context){

  const session = await getServerSession(context.req, context.res, authOptions);

    return {
      props:{
        usersession : session,
        userlocations : session ? await (await fetch(`https://${context.req.headers.host}/api/mongo/getuser?email=${session.user.email}`)).json() : {},
        hostname: context.req.headers.host

      }
    }
  
}


export default function SearchPlaces({usersession, userlocations,hostname}){
  const {data:session} = useSession({required:true})
  
  return (
    <>
      <ResponsiveAppBar session={usersession} logOut={()=>signOut()} hostname={hostname} />

      <button onClick={()=> signOut()}>Sign out</button>
    

      <pre>
        {JSON.stringify(usersession,null,2)}
      </pre>

      <pre>

        {JSON.stringify(userlocations,null,2)}
      </pre>

     
  
    </>
  )
}
