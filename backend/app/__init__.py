from flask import Flask
from .routes.api import api_bp
from .config import Config
from .extensions import db
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    app.register_blueprint(api_bp, url_prefix="/api/v1")
    print('hello world')
    print(db)
    return app



