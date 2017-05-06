var bodyparser = require('body-parser');
//var data = [{item:'nodejs'},{item:'expressJS'},{item:'mongo db'},{item:'angular'}]
var urlencodedParser = bodyparser.urlencoded({extended: false});

var mongoose = require('mongoose');

//connection to mongoDB
mongoose.connect('mongodb://mean:mean@ds129651.mlab.com:29651/docketdata');

//schema creation
var docschema = new mongoose.Schema({item:String});

var docmodel = mongoose.model('docmodel', docschema);
//var itemOne = docmodel({item:'meanstack'}).save(function(error){
  //if(error) throw error;
  //console.log('saved successfully');
//});

module.exports  = function(app){

app.get('/docket', function(req, res){
// getting data from mongoDB
    docmodel.find({},function(error, data){
      if(error) throw error;
      res.render('docket', {lister: data});
    });
});

app.post('/docket', urlencodedParser, function (req, res){
//get data from view and save to database
 var newDocModel = docmodel(req.body).save(function(error,data){
   if(error) throw error;
    res.json(data);
 });
});

app.delete('/docket/:item',function(req,res){
//deleting the requested data by removing frm database
docmodel.find({item: req.params.item.replace('/\-/g'," ")}).remove(function(error,data) {
  if(error) throw error;
  res.json(data);
});
 });
}
