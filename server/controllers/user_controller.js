const User = require('../models/user_model');
const Password = require('../helper/password');
const jwt = require('../helper/token');
const sendMail = require('../helper/mailer');

async function signupPostController(req, res) {
    try {

        const { name, email, password, college, year } = req.body;

        if (!name || !email || !password || !college || !year) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        }

        const hashedPassword = await Password.hashPassword(password);

        if (!hashedPassword) {
            return res.status(400).json({
                message: 'Password hashing failed.'
            });
        }


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            college,
            year
        });

        if (!user) {
            return res.status(400).json({
                message: 'User creation failed.'
            });
        }

        const msg = `<p>Hii ${name}, please <a href="${process.env.LOCAL_HOST}/email/verify/?_id=${userCreated._id}">Verify</a> your Email.</p>`;
        sendMail(email, "Email Verification", msg); 

        const payload = {
            name,
            email,
            college,
            year,
            role: user.role,
            subscribed: user.subscribed,
            isVerified: user.isVerified,
        };

        const token = jwt.generateToken(payload);

        if (!token) {
            return res.status(500).json({
                message: 'Token generation failed.'
            });
        }

        res.cookie('token', token);

        res.status(201).json({
            message: 'User created successfully.',
            id: user._id,
            name: user.name,
            email: user.email,
            college: user.college,
            year: user.year,
            role: user.role,
            subscribed: user.subscribed,
            isVerified: user.isVerified,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error: ' + error.message
        });
    }
}

async function signinPostController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const isPasswordValid = await Password.comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        const payload = {
            name: user.name,
            email: user.email,
            college: user.college,
            year: user.year,
            role: user.role,
            subscribed: user.subscribed,
            isVerified: user.isVerified,
        };

        const token = jwt.generateToken(payload);

        if (!token) {
            return res.status(500).json({
                message: 'Token generation failed.'
            });
        }

        res.cookie('token', token);

        res.status(200).json({
            message: 'User signed in successfully.',
            id: user._id,
            name: user.name,
            email: user.email,
            college: user.college,
            year: user.year,
            role: user.role,
            subscribed: user.subscribed,
            isVerified: user.isVerified,
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error: ' + error.message
        });
    }
}

module.exports = {
    signupPostController,
    signinPostController,
};