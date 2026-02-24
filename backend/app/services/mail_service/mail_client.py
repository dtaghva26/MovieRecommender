from flask_mail import Message
from app.extensions import mail

def send_email(to: str, subject: str, body: str, html: str | None = None):
    msg = Message(
        subject=subject,
        recipients=[to],
        body=body  # plain-text fallback
    )

    if html:
        msg.html = html  # HTML version

    print("mail created")
    mail.send(msg)
    print("mail sent")