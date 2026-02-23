from flask import Blueprint
# from auth_routes import auth_bp
# from user_routes import user_bp
# from movie_routes import movie_bp
# from user_activities_routes import user_activity_bp
# from recommender_system_routes import user_recommender_bp
# from generative_ai_routes import gen_ai_bp

# from .auth_routes import auth_bp        # if api_routes.py and auth_routes.py are in same package folder
# or
from ..routes.auth_routes import auth_bp # depending on structure
api_bp = Blueprint('api', __name__)
api_bp.register_blueprint(auth_bp, url_prefix="/auth")
# api_bp.register_blueprint(user_bp, url_prefix="/me")
# api_bp.register_blueprint(movie_bp, url_prefix="/movie")
# api_bp.register_blueprint(user_activity_bp, url_prefix="/me")
# api_bp.register_blueprint(user_recommender_bp, url_prefix="/me")
# api_bp.register_blueprint(gen_ai_bp, url_prefix='/ai')