import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import { getPostByid, updatePost } from '../api/postapi'


const EditPost =()=>{
 const navigation = useNavigate()

    const {id : postId} = useParams()

    const [formData,setFormData] = useState({
        title:'',
        subtitle:'',
        content :'',
        category:'',
        image:'null'
    })

  const [loading,setLaoding] = useState(true)
  const [error,setError] = useState(null)
 

  useEffect(()=>{
    const fetchPost = async ()=>{
         try{
            const response = await getPostByid(postId)
            setFormData({
                 title:response.data.title || '',
                 subtitle:response.data.subtitle || '',
                 content:response.data.content || '',
                 category:response.data.category || '',
                 image:response.data.image || 'null'

            })
            setLaoding(false)

            

         }catch(error){
            console.log("error to fetch posts" ,error);
            setError('Fail to Fetch')
            setLaoding(false)
            
         }
    }

    fetchPost()
  },[postId])

const handleChange =(e)=>{
 const {name,value} = e.target;

setFormData((prevData)=>({
    ...prevData,
    [name] : value
}))

}

const handleImageChange = (e)=>{
    setFormData((prevData)=>({...prevData , image : e.target.files[0]}))
}



const handleSubmit = async(e)=>{
 
   e.preventDefault()
   const formDataToSend = new FormData()
    formDataToSend.append('title',formData.title)
    formDataToSend.append('subtitle',formData.subtitle)
    formDataToSend.append('content',formData.content)
    formDataToSend.append('category',formData.category)

    if(formData.image){
        formDataToSend.append('image',formData.image)
    }

    try{
        const response = await updatePost(postId,formDataToSend)
        console.log(response);
        alert('data submited')
        navigation('/')
    }catch(error){
        console.log("error to update post" ,error);
        setError('Fail to update')
    }

}






    return(<>
    
    <div className="mypost">
             <h1>Create New Post</h1>

             <form onSubmit={handleSubmit} encType='multipart/form-data'>

                         <input
                         type="text"
                         name='title' 
                         placeholder='Enter Title'
                         value={formData.title} 
                         onChange={handleChange}/>

                         <input 
                         type="text"
                         name='subtitle' 
                         placeholder='Enter subtitle'
                         value={formData.subtitle}
                         onChange={handleChange}/>

                  <textarea 
                        type="text"
                         name='content'
                         placeholder='Enter content'
                         value={formData.content} 
                        onChange={handleChange}>
                   </textarea>

                  <select name='category'
                   value={formData.category} 
                   onChange={handleChange}>
                    <option value='html'>HTML</option>
                    <option value='css'>CSS</option>
                    <option value='javascript'>Javascript</option>
                    <option value='react'>React</option>
                    
                  </select>


               <input
                type='file'
                name='image'
                accept='image/*'
                onChange={handleImageChange}
                />

                <button type='submit'>Submit</button>
             </form>
        </div>

    </>)
}

export default EditPost