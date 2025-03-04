import { User } from '../database/database.js';

import { createSecretToken } from './generateToken.js';
import bcrypt from 'bcrypt';


export const login = async (req, res) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).json({ message: "All input is required" });
    }
    const user = await User.findOne({ username });
    if (!(user && (await bcrypt.compare(password, user.password)))) {
      return res.status(404).json({ message: "Invalid credentials" });
    }
    
    const token = createSecretToken(user._id.toHexString());
    res.cookie("token", token, {
      domain: process.env.frontend_url, // Set your domain here
      path: "/", // Cookie is accessible from all paths
      expires: new Date(Date.now() + 86400000), // Cookie expires in 1 day
      secure: true, // Cookie will only be sent over HTTPS
      httpOnly: true, // Cookie cannot be accessed via client-side scripts
      sameSite: "None",
    });
  
    res.json({ token });
};