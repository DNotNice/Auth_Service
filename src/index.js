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
    // const incomingpassowrd = '12345789'
    // const user = await User.findByPk(3);
    // const response = bcrypt.compareSync(incomingpassowrd , user.password);
    // console.log(response);
    // const service = new UserService();
    // const newToken = service.createToken({email : 'dewansh@gmail.com', id:1});
    // console.log('new token is ', newToken);
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRld2Fuc2hAZ21haWwuY29tIiwiaWQiOjEsImlhdCI6MTY3NDU1MTQxNSwiZXhwIjoxNjc0NTU1MDE1fQ.VKOdTfH15XPn0shwnvukp-3ZrIvsp0NZ5zcJez4ZBUE'

    // const respone = service.verifyToken(token);
    // console.log(respone);
    const u1 = await User.findByPk(7);
    const u2  = await Role.findByPk(1);
    // u1.addRole(u2); 
    const response = await u2.getUsers();
    console.log(response);
  })
}
prepareAndStartServer();
