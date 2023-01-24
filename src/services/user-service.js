const { response } = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {JWT_KEY} = require('../config/serverConfig')
const UserRepository  = require('../repository/user-repository');

    class UserService {
        constructor(){
            this.UserRepository = new UserRepository();
        }
        async create(data){
            try {
                const user = await this.UserRepository.create(data);
                return user;
            } catch (error) {
                console.log('something went wrong in the service layer');
                 throw error;
            }
        }
         createToken(user)  {
          try {
            const result = jwt.sign(user , JWT_KEY,{expiresIn : '1d'});
            return result 
          } catch (error) {
            console.log('something went wrong in token creation');
            throw error; 
        }
        }
        verifyToken(token){
            try {
                const response = jwt.verify(token , JWT_KEY);
                return response;
            } catch (error) {
                console.log('something went wrong in token validation' ,error);
                throw error;
            }
        }
        checkPassword(userInputPassowrd , encryptedPassword){
            try {
                return bcrypt.compareSync(userInputPassowrd , encryptedPassword);
            } catch (error) {
                console.log('something went wrong in password comparison');
                throw error;
            }
        }
    }

    module.exports = UserService;