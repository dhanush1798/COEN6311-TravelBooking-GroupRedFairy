from flask import Blueprint, request, jsonify, session
from controllers.user_controller import UserController
from flask_cors import cross_origin

user_routes = Blueprint('user_routes', __name__, url_prefix='/api/user')
user_controller = UserController()

# User registration route: /api/user/register
@user_routes.route('/register', methods=['POST'])
@cross_origin()
def register():
	if request.method == 'POST' and request.is_json:
		return user_controller.register(request)
	return jsonify({'message': 'Invalid request'}), 400
	
# User login route: /api/user/login
@user_routes.route('/login', methods=['POST'])
@cross_origin()
def login():
	if request.method == 'POST' and request.is_json:
		return user_controller.login(request)
	return jsonify({'message': 'Invalid request'}), 400

# User account route: /api/user/account (protected)
@user_routes.route('/account', methods=['GET'])
@cross_origin()
def account():
	if request.method == 'GET':
		# Get current user email
		email = session.get('user')
		# Check if user exists with that email
		user = user_controller.get_user_by_email(email)
		if user is None:
			return jsonify({'message': 'Access denied. User not found.'}), 404
		return jsonify({'message': 'This is your user account page ' + email}), 200
	return jsonify({'message': 'Invalid request'}), 400

# User account route: /api/user/forgot-password
@user_routes.route('/forgot-password', methods=['POST'])
@cross_origin()
def forgot_password():
	if request.method == 'POST' and request.is_json:
		return user_controller.reset_password(request)
	return jsonify({'message': 'Invalid request'}), 400

# User account route: /api/user/reset-password
@user_routes.route('/reset-password', methods=['POST'])
@cross_origin()
def reset_password():
	if request.method == 'POST' and request.is_json:
		return user_controller.reset_pasword(request)
	return jsonify({'message': 'Invalid request'}), 400	

# User account route: /api/user/logout
@user_routes.route('/logout', methods=['GET'])
@cross_origin()
def logout():
	if request.method == 'GET':
		# Clear session
		session.clear()
		return jsonify({'message': 'You have been logged out'}), 200
	return jsonify({'message': 'Invalid request'}), 400