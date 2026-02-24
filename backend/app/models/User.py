from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    
    @staticmethod
    def create(username, email, password, age):
        user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password),
            age=age
        )
        db.session.add(user)
        db.session.commit()
        return user
    @staticmethod
    def check_password(user, password: str) -> bool:
        return check_password_hash(user.password_hash, password)    
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "age": self.age
        }
    




