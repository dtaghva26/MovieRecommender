from app.services.mail_service import send_email
from flask import render_template
def send_welcome_email(to_email: str, username: str):
    subject = "Welcome to Movie Recommender 🎦"
    html_body = render_template("email/welcome.html", username=username)
    text_body = render_template("email/welcome.txt", username=username)
    send_email(to=to_email, subject=subject, body=text_body, html=html_body)
