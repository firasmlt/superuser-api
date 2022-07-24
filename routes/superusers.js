const express = require("express");
const Superuser = require("../models/Superuser");
const router = express.Router();

router.get("/", (req, res) => {
    Superuser.find().then(data=>
        res.status(200).json(data)).catch(err=>res.json({message:err}));
});


router.post("/", (req, res) => {
  const superuser = new Superuser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email:req.body.email,
    number:req.body.number,
    company:req.body.company,
    answers:req.body.answers
  });
 
  superuser
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json({message:err}));

});

module.exports = router;
