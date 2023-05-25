from flask import jsonify
from app.models.user import User
from app import db

class UserService:
	@staticmethod
	def get_user_by_email(email):
		return User.query.filter_by(email=email).first()
	
	@staticmethod
	def create_user(email, password, first_name, last_name, city, state, country):
		user = User(email=email, password=password, first_name=first_name, last_name=last_name, city=city, state=state, country=country)
		db.session.add(user)
		db.session.commit()
		return user.serialize()