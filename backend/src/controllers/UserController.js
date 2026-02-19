
import sendEmail  from "../config/email_config.js";
import User from "../models/User.js";

const UsereController = {
    register: async (req, res) => {
        let {username, email, password, age} = req.body
        if (await User.findOne({'username': username}))
        {
            return res.status(409).json({
                message: "username already exists"
            })
        }
        if (await User.findOne({'email': email}))
        {
            return res.status(409).json({
                message: "email already exists"
            })
        }
        let user = await User.create({
            'username': username,
            'email': email,
            'password': password, //TODO 
            'age': age
        })
        await sendEmail({
            to: user.email,
            subject: "welcome to our app!",
            text:"welcome to our movie rating app"
        })
        res.status(200).json({
            message: "success"
        })
    },
    login: (req, res) => {

    },
    rateMovies: (req, res) => {

    },
    seeHomeRecommendations : (req, res) => {

    },
    seeWhyThisMovieIsRecommended : (req, res) => {

    },
    rateRecommendation : (req, res) => {

    }

}

export default UsereController;