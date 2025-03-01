from market import app, db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)


class Brand(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    title = db.Column(db.String(), nullable = False)



with app.app_context():
    db.create_all()