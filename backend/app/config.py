import os
from dotenv import load_dotenv
load_dotenv()
class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DEFAULT_DB_URL")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET")
    MAIL_SERVER = os.getenv("SMTP_HOST")
    MAIL_PORT = int(os.getenv("SMTP_PORT", 587))
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_USERNAME = os.getenv("SMTP_USER")
    MAIL_PASSWORD = os.getenv("SMTP_PASS")
    MAIL_DEFAULT_SENDER = os.getenv("EMAIL_FROM")
    