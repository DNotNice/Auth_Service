const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const{PORT} = require('./config/serverConfig')
const apiroutes = require('./routes/index');
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt')
const {User ,Role} = require('./models/index');
const db = require('./models/index')
const UserService = require('./services/user-service');
const prepareAndStartServer = ()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  app.use('/api',apiroutes)

  app.listen(PORT ,async ()=>{
    console.log('Server started on port',PORT);
    if(process.env.DB_SYNC){
        db.sequelize.sync({alter:true})
    }
    
  })
}
prepareAndStartServer();
