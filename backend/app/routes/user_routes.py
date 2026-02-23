from flask import Blueprint
from ..controllers import UserController
user_bp = Blueprint('user', __name__)

@user_bp.get("/")
def profile():
    return UserController.profile()

@user_bp.patch("/")
def updateProfile():
    return UserController.updateProfile()

@user_bp.get("/prefrence")
def getUserPrefrences():
    return UserController.getUserPrefrences()

@user_bp.put("/prefrence")
def updateUserPrefrences():
    return UserController.updateUserPrefrences()
