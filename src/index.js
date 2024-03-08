
const express  = require('express');
const app = express();
const apiroutes =  require('./routes/index')
const {User ,Role} = require('./models/index')
const {sequelize} = require('sequelize')
const bodyParser = require('body-parser');

const { PORT , DB_SYNC} = require('./config/server-config');
const userService = require('../src/services/user-service');
///const { verify } = require('jsonwebtoken');


const setupserver = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.use('/api', apiroutes);
    //const service = new userService();
   // console.log(service.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5tcHJpbWVAZ292LmluIiwiaWQiOjMsImlhdCI6MTcwOTY0MzE3NSwiZXhwIjoxNzA5NzI5NTc1fQ.go6j651YUXn5Sj0jKN_7bUXiyeOCOIldMPjg7GUvk1k'));

    app.listen( PORT ,async ()=>{
        console.log(`server starting on ${PORT}`)
       

        // const user = await User.findByPk(3);
        // const role = await Role.findOne({
        //     where : {
        //         name :'ADMIN'
        //     }
        
        // })
        // await user.addRole(role) ;
  }
    )
}
setupserver();