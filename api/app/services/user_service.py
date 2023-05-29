from flask import jsonify, session
from models.user import User
from app import db
from bcrypt import hashpw, gensalt
from utils.email import send_password_reset_email
import uuid

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
		
		#Store the user in the session
		session['user'] = email			
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
	
	@staticmethod
	def get_user_by_email(email):
		return User.query.filter_by(email=email).first()
	
	@staticmethod
	def get_user_session(email):
		user = UserService.get_user_by_email(email)
		if user and session.get('user') == email:
			return user.serialize()
		return None
	
	@staticmethod
	def send_password_reset_email(user):
		# Generate token
		token = uuid.uuid4().hex
		# Set token in user
		user.password_reset_token = token
		db.session.commit()
		# Send email to user with password reset link
		email_sent = send_password_reset_email(user, token)
		if email_sent:
			return jsonify({'message': 'Email sent successfully.'}), 200
		else:
			return jsonify({'message': 'Email could not be sent.'}), 500
		
	@staticmethod
	def reset_password(token, email, password):
		user = UserService.get_user_by_email(email)
		if user and user.get_password_reset_token() == token:
			# Hash the password
			password = hashpw(password.encode('utf-8'), gensalt())
			# Set the new password
			user.password = password
			# Set the password reset token to None
			user.password_reset_token = None
			db.session.commit()
			return jsonify({'message': 'Password reset successfully.'}), 200
		else:
			return jsonify({'message': 'Invalid token.'}), 400

			
