import User from '../models/User.js';
import { generateToken } from '../utils/getToken.js';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

export const profile = expressAsyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Update password securely
        if (req.body.password) {
            const isSamePassword = await bcrypt.compare(req.body.password, user.password);
            if (!isSamePassword) {
                user.password = await bcrypt.hash(req.body.password, 10);
            }
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser),
        });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
 


