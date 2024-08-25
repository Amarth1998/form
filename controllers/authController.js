import { comparePassword, hashpassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name) return res.status(400).send({ message: "Name is required" });
        if (!email) return res.status(400).send({ message: "Email is required" });
        if (!password) return res.status(400).send({ message: "Password is required" });
        if (!phone) return res.status(400).send({ message: "Phone is required" });
        if (!address) return res.status(400).send({ message: "Address is required" });

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: "Already registered. Please login.",
            });
        }

        // Hash the password
        const hashedPassword = await hashpassword(password);

        // Save the new user
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "Registration successful",
            user,
        });

    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        });
    }
};

// Login Controller
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid Email and Password",
                error: "Email and password are required",
            });
        }

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // Compare passwords
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid password",
            });
        }

        // Generate a JWT token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });

    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        });
    }
};


export const testController =(req,res)=>{
    res.send("protected controller");
    console.log("protected route")
}