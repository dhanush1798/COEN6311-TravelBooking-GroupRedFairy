from flask import Blueprint, request, jsonify
from app.controllers.user_controller import UserController

user_routes = Blueprint('user_routes', __name__, url_prefix='/api/user')
user_controller = UserController()

# User registration route: /api/user/register
@user_routes.route('/register', methods=['POST'])
def register():
	if request.method == 'POST' and request.is_json:
		return user_controller.register(request)
	return jsonify({'message': 'Invalid request'}), 400
	
# User login route: /api/user/login
@user_routes.route('/login', methods=['POST'])
def login():
	if request.method == 'POST' and request.is_json:
		return user_controller.login(request)
	return jsonify({'message': 'Invalid request'}), 400
