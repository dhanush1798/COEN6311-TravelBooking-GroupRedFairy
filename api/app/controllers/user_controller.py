from flask import jsonify
from app.services.user_service import UserService
from app.utils.sanitize import sanitize_input
from bcrypt import hashpw, gensalt

class UserController:
	def __init__(self):
		self.user_service = UserService()

	def register(self, request):
		try:
			data = request.get_json()
			email = data.get('email')
			password = data.get('password')
			first_name = data.get('first_name')
			last_name = data.get('last_name')
			city = data.get('city')
			state = data.get('state')
			country = data.get('country')

			# Sanitize and escape the data if data exists
			email = sanitize_input(email)
			password = sanitize_input(password)
			first_name = sanitize_input(first_name)
			last_name = sanitize_input(last_name)
			city = sanitize_input(city)
			state = sanitize_input(state)
			country = sanitize_input(country)
			
			# Validate the data
			if not email or not password or not first_name or not last_name:
				return jsonify({'message': 'All fields are required'}), 400
			
			# Hash the password
			password = hashpw(password.encode('utf-8'), gensalt())
			
			# Check if the user already exists
			if self.user_service.get_user_by_email(email):
				return jsonify({'message': 'User already exists'}), 400
			
			# Create the user
			user = self.user_service.create_user(email, password, first_name, last_name, city, state, country)
			# Return the user
			return jsonify(user), 201
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def login(self, request):
		try:
			data = request.get_json()
			email = data.get('email')
			password = data.get('password')

			# Sanitize and escape the data if data exists
			email = sanitize_input(email)
			password = sanitize_input(password)

			return UserService.login(email, password)
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def get_user_by_email(self, email):
		try:
			user = self.user_service.get_user_by_email(email)
			return user
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def reset_password(self, request):
		try:
			data = request.get_json()
			email = data.get('email')
			dob = data.get('dob')
			
			# Sanitize and escape the data if data exists
			email = sanitize_input(email)
			dob = sanitize_input(dob)
			
			# Validate the data
			if not email:
				return jsonify({'message': 'Email is required'}), 400
			
			# Check if the user exists
			user = self.user_service.get_user_by_email(email)
			if user is None:
				return jsonify({'message': 'User not found'}), 404
			# Check if the dob matches
			if user.get_dob() != dob:
				return jsonify({'message': 'Invalid date of birth'}), 400
			
			# Send the email
			self.user_service.send_password_reset_email(user)
			return jsonify({'message': 'Password reset email sent'}), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def reset_pasword(self, request):
		try:
			data = request.get_json()
			token = data.get('token')
			email = data.get('email')
			password = data.get('password')
			# Sanitize and escape the data if data exists
			token = sanitize_input(token)
			email = sanitize_input(email)
			password = sanitize_input(password)
			# Validate the data
			if not token:
				return jsonify({'message': 'The password reset link is invalid.'}), 400
			if not email:
				return jsonify({'message': 'Email is required.'}), 400
			if not password:
				return jsonify({'message': 'Password is required.'}), 400
			return self.user_service.reset_password(token, email, password)
		except Exception as e:
			return jsonify({'message': str(e)}), 400



