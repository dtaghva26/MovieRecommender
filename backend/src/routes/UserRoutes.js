import express from "express"
import  UsereController from "../controllers/UserController.js"
const userRouter = express.Router()
userRouter.post("/register", UsereController.register)
userRouter.post("/login", UsereController.login)
userRouter.post("rate_movie", UsereController.rateMovies)
userRouter.post("/home_recommendation", UsereController.seeHomeRecommendations)
userRouter.post("/check_recommendation_reason", UsereController.seeWhyThisMovieIsRecommended)
userRouter.post("/rate_recommendation", UsereController.rateRecommendation)
export default userRouter;