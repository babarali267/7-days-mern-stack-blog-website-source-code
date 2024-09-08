import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cors from 'cors'

import postRouter from './routes/posts.js'


const app = express()

app.use(express.json())
app.use(bodyParser.json({limit:'30mb' , extended :true}))
app.use(bodyParser.urlencoded({limit:'30mb' , extended :true}))
app.use(cors())



app.get('/',(req,res)=>{
     res.send('hello')
})


app.use('/uploads', express.static('uploads'))
app.use('/api/posts', postRouter)


const CONNECTION_URL ="mongodb://myblogs:myblogs123@myblogs-shard-00-00.prffb.mongodb.net:27017,myblogs-shard-00-01.prffb.mongodb.net:27017,myblogs-shard-00-02.prffb.mongodb.net:27017/?ssl=true&replicaSet=atlas-2mpq7s-shard-0&authSource=admin&retryWrites=true&w=majority&appName=myblogs"
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server Runing on ${PORT}`);

    })
}).catch((error)=> console.log(error.message));

