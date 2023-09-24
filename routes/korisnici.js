const express = require('express')
const router = express.Router()
const User=require('../models/user')
const mongoose=require('mongoose')


router.get('/', async(req, res) => {
     /* let searchOptions={}
     if(req.query.name!=null && req.query.name !==''){
        searchOptions.name=new RegExp(req.query.name,'i')
    } */  

    try {
        let query=User.find()
        const users=await query.exec()
       /*  const users= await User.find(searchOptions) */
        res.render('korisnici/index',{
        users:users,
        searchOptions:req.query 
        
    })
    }

    catch{
        console.log("nece")
        res.redirect('/')
    }
  /* res.render('index') */
})

 router.get('/new',(req,res)=>{
    res.render('korisnici/new',{ user:new User()})
})

router.post('/new',(req,res)=>{
    const user=new User({
        username:req.body.username
    })
    try
    {
    const newUser=user.save()
    //res.redirect(`users/${user.id}`)
    
    res.redirect('/new')
    }
    catch{
        res.render('korisnici/new',{
                user:user,
                errorMessage:'Error creating User'

            })
        }
    })

    router.get('/:id',async (req,res)=>{
        try{
            const user=await User.findById(req.params.id)
           /*  const books=await Book.find({author:author.id}).limit(6).exec() */
            res.render('users/show',{
                user:user,
                /* booksByAuthor:books */
            })
        }catch(err){
            console.log(err)
            res.redirect('/')
        }
    })

    router.get('/:id/edit',async (req,res)=>{
        try{
            const user=await User.findById(req.params.id)
            res.render('users/edit',{ user:user})

        }
        catch{
            res.redirect('/users')
        }
        res.render('users/edit',{ user:new Users()})
    })

    router.put('/:id',async (req,res)=>{
       let user
        try
        {
       
        user= await User.findById(req.params.id)
        user.username=req.body.username
        console.log(user.username)
        await user.save()
      
       /*  res.redirect(`/authors/${author.id}`) */
        
        res.redirect('users')
        }
        catch{

            if (user==null){
                console.log("GRESKA JE OVDE")
                res.redirect('/')
            }else{
                res.render('users/edit',{
                    user:user,
                    errorMessage:'Error updating User'
    
                })
            }
            
            }
    })

    router.delete('/:id',async (req,res)=>{
        let user
        try
        {
        user= await User.findById(req.params.id)
        await user.remove()
        res.redirect('/users')
        //res.redirect('authors')
        }
        catch{
            if (user==null){
                res.redirect('/')
            }else{
                res.redirect(`/users/${user.id}`)
            }
            
            }
    }) 
module.exports = router