const { JWT_KEY } = require('../config/server-config');
const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppError = require('../utils/error_handler');


class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            if(error.name == 'SequelizeValidationError'){
                throw error
            }
            throw error;
        }
    }

    async getUser(id){
        try {
            const user = await this.userRepository.getUser(id);
            return user;
            
        } catch (error) {
            console.log("something went wrong in services");
            throw error;
            
        }
    }
    createToken(user){
        try {
            const token =  jwt.sign(user, JWT_KEY, {expiresIn : '1d'}) ;
            return token;
            
        } catch (error) {
            console.log("something went wrong in services");
            throw error;
            
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

     cheakPaasword(plainPassword, encryptedPassword){
        try {

            return bcrypt.compareSync(plainPassword , encryptedPassword);
            
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
            
        }
    }

    async signIn(email , password){
        try {
           const user = await this.userRepository.getBymail(email);

           const passwordMatch =  bcrypt.compareSync(password, user.password);

           if(!passwordMatch){
            console.log("Password doesn't match");
            throw {error: 'Incorrect password'};
           }
           const newJWT = this.createToken({email: user.email, id: user.id});
           return newJWT;


            
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
            
        }
    }

    async isAuthenticated(token) {
        try {
            const response = this.verifyToken(token);
            if(!response) {
                throw {error: 'Invalid token'}
            }
            const user = this.userRepository.getById(response.id);
            if(!user) {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the auth process");
            throw error
        }
    }
        
    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error;
        }
    }


}

module.exports = UserService;