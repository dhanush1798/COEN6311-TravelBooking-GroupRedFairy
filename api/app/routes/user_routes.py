from flask import Blueprint, request, jsonify
from app.controllers.user_controller import UserController

user_routes = Blueprint('user_routes', __name__)
user_controller = UserController()

# User registration
@user_routes.route('/register', methods=['POST'])
def register():
	if request.method == 'POST' and request.is_json:
		return user_controller.register(request)
	return jsonify({'message': 'Invalid request'}), 400
	
