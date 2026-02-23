from flask import Blueprint
from ..controllers import MovieController
movie_bp = Blueprint('movie', __name__)

@movie_bp.get("/")
def get_movie():
    return MovieController.getMovies()
@movie_bp.get("/:id")
def get_movie_id():
    return MovieController.getMovieByID()
@movie_bp.get("/:searchQuery")
def search_movie_on_query():
    return MovieController.searchMovieByQuery()
@movie_bp.get(":suggest?q=int")
def auto_complete():
    return MovieController.autoCompleteQuery()
