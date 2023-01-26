const { response } = require('express');
const UserService = require('../services/user-service');
const userService = new UserService();
const create = async (req, res) =>{
    try {
        const respone =  await userService.create({
            email:req.body.email,
            password : req.body.password
        });
        return res.status(200).json({
            message :'successfully created a new user',
            success:true,
            data:respone,
            err:{}
           
        })
    } catch (error) {
            console.log(error);
        res.status(error.statusCode).json({
            message: error.message,
            success:false ,
            data:{},
            err:error.explanation
        })
    }
}
 const signIn = async(req , res) =>{
    try {
        const resp = await userService.signIn(req.body.email , req.body.password);
        return res.status(200).json({
            message :'successfully fetched a new user',
            success:true,
            data:resp,
            err:{}
           
        })
    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({
            message:error.message,
            success:false ,
            data:{},
            err:error.explanation
        })
    }
 }
 const isAuthenticated = async(req, res) =>{
try {
    const token = req.headers['x-access-token']; 
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
        success:true,
        err:{},
        data : response ,
        message :"user is authenticated & token is valid"
    })
} catch (error) {
    console.log(error);
    res.status(500).json({
        message:'something went wrong in the controller',
        success:false ,
        data:{},
        err:error
    })
}
 }
 const isAdmin = async (req, res) =>{
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            success:true,
            err:{},
            data : response ,
            message :"successfully fetched whether user is admin or not"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:'something went wrong in the controller',
            success:false ,
            data:{},
            err:{error}
        })
    }
 }
module.exports = {create, signIn , isAuthenticated , isAdmin     }