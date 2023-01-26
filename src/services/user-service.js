const { response } = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {JWT_KEY} = require('../config/serverConfig')
const UserRepository  = require('../repository/user-repository');
const AppErrors = require('../utils/error-handler');

    class UserService {
        constructor(){
            this.UserRepository = new UserRepository();
        }
        async create(data){
            try {
                const user = await this.UserRepository.create(data);
                return user;
            } catch (error) {
                if(error.name = 'ValidationError') throw error;
                console.log('something went wrong in the service layer');
                 throw error;
            }
        }
        async signIn(email , plainPassword){
                try {
                    // step 1 - >fetch user using the email
                    const user = await this.UserRepository.getByEmail(email);
                    //step 2 -> compare passowords
                    const passwordMatch = this.checkPassword(plainPassword , user.password)
                    if(!passwordMatch) {
                        console.log('password does not match');
                        throw {error:"incorrect password"};

                    }
                    //step 3-> if passwords match , create a token and sent it to user
                    const Newjwt = this.createToken({email : user.email , id:user.id});
                    return Newjwt ;
                    
                } catch (error) {
                    if(error.name == 'AttributeNotFound'){
                        throw error;
                    }
                    console.log('something went wrong in the sign in process');
                    throw error;
                }
        }
         createToken(user)  {
          try {
            const result = jwt.sign(user , JWT_KEY,{expiresIn : '4d'});
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
        async isAuthenticated(token){
            try {      
            const isVerified = this.verifyToken(token);
            if(!isVerified){
            throw {error : 'invalid token'}
            }
            const user = this.UserRepository.getById(isVerified.id);
            if(!user) throw {error : 'no user exists with this token'}
            return user.id;     
            } catch (error) {    
                console.log('something went wrong in authentication');
                throw error;
            }
        }
        async isAdmin(userId){
            try {
                return this.UserRepository.isAdmin(userId);
            } catch (error) {
                console.log('error in admin detection');
                throw {error};
            }
        }
    }

    module.exports = UserService;