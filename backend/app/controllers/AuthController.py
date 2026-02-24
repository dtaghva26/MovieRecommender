from flask import request, jsonify
from app.models import User
from flask_jwt_extended import create_access_token
from flask_jwt_extended import verify_jwt_in_request
from app.utils.Message import Message
from sqlalchemy import or_
from app.services.mail_service import send_welcome_email
import traceback
class AuthController():
    @staticmethod
    def register():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        age = data.get('age') 
        existingUser = User.query.filter(or_(User.username == username, User.email == email)).first()
        if existingUser:
            return Message.error('User already exists', 409)
        user = User.create(username, email, password, age)
        try: 
            send_welcome_email(email, username)
        except Exception as e:
            print('welcome email failed')
        return Message.success('User created',data=user.to_dict(), status_code=201)
        # TODO send verification email
            
    @staticmethod
    def login():
        # TODO add refresh token
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        if not username or not password:
            return Message.error('Username and password are required', 400)
        user = User.query.filter_by(username=username).first()
        if not user or not User.check_password(user, password):
            return Message.error('Invalid credentials', 401)
        else:
            access_token = create_access_token(user.id)
            return Message.success(
            "Login successful",
            data={"access_token": access_token, "user_id": user.id},
            status_code=200
        )


    @staticmethod
    def logout():
        # TODO remove refresh token
        return Message.success("logout successful")
        
    @staticmethod
    def resetPassword():
        pass  
    @staticmethod
    def confirmPasswordReset():
        pass
        