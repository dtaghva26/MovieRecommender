from flask import Blueprint
from ..controllers import GenAIController
gen_ai_bp = Blueprint('gen_ai', __name__)

@gen_ai_bp.post('/recommend_movie')
def chat():
    return GenAIController.generate_recommendation()
