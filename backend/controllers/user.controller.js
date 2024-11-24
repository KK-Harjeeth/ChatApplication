import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
export const signUp = async (req, res) => {
  try {
    // console.log(req.json())
    const { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newUser = await new User({ name, email, password: hashedPassword });
    await newUser.save();
    if (newUser) {
      const token = createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User registered successfully!",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
        token:token
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token:token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsersProfiles = async(req,res)=>{
    const loggedInUser = req.user._id;
    try {
        // removing the current logged-in user from all users
        const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select('-password')
        res.status(201).json({filteredUsers})
    }catch (error) {
        console.log("Error in fetching all Users profiles"+error);
        res.status(500).json({message:"Server error"})
    }
}
