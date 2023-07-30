import {getServerSession} from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

export default async function handler(req,res){
    const session = await getServerSession(req,res,authOptions)

    if(session){
        return res.json(session)
    }

    res.send({error : "You must login to see this page"})
}