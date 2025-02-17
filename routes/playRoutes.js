const express = require('express');
const router = express.Router();

router.get('/eletro_hiphop_metal', function(req, res){
    res.render('eletro_hiphop_metal');
});
  
router.get('/funk_phonk_pop', function(req, res){
    res.render('funk_phonk_pop');
});
  
router.get('/hiphop_metal_pop', function(req, res){
    res.render('hiphop_metal_pop');
});
  
router.get('/phonk_metal_pop', function(req, res){
    res.render('phonk_metal_pop');
});
//____________________________________________________________________________________________


//Rotas para Eletro/Hip-Hop/Metal
//____________________________________________________________________________________________
router.get('/plays/play1', function(req, res){
    res.render('plays/play1');
});
  
router.get('/plays/play2', function(req, res){
    res.render('plays/play2');
});
  
router.get('/plays/play3', function(req, res){
    res.render('plays/play3');
});
//____________________________________________________________________________________________


//Rotas para Funk/Phonk/Pop
//____________________________________________________________________________________________
router.get('/plays2/play1', function(req, res){
    res.render('plays/play1');
});
  
router.get('/plays2/play2', function(req, res){
    res.render('plays/play2');
});
  
router.get('/plays2/play3', function(req, res){
    res.render('plays/play3');
});
//____________________________________________________________________________________________


//Rotas para Hip-Hop/Metal/Pop
//____________________________________________________________________________________________
router.get('/plays3/play1', function(req, res){
    res.render('plays/play1');
});
  
router.get('/plays3/play2', function(req, res){
    res.render('plays/play2');
});
  
router.get('/plays3/play3', function(req, res){
    res.render('plays/play3');
});
//____________________________________________________________________________________________


//Rotas para Phonk/Metal/Pop
//____________________________________________________________________________________________
router.get('/plays4/play1', function(req, res){
    res.render('plays/play1');
});
  
router.get('/plays4/play2', function(req, res){
    res.render('plays/play2');
});
  
router.get('/plays4/play3', function(req, res){
    res.render('plays/play3');
});
//____________________________________________________________________________________________

module.exports = router;