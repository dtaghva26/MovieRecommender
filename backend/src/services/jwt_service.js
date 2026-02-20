import jwt from "jsonwebtoken"
const JWT_SERVICE = {
    sign_and_return_jwt: async function(user){
        const user_payload = {
            email: user.email,
            username: user.username
        }
        const token = await jwt.sign(user_payload, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "3h",
        })
        return ({
            token: token
        })
    }
}
export default JWT_SERVICE;