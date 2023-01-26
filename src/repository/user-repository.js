const { StatusCodes } = require('http-status-codes');
const{User , Role} = require('../models/index');
const clientError = require('../utils/client-error');
const validationError = require('../utils/validation-error');

class UserRepo {
   async create(data){
    try {
        const user = await User.create(data);
        return user ;
    } catch (error) {
        if(error.name = 'SequelizeValidationError') {
            throw new validationError(error);  
        }
        console.log('something went wrong on repo layer');
        throw error;
    }
   }
   async destory(UserId){
    try {
        await User.destory({
            where :{
                id:UserId
            }
        });
        return true ;
    } catch (error) {
        console.log('something went wrong on repo layer');
        throw error;
    }
   }
   async getById(userId){
    try {
        const user = await User.findByPk(userId , {
            attributes : ['email' , 'id']   
        });
        return user ;
    } catch (error) {
        console.log('something went wrong on repo layer');
        throw error;
    }
   }
   async getByEmail(userEmail){
    try {
        const result = await User.findOne({
            where : {
                email : userEmail
            }
        });
        if(!result){
            throw new clientError(
                'AttributeNotFound',
                'Invalid email sent in the request',
                'Please check the email , as there is no record of the email',
                StatusCodes.NOT_FOUND
            )
        }
        return result;
    } catch (error) {
        console.log('something went wrong on repo layer');
        throw error;
    }
   }
   async isAdmin(userId){
    try {
      const user = await User.findByPk(userId);
      const adminRole = await Role.findOne({
        where :{
            name : 'ADMIN'
        }
      });
      return user.hasRole(adminRole);
    } catch (error) {
        console.log('something went wrong on repo layer');
        throw {error};
    }
   }
}
module.exports= UserRepo