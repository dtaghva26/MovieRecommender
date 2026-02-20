import User from "../models/User.js";
import AppError from "../config/AppError.js";
import  PasswordService from "./password_service.js";


const AuthService = {
  async register({ username, email, password, age }) {
    if (!username || !email || !password) {
      throw new AppError("Missing required fields", 400, "VALIDATION_ERROR");
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    
    const [usernameTaken, emailTaken] = await Promise.all([
      User.findOne({ username }),
      User.findOne({ email: normalizedEmail }),
    ]);

    if (usernameTaken) throw new AppError("Username already exists", 409, "USERNAME_EXISTS");
    if (emailTaken) throw new AppError("Email already exists", 409, "EMAIL_EXISTS");

    const passwordHash = await PasswordService.hashPassword(password);

    const user = await User.create({
      username: username,
      email: normalizedEmail,
      password: passwordHash,
      age: age,
    });
    
return { id: user._id.toString(), email: user.email, username: user.username };
  },
  async login({username, password}){
    if(!username || !password){
      throw new AppError("Missing required fields", 400, "VALIDATION_ERROR");
    }
    const user = await User.findOne({username: username})
    if(!user){
      throw new AppError("Username doesn't exist, please register", 400, "VALIDATION_ERROR")
    }
    if(await PasswordService.areIdenticalPassword(user.password, password))
    {
      return user; 
    }
    throw new AppError("Wrong Password", 409, "WRONG_PASSWORD")
  }
};
export default AuthService;