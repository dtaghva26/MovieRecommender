import express from "express"
import  AdminController  from "../controllers/AdminController.js"
const adminRouter = express.Router()
adminRouter.post("/register", AdminController.register)
adminRouter.post("/login", AdminController.login)
adminRouter.post("/reload_artifacts", AdminController.reloadModelArtifacts)
adminRouter.post("/basic_recom_metrics", AdminController.viewBasicRecommendationMetrics)
adminRouter.post("/track_version", AdminController.trackModelVersion)
export default adminRouter;