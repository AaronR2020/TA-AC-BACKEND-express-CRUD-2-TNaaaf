var express = require('express');
var Article = require('../model/article');
var router = express.Router();


/* GET blog listing. */
//display index.ejs
router.get('/', function(req, res, next) {
  Article.find({},(e,d)=>{
    if(e){next(e)}
    else{
      res.render('index',{Blogs:d});
    }
  })
});//done

//display form.ejs
router.get('/create', function(req, res, next) {
  res.render('form');
});//done

//display articleInfo.ejs
router.get('/:id', function(req, res, next) {
  id=req.params.id;
  Article.findById(id,(e,d)=>{
    if(e){next(e)}
    else{
      //display specific information on articleInfo
      res.render('articleInfo',{Blogs:d});
    }
  });
});//done

//display formUpdate
router.get('/:id/edit', function(req, res, next) {
  id=req.params.id;
  Article.findById(id,req.body,(e,d)=>{
    if(e){next(e)}
    else{
      //populate update-form with these values
      res.render('formUpdate',{blog:d});
    }
  })
});//done

//delete
router.get('/:id/delete', function(req, res, next) {
  id=req.params.id;
  findByIdAndDelete(id,(e)=>{e?next(e):res.redirect('/blog');})
});//done

/* POST blog listing. */
router.post('/:id/update', function(req, res, next) {
  id=res.param.id;
  Article.findByIdAndUpdate(id,req.body)
  res.render('formUpdate');
});//done

router.post('/create', function(req, res, next) {
  //post value to database and display index page
  console.log(req.body);
  Article.create(req.body, (err,data) => {
    if(err){
      next(err)
    } else{
      console.log("created!!");
     res.render('index',{Blogs:data});
    }
  })
});//done

module.exports = router;
