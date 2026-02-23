from flask import Blueprint
from ..controllers.AuthController import AuthController
auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.post("/register")
def register():
    return AuthController.register()
@auth_bp.route("/login")
def login():
    return AuthController.login()
@auth_bp.route("/logout")
def logout():
    return AuthController.logout()
@auth_bp.route("/password-reset/request")
def reset_password():
    return AuthController.resetPassword()
@auth_bp.route("/password_reset/confirm")
def confirmPasswordReset():
    return AuthController.confirmPasswordReset()

