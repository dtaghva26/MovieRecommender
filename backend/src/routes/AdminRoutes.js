import express from "express"
import  AdminController  from "../controllers/AdminController.js"
import auth from "../middlewares/auth.js"
const adminRouter = express.Router()
adminRouter.post("/register", AdminController.register)
adminRouter.post("/login", AdminController.login)
adminRouter.post("/reload_artifacts",auth,AdminController.reloadModelArtifacts)
adminRouter.post("/basic_recom_metrics",auth,AdminController.viewBasicRecommendationMetrics)
adminRouter.post("/track_version",auth,AdminController.trackModelVersion)
export default adminRouter;