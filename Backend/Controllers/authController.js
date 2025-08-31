const authSchema = require('../Models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        // Check if user already exists
        let user = await authSchema.findOne({ email });
        if(user){
            return res.status(400).json({ message: 'User already exists' });
        }   
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        user = new authSchema({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: user });

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try{
        // Check if user exists
        const user = await authSchema.findOne({ email });
        if(!user){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create and return JWT
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: user, message: 'Login successful' });

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
}
