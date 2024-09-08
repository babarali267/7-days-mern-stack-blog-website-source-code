
import React, { useState } from 'react'
import './blog.css'
import { createPost } from '../api/postapi'
export default function NewPost (){

    const [formData,setFormData] = useState({
     title:'',
     subtitle:'',
     content:'',
     category:'',
     image :null
    })

    const handleChange = (e)=>{
     const {name,value,files} = e.target
     setFormData((prevData)=>({
          ...prevData,
          [name] : files ? files[0] : value
     }))
 
    
    }

//  Form Data Submit 


 const handleSubmit = async(e)=>{
      e.preventDefault();

      const postData = new FormData()
      Object.keys(formData).forEach((key)=>{
        postData.append(key,formData[key])
      })

     try{
          await createPost(postData)
          alert('Post created successfully')
          setFormData({
            title:'',
            subtitle:'',
            content:'',
            category:'',
            image :null
          })


     } catch(error){
          console.log('Error posting' , error);
          alert('Error in createing post')
          
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
                onChange={handleChange}
                />

                <button type='submit'>Submit</button>
             </form>
        </div>
     </>)
}