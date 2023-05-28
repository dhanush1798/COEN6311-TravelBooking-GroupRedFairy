from flask import Blueprint, request, jsonify
from controllers.travel_package_controller import TravelPackageController

package_routes = Blueprint('travel_package_routes', __name__, url_prefix='/api/package')
travel_package_controller = TravelPackageController()

@package_routes.route('/create', methods=['POST'])
def create_package():
	data = request.get_json()
	try:
		package = travel_package_controller.create_package(data)
		return jsonify(package.serialize())
	except Exception as e:
		return jsonify({'error': str(e)}), 400
	
@package_routes.route('/<int:package_id>', methods=['GET'])
def get_package(package_id):
	try:
		package = travel_package_controller.get_package(package_id)
		return jsonify(package.serialize())
	except Exception as e:
		return jsonify({'error': str(e)}), 400
	
@package_routes.route('/<int:package_id>', methods=['PUT'])
def update_package(package_id):
	try:
		package = travel_package_controller.update_package(request, package_id)
		return jsonify(package.serialize())
	except Exception as e:
		return jsonify({'error': str(e)}), 400
	
@package_routes.route('/<int:package_id>', methods=['DELETE'])
def delete_package(package_id):
	try:
		package = travel_package_controller.delete_package(package_id)
		return jsonify(package.serialize())
	except Exception as e:
		return jsonify({'error': str(e)}), 400