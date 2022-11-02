const express= require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const { json } = require('body-parser');
const bcrypt = require('bcryptjs');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true,
    }
  });

  // TEST DB CONNECTED OR NOT
/*  db.select('*').from('users').then(data => {
    console.log(data);
})  */

const app= express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req , res) => {res.send('its working')})

app.post('/signin',(req, res)=> {signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register',(req, res)=> {register.handleRegister(req,res,db,bcrypt)})

app.post('/profile/:id', (req, res)=> {profile.handleProfileGet(req, res, db)})

app.put('/image', (req,res)=> {image.handleImageCount(req, res, db)})

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`hey im running in ${process.env.PORT}`);
})