

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './blog.css'
import { getPostByid , BasedUrl} from '../api/postapi'

const SinglePostVeiw  =()=>{
 
     const {id} = useParams()
     const [post,setPost] = useState(null)
     const [ loading ,setLoading] = useState(true)
     const [error,setError] = useState(null)
 
     useEffect(()=>{
        const fetchPost = async()=>{
             try{
                const response = await getPostByid(id)
                setPost(response.data)
                setLoading(false)
             }catch(error){
                setError('Faild to Featch Data')
                setLoading(false)

             }
        }

        fetchPost()
     },[id])

if (loading){
     return <div>Laoding ............</div>
}
if(error){
    return <div>Error .........</div>
}




    return(<>
        <div className="post-details-container">
            {
                 post &&(
                      <>
                        <h1>{post.title}</h1>
                        <h2>{post.subtitle}</h2>
                        <p>{post.content}</p>
                        <p><b>Category</b> {post.category}</p>

                        {
                            post.image &&(
                                <img src={`${BasedUrl}${post.image}`} />

                            )
                        }
                        
                        </>
                 )
            }
        </div>
    
    </>)
}

export default SinglePostVeiw