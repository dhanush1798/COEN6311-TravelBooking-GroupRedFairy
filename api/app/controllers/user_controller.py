from flask import jsonify
from app.services.user_service import UserService
from app.utils.sanitize import sanitize_input

class UserController:
	def __init__(self):
		self.user_service = UserService()
				
	def register(self, request):
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
		
		# Check if the user already exists
		if self.user_service.get_user_by_email(email):
			return jsonify({'message': 'User already exists'}), 400
		
		# Create the user
		user = self.user_service.create_user(email, password, first_name, last_name, city, state, country)
		# Return the user
		return jsonify(user), 201		
