import express from "express"
import  UsereController from "../controllers/UserController.js"
import auth from "../middlewares/auth.js"
const userRouter = express.Router()
userRouter.post("/register", UsereController.register)
userRouter.post("/login", UsereController.login)
userRouter.post("rate_movie", auth,UsereController.rateMovies)
userRouter.post("/home_recommendation", auth ,UsereController.seeHomeRecommendations)
userRouter.post("/check_recommendation_reason", auth, UsereController.seeWhyThisMovieIsRecommended)
userRouter.post("/rate_recommendation", auth , UsereController.rateRecommendation)
export default userRouter;