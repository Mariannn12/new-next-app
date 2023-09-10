import {MongoClient} from 'mongodb'

export default async function handler(req,res){
    const uri = process.env.MONGO_STRCON
    const client = new MongoClient(uri)
    try{

        const data = req.body
        const database = client.db("Weather")
        const users = database.collection("Users")
        
        if((await (users.find({"email" : {$eq : data.email}})).toArray()).length){

            res.status(500).send({message : "Error - the user is already present"})
        }
        else{
            const result = await users.insertOne(data)
            res.status(201).send({message : result})
        }

    }catch(error){
        res.status(500).send({message : error})
    }finally{
        client.close()
    }

}