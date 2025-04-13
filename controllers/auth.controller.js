import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRY } from '../config/env.js';

// req.body is the object, signup is a POST request so some data is passed in the body of the request

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    // start a transaction so that if anything goes wrong, the transaction will be aborted and no data will be saved to the database
   
    try {
        //Create a new user
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if(existingUser){
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        //Hash the password--> secure the password never store the password in plain text
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword,
        }], { session });// session is used to create a transaction so that i anything goes wrong, the transaction will be aborted and no data will be saved to the database
        
        const token = jwt.sign({ id: newUser[0]._id }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRY,
        });

        //Transaction is only saved if everything is successful
        await session.commitTransaction();

        await session.endSession();// end the session
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data:{token,
                user: newUser[0]} 
        });// send the response to the client
    }
    catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
    }


    export const signIn = async (req, res, next) => {
        try{
            const { email, password } = req.body;
            //Check if user exists
            const user = await User.findOne({ email });
            if(!user){
                const error = new Error('User not found');
                error.statusCode = 401;
                throw error;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                const error = new Error('Invalid password');
                error.statusCode = 401;
                throw error;
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: JWT_EXPIRY,
            });

            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data:{
                    token,
                    user
                }
            });

        }catch(error){
            next(error);
        }
    }

    export const signOut = async (req, res, next) => {}