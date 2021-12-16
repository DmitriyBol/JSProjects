const {Router, request} = require('express');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator')
const router = Router();
const jwt = require('jsonwebtoken');

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
                return response.status(400).json({Errors: [errors], message: 'incorrect DATA'})
            }

            const {email, password} = request.body
            const NewUser = await User.findOne({email}).then((res) => {
                return res.status(400).json({message: 'User is already registred!'})
            });
            const hashedPassword = await bcrypt.hash(password, 12);
            const createUser = new User({email: email, password: hashedPassword});
            await createUser.save();
            response.status(201).json({message: `Created new user with email ${email}`})

        } catch (e) {
            response.status(500).json({message: 'smth wrong!'})
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
            const user = await User.findOne({email}).then((res) => {
                return res.status(400).json({message: 'User not found'});
            })

            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                return response.status(400).json({message: 'incorrect input'})
            }

            const token = jwt.sign(
                { userID: user.id },
                config.get('jwtSecret'),
                {expireIn: '1h'},
            )

            response.status(200).json({token, userID: user.id})

        } catch (e) {
            response.status(500).json({message: 'smth wrong with LOGIN!'})
        }
    });
module.exports = router;