import AppError from "../config/AppError.js" //TODO
import PasswordService from "./password_service.js" //TODO
import { query } from "../config/db_config.js" //TODO

const AuthService = { //TODO
  async register({ username, email, password, age }) { //TODO
    if (!username || !email || !password) { //TODO
      throw new AppError("Missing required fields", 400, "VALIDATION_ERROR") //TODO
    } //TODO

    const normalizedEmail = String(email).trim().toLowerCase() //TODO

    const existingUsers = await query( //TODO
      "SELECT username, email FROM users WHERE username = $1 OR email = $2", //TODO
      [username, normalizedEmail] //TODO
    ) //TODO

    const usernameTaken = existingUsers.rows.find((row) => row.username === username) //TODO
    const emailTaken = existingUsers.rows.find((row) => row.email === normalizedEmail) //TODO

    if (usernameTaken) throw new AppError("Username already exists", 409, "USERNAME_EXISTS") //TODO
    if (emailTaken) throw new AppError("Email already exists", 409, "EMAIL_EXISTS") //TODO

    const passwordHash = await PasswordService.hashPassword(password) //TODO

    const createdUser = await query( //TODO
      "INSERT INTO users (username, email, password, age) VALUES ($1, $2, $3, $4) RETURNING id, username, email", //TODO
      [username, normalizedEmail, passwordHash, age ?? 18] //TODO
    ) //TODO

    return createdUser.rows[0] //TODO
  }, //TODO
  async login({ username, password }) { //TODO
    if (!username || !password) { //TODO
      throw new AppError("Missing required fields", 400, "VALIDATION_ERROR") //TODO
    } //TODO
    const userResult = await query( //TODO
      "SELECT id, username, email, password FROM users WHERE username = $1 LIMIT 1", //TODO
      [username] //TODO
    ) //TODO
    const user = userResult.rows[0] //TODO
    if (!user) { //TODO
      throw new AppError("Username doesn't exist, please register", 400, "VALIDATION_ERROR") //TODO
    } //TODO
    if (await PasswordService.areIdenticalPassword(user.password, password)) { //TODO
      return user //TODO
    } //TODO
    throw new AppError("Wrong Password", 409, "WRONG_PASSWORD") //TODO
  }, //TODO
} //TODO
export default AuthService //TODO
