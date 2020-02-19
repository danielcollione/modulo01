const express = require('express');
const server = express();
server.use(express.json());

//CRUD - Create, Read, Update, Delete

const users = ['Diego', 'Claudio', 'Victor'];

server.use((req, res, next) => {
   console.time('Request');
   console.log(`Método: ${req.method}; URL: ${req.url}`);
   next();
   console.timeEnd('Request');
}); //Midlewere Global

function checkUserExists(req, res, next){
   if(!req.body.name){
      return res.status(400).json({ error: 'User name is required'});
   }
   return next();
} //Midlewere Local

function checkUserInArray (req, res, next) {
   if(!users[req.params.index]){
      return res.status(400).json({ error: 'User does not exists'}); 
   }

   return next();
} //Midlewere Local

server.get('/users', (req, res) => {
   return res.json(users);
})

server.get('/users/:index', checkUserInArray , (req, res) => {
   const { index } = req.params;
   return res.json(users[index]);
})

server.post('/users', checkUserExists, checkUserInArray ,(req, res) => {
   const { name } = req.body;
   users.push(name);
   
   return res.json(users);
});

server.put('/users/:index', checkUserExists, checkUserInArray ,(req, res) =>{
   const { index } = req.params;
   const { name } = req.body;

   users[index] = name;

   return res.json(users);
});

server.delete('/users/:index', (req, res) => {

   const { index } = req.params;
   users.splice(index, 1);
   return res.send();

});

server.listen(3000);