import AuthService from "../services/auth_service.js";
import EmailService from "../services/email_service.js"
const UserController = {
  register: async (req, res) => {
    let user = await AuthService.register(req.body);
    await EmailService.send_welcome_email(user.email).catch(err => {
      console.log("sending email failed")
      console.log(err)
    })
    return res.status(201).json({ message: "success" });
  },
  login: async(req, res) => {

  },
  rateMovies: async(req, res) => {

  },
  seeHomeRecommendations: async(req, res) => {

  },
  seeWhyThisMovieIsRecommended: async(req, res) => {

  },
  rateRecommendation: async(req, res) => {

  }


  
};

export default UserController;