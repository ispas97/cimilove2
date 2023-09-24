const express = require("express");
const router = express.Router();
const Oglas=require('../models/oglas')
const mongoose=require('mongoose')
const User=require('../models/user')


//Za sve oglase na sajtu
router.get("/", async (req, res) => { //localhost:3000/oglasi/
   try{
        let query=Oglas.find()
        const oglasi=await query.exec()
        res.render('oglasi/index',{
            oglasi:oglasi
    })} catch {oglasi
        res.redirect('/')
    }
})


router.get('/new',(req,res)=>{
    renderNewPage(res,new Oglas())
})

router.post('/',async (req, res)=>{
    const oglas= new Oglas({
        naslov:req.body.naslov,
        user:req.body.user,
        adresa:req.body.adresa,
        //coverImageName:req.body.cover,
        description:req.body.description
    })
    //saveCover(book,req.body.cover)
    try{
    console.log("doso je ovde")
    const newOglas=await oglas.save()
    res.redirect(`oglasi/${newOglas.id}`)
    } catch{
        
        if (book.coverImageName != null) {
            removeBookCover(book.coverImageName)
          }
          renderNewPage(res, book, true)
        }
    

})
//Za oglase jednog Oglas
router.get("/:id", async (req, res) => { //localhost:3000/oglasi/
    try{
        const oglas=await Oglas.findById(req.params.id).populate('oglas').exec()
        res.render('oglasi/show',{oglas:oglas})
    }catch{
        res.redirect('/')
    }
})

router.post("/:id", (req, res) => { //localhost:3000/oglasi/
    res.send("Oglasi za: " + req.body.chooseCity);
})

router.post("/odredjeni", (req, res) => {
    var grad = req.body.chooseCity;
    console.log(grad);
    res.send("Samo oglasi u radiusu :)");
})
router.get('/:id/edit',async (req,res)=>{
    try{
        const oglas=await Oglas.findById(req.params.id)
        renderEditPage(res,oglas)

    }catch{
        res.redirect('/')
    }
  
 })

async function renderNewPage(res,oglas,hasError = false){
    renderFormPage(res,oglas,'new',hasError)
}

async function renderEditPage(res,oglas,hasError = false){
    renderFormPage(res,oglas,'edit',hasError)
}
async function renderFormPage(res,oglas,form,hasError = false){
    try{
    const users=await User.find({})
    const params={
        users:users,
        oglas:oglas
    }
    if (hasError) {
        if (form === 'edit') {
          params.errorMessage = 'Error Updating Oglas'
        } else {
          params.errorMessage = 'Error Creating Oglas'
        }
      }
    res.render(`oglasi/${form}`,params)
    }catch{
        res.redirect(')')
    }
}

router.put('/:id',async (req, res)=>{
    let oglas
    try{
    oglas=await Oglas.findById(req.params.id)
    oglas.naslov=req.body.naslov
    oglas.user=req.body.user
    oglas.adresa=req.body.adresa
    oglas.description=req.body.description
    /* if (req.body.cover !=null && req.body.cover!=='' ){
        saveCover(oglas,req.body.cover)
    } */
    await oglas.save()
    res.redirect(`/oglasi/${oglas.id}`)
    } catch(err){
        console.log(err)
        if (oglas != null){
        renderEditPage(res,oglas,true)
        }else{
            redirect('/')
        }
    }

})


router.delete('/:id',async (req,res)=>
{
    let oglas
    try{
        oglas=await Oglas.findById(req.params.id)
        await oglas.remove()
        res.redirect('/oglasi')
    }catch{
        if (oglas!=null){
            res.render('oglasi/show',{
                oglas:oglas,
                errorMessage:'Could not remove oglas'
            })
        }else{
            res.redirect('/')
        }
    }
} )

module.exports = router;