from flask import request, jsonify
from app.models import User
class AuthController():
    @staticmethod
    def register():
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        age = data.get('age') 
        user = User.create(username, email, password)
        return {'message': 'user created'}        
    @staticmethod
    def login():
        pass
    @staticmethod
    def logout():
        pass
    @staticmethod
    def resetPassword():
        pass  
    @staticmethod
    def confirmPasswordReset():
        pass
        