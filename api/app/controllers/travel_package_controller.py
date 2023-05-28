from flask import jsonify
from services.travel_package_service import TravelPackageService
from utils.sanitize import sanitize_input

class TravelPackageController:
	def __init__(self):
		self.travel_package_service = TravelPackageService()
				
	def get_all_standard_packages(self):
		try:
			return jsonify(self.travel_package_service.get_all_standard_packages()), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def get_all_custom_packages(self):
		try:
			return jsonify(self.travel_package_service.get_all_custom_packages()), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def get_package(self, package_id):
		try:
			return self.travel_package_service.get_package_by_id(package_id), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def create_package(self, request):
		try:
			data = request.get_json()
			name = data.get('name')
			description = data.get('description')
			flights = data.get('flights')
			hotels = data.get('hotels')
			activities = data.get('activities')
			return self.travel_package_service.create_package(name, description, flights, hotels, activities), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def update_package(self, request, package_id):
		try:
			return self.travel_package_service.update_package(request, package_id), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
		
	def delete_package(self, package_id):
		try:
			return jsonify(self.travel_package_service.delete_package(package_id)), 200
		except Exception as e:
			return jsonify({'message': str(e)}), 400
