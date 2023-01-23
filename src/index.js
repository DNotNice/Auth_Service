const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const{PORT} = require('./config/serverConfig')
const apiroutes = require('./routes/index');
// const {User} = require('./models/index')
// const bcrypt = require('bcrypt')

const prepareAndStartServer = ()=>{

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  app.use('/api',apiroutes)

  app.listen(PORT ,async ()=>{
    console.log('Server started on port',PORT); 
    // const incomingpassowrd = '12345789'
    // const user = await User.findByPk(3);
    // const response = bcrypt.compareSync(incomingpassowrd , user.password);
    // console.log(response);
  })
}
prepareAndStartServer();
