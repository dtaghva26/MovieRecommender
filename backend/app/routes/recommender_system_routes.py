from flask import Blueprint
from ..controllers import UserRecommenderSystemController
user_recommender_bp = Blueprint('user_recommender_bp', __name__)
'''
Surface Examples:
surface=because_watched&movie_id=12
surface=genre&genre=Sci-Fi
surface=watchlist_similar
surface=hidden_gems
surface=trending_for_you
'''
@user_recommender_bp.get('/recommendations?surface=home')
def get_homepage_recommendation():
    return UserRecommenderSystemController.getHomePageRecommendation()
@user_recommender_bp.get('/recommendations?surface=home&refresh_token=abcd')
def refresh_recommendation():
    return UserRecommenderSystemController.refreshRecommendation()
@user_recommender_bp.put('/reco-control/disable-seed')
def disable_reco_seed():
    return UserRecommenderSystemController.disableSeed()