import bcrypt from "bcrypt";
const PasswordService = {
    hashPassword: async function (password){
        if(typeof(password) != 'string' || password.length == 0){
            throw Error("password format not match")
        }
        const hashed_password = await bcrypt.hash(password, 12)
        return hashed_password
    },
    areIdenticalPassword: async function(hashed_password, entered_password){
        return bcrypt.compare(entered_password, hashed_password)
    }
}
export default PasswordService