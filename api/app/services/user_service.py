from flask import jsonify
from app.models.user import User
from app import db
from bcrypt import hashpw, gensalt

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
	
	@staticmethod
	def login(email, password):
		# Validate the data and check if the user exists
		if not email or not password or not UserService.get_user_by_email(email):
			return jsonify({'message': 'Invalid email or password'}), 400
		
		# Check if the password matches
		if not UserService.check_password(email, password):
			return jsonify({'message': 'Invalid email or password'}), 400
					
		# Return the user
		return jsonify(UserService.get_user_by_email(email).serialize()), 200
	
	# Check password
	@staticmethod
	def check_password(email, password):
		# Get the user by email
		user = UserService.get_user_by_email(email)
		# Check if the password matches
		if user and hashpw(password.encode('utf-8'), user.password.encode('utf-8')) == user.password.encode('utf-8'):
			return True
		return False