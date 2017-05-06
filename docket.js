  var express = require('express');
  var docketController = require('./controllers/docket_controller');

  var app = express();

//Setting the view templates by templating engine
  app.engine('ejs', require('ejs').renderFile);
  app.set('view engine','ejs');

//Getting the static files
  app.use(express.static('./node-js-playlist/public/assets'));

//initilizing controllers
docketController(app);

//listen to the desired port

app.listen(4000);
console.log("listening to the port");
