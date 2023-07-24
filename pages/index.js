import {useSession, signIn, signOut, getSession} from 'next-auth/react';

export async function getServerSideProps(context){
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=86400"

  )


  const session = await getSession(context);
  if(!session){
    return{
      redirect:{
        destination : '/login',
      },
    }
  }

  return {
    props:{
      usersession : session
    }
  }
}

export default function Home({usersession}){
  return (
    <>
    
      
    </>
  )
}
