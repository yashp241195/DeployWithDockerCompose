var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var morgan = require('morgan')
var cors = require('cors')


var mongoDB = 'mongodb://mongo:27017/userdb';
var User = require('./models/user')


app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

mongoose.connect(mongoDB, 
  {useNewUrlParser: true, useUnifiedTopology: true})
.then((connect) => {

  console.log('connected to mongodb.. ')

})
.catch(e => console.log('could not connect to mongodb', e))

// var schema


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {

  const user = await User.find({})
  // console.log(JSON.stringify(user[0].firstname,null,2))
  res.render('pages/index',{firstname:user[0].firstname});
});


// send the data to the server via post request

app.post('/update/user', async (req,res)=>{

  const {firstname} = req.body


  const val = await User.updateOne({}, { $set:{firstname:firstname}})
  res.json({ 
    message:" firstname successfully updated as "+firstname,
    // er: val
  })
})

app.listen(5000);
console.log('Server is listening on port 5000');
