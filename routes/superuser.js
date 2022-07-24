const express = require("express");
const Superuser = require("../models/Superuser");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(400).json({message:'bad request'})
});

router.get('/:id', (req, res)=>{
    Superuser.findById(req.params.id).then(data=>{
        if(data) return res.status(200).json(data)
        res.status(404).json({message:'document not found'})
})})

router.patch('/:id', (req, res)=>{
    Superuser.findOneAndUpdate({_id:req.params.id}, req.body,{new:true}, (err, doc)=>{
        if(!doc) res.status(404).json({message:'not found'})
        res.status(200).json(doc)
    })
})


module.exports = router;