import React, { useEffect, useState } from 'react'
import './blog.css'
import { deletePost, getAllPosts , BasedUrl } from '../api/postapi'
 import {useNavigate} from 'react-router-dom'
export default function Blog () {

const [posts,setPost]= useState([])
const [loading,setLoading] = useState(true)
const [error,setError] = useState(null)

const navigate = useNavigate()



useEffect(()=>{
    const fetchPosts = async()=>{
      try{
        const response = await getAllPosts()
         setPost(response.data)
         setLoading(false)

      }catch(error){
         setError('Faild to Featch Data')
        setLoading(false)
        
      }
    }
    fetchPosts()
},[])


const trucateContent = (content,wordLimit)=>{
   const word = content.split(' ')
   if( word.length > wordLimit){
      return word.slice(0,wordLimit).join(' ') + '.....';
   }
   return content
}


// handleViewClick
const handleViewClick = (postId)=>{
  navigate(`/posts/${postId}`)
}
// handleEditclick

const handleEditclick =(id)=>{
  navigate(`/editposts/${id}`)

}


// handleDeleteClick

const handleDeleteClick = async(id)=>{
  try{
    await deletePost (id)
    setPost(posts.filter((post)=>post._id !== id))
  }catch(error){
    console.log('Error deleting post',error)
  }

}




  return (
    <div className='container'>
         <h1>My Blog</h1>
         <h4>This is my Blogging site</h4>
         <p>{posts.length} Posts</p>
      
           {
           posts.map((post)=>(
              <div key={post._id}>

               <div className="articles">
                 <div className="postarea">
                    <h2>{post.title}</h2>
                    <h2>{post._id}</h2>
                     <h3>{post.subtitle}</h3>
                     <p>{trucateContent(post.content,70)}</p>
                     <p><b> Category:</b>{post.category}</p>
                     <button className='view' onClick = {()=> handleViewClick(post._id)}>View</button>
                     <button className='edit' onClick={()=> handleEditclick(post._id)}>Edit</button>
                     <button className='del'  onClick = {()=> handleDeleteClick(post._id)}>Delete</button>
                 </div>

                 <div className="postimage">
                 <img src={`${BasedUrl}${post.image}`} />
                 </div>
               </div>

                     
              </div>
            ))
           }
     

    </div>
  )
}