const {Router, request, response} = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator')
const router = Router();
const jwt = require('jsonwebtoken');

const fs = require('fs');

router.post('/wipemongobase'); //check auth

router.get('/getallusers', async (request, response) => {
    try {
        const resultArray = [];
        const usersDataFromMongo = await User.find();
        if (usersDataFromMongo) {
            usersDataFromMongo.map((element, index) => {
                resultArray.push(element.email);
            })
            response.status(201).json({data: resultArray, message: 'all ok!'})
            return resultArray;
        }
    } catch (e) {
        console.log('Error', e)
    }

}); //check auth

router.post(
    '/register',
    [
        check('email', 'incorrect email').isEmail(),
        check('password', 'incorrect password. Min length: 6').isLength({min: 6}),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({Errors: [errors], message: 'incorrect data coming on server side!'})
            }

            const {email, password} = request.body;

            console.log('request.body', request.body)

            const user = await User.findOne({email});
            if (user) {
                return response.status(400).json({message: 'User is already registred!'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const createUser = new User({email: email, password: hashedPassword});

            await createUser.save();

            // получаем данные по юзерам и записываем к себе на локал
            const usersDataFromMongo = await User.find();
            const jsonData = JSON.stringify(usersDataFromMongo);
            fs.writeFile('./UserDB/users.data.json', jsonData, function (err) {
                if (err) return console.error(err);
            })
            //

            response.status(201).json({message: `Created new user with email ${email}`})

        } catch (e) {
            response.status(500).json({message: 'smth wrong on server side!'})
        }
    });

router.post(
    '/login',
    [
        check('email', 'incorrect email').normalizeEmail().isEmail(),
        check('password', 'incorrect password. Min length: 6').exists(),
    ],
    async (request, response) => {
        try {
            const errors = validationResult(request);
            if (!errors.isEmpty()) {
                return response.status(400).json({Errors: [errors], message: 'incorrect DATA'})
            }

            const {email, password} = request.body;

            const user = await User.findOne({email});
            if (!user) {
                return response.status(400).json({message: 'User not found'});
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return response.status(400).json({message: 'incorrect input'})
            }

            const token = jwt.sign(
                {userID: user.id},
                config.get('jwtSecret'),
                // {expireIn: '1h'},
            );
            response.status(201).json({token, userID: user.id})

        } catch (e) {
            response.status(500).json({message: 'smth wrong with LOGIN!'})
        }
    });
module.exports = router;