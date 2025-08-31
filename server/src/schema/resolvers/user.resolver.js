import User from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET_KEY = process.env.JWT_SECRET; // store in env file

const UserResolver = {

    Query: {},

    Mutation: {
        login: async (_, { email, password }, context) => {
            if (!email || !password) {
                throw new Error("Email and password are required");
            }

            const isUserExist = await User.findOne({ email: email });
            if (!isUserExist) {
                throw new Error("User Not Signed In");
            }

            const isMatchPassword = await bcrypt.compare(password, isUserExist.password);
            if (!isMatchPassword) {
                throw new Error("Invalid Password");
            }

            const token = jwt.sign({
                _id: isUserExist._id,
                email: email,
            }, SECRET_KEY);

            return {
                token: token,
                user: isUserExist
            }

        },

        signUp: async (_, { name, email, password, confirmPassword }, context) => {
            if (!email || !password || !confirmPassword) {
                throw new Error("Email and password are required");
            }

            if (password !== confirmPassword) {
                throw new Error("Password and confirm password are not match");
            }

            const hashPassword = await bcrypt.hash(password, 10)

            const isUserExist = await User.findOne({ email })
            if (isUserExist) {
                throw new Error("User Already Exist");
            }

            const newUser = await User.create({
                email,
                password: hashPassword,
                name
            })

            await newUser.save();

            const token = jwt.sign({
                _id: newUser._id,
                email: email,
            }, SECRET_KEY);

            return {
                token: token,
                user: newUser
            }
        },

        logOut: async (_, { email }, context) => {
            // Future Scopre
            // Currently Planning to clear the user data from "localstorage"
            if (email){
                return true
            }
            return false  
        }
    }
}

export default UserResolver;