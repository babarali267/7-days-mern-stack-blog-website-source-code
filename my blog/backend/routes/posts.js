import express from 'express'
import multer from 'multer'
import Article from '../models/postmodel.js'

const router = express.Router()


// uplod file on server


const storage = multer.diskStorage({
     destination: function(req,file,cb){
        cb(null,'uploads/')
     },
     filename:function(req,file,cb){
        cb(null, Date.now() + '-' + file.originalname)
     }
})
const upload = multer({storage:storage})

// Data inset / post into database 

router.post('/add',upload.single('image'), async(req,res)=>{
     const {title,subtitle,content,category} = req.body;
     const image = req.file ? req.file.path : null;

     try{
        const newArticle= new Article({
            title,
            subtitle,
            content,
            category,
            image //save iamge in path of database 
        })

        await newArticle.save()
        res.status(201).send('Article added successfully')


     } catch(error){
        console.error('Error in adding Article', error);
        res.status(500).send('server server')
        
     }


})

// -----------------------------

// Data show from Database 

router.get('/view', async(req,res)=>{
   try{
      const articles = await  Article.find()
      
      res.status(200).json(articles)
   }catch(error){
       console.error("error in geting posts", error);
      
       
   }
})

// Show Single Post 

router.get('/view/:id' , async(req,res)=> {
    const {id} = req.params
    try{
        const article = await Article.findById(id)
        res.status(200).json(article)
    }catch(error){
        console.error("error in geting posts", error);
        res.status(500).send('server server')
    }

})

// Delete data 


 router.delete('/delete/:id', async(req,res)=>{
    const {id} = req.params
    try{
        await Article.findByIdAndDelete(id)
        res.status(200).send('Article deleted successfully')
    }catch(error){
        console.error("error in geting posts", error);
        res.status(500).send('server server')
    }

 })


// Update a Post By id 

router.patch('/update/:id', upload.single('image'), async(req,res)=>{
     const {id} = req.params
     const {title,subtitle,content,category} = req.body;
     const image = req.file ? req.file.path : null;

  try {
    const article = await Article.findById(id);
    if (!article) {
      return res.status(404).send('Article not found');
    }

    article.title = title;
    article.subtitle = subtitle;
    article.content = content;
    article.category = category;

    if(image){
        article.image = image;
    }    

    await article.save();
    res.status(200).send('Article updated successfully');


  }     catch (error) {
       console.error("error in geting posts", error);
      res.status(500).send('server server')
  }

    
})



export default router