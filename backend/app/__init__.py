import os
from flask import Flask
from .routes.api import api_bp
from .config import Config
from .extensions import db
from .extensions import jwt
from .extensions import mail
def create_app():
    app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), "templates"))
    app.config.from_object(Config)
    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    app.register_blueprint(api_bp, url_prefix="/api/v1")
    return app



