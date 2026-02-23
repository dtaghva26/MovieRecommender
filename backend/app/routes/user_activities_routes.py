from flask import Blueprint
from ..controllers import UserActivityController
user_activity_bp = Blueprint('user_activity', __name__)

@user_activity_bp.post('/watched')
def add_watched_movie():
    return UserActivityController.addWatched()
@user_activity_bp.delete('/watched')
def delete_watched_movie():
    return UserActivityController.removeWatched()
@user_activity_bp.post('/watchlist')
def create_watch_list():
    return UserActivityController.createWatchList()
@user_activity_bp.post('/watchlist:id')
def add_movie_to_watch_list():
    return UserActivityController.addMovieToWatchList()
@user_activity_bp.put('/rating/:id')
def rate_movie():
    return UserActivityController.rateMovie()
@user_activity_bp.delete('/ratings/:id')
def remove_rating():
    return UserActivityController.removeRating()
@user_activity_bp.post('/feedback/:id')
def give_feedback():
    return UserActivityController.sendMovieFeedback()
@user_activity_bp.delete('/suppress/:id')
def suppress_movie():
    return UserActivityController.suppressMovie()
