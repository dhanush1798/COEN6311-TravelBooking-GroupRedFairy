from flask import jsonify, session
from app.models.user import User
from app.models.travel_package import TravelPackage
from app import db

class TravelPackageService:
	@staticmethod
	def get_all_standard_packages():
		return TravelPackage.query.filter_by(is_custom=False).all()
	
	@staticmethod
	def get_all_custom_packages():
		return TravelPackage.query.filter_by(is_custom=True).all()
		
	@staticmethod
	def get_package(package_id):
		return TravelPackage.query.get(package_id)
		
	@staticmethod
	def create_package(name, description, flights, hotels, activities):
		# Get current user email
		email = session.get('email')
		# Check if user exists with that email
		user = User.query.filter_by(email=email).first()
		if user is None:
			raise Exception('This action is not allowed.')
		# Get user role
		role = user.get_role()
		# Create new package
		new_package = TravelPackage(name=name, description=description, flights=flights, hotels=hotels, activities=activities)
		# If user role is user, set is_custom to True
		if role == 'user':
			new_package.is_custom = True
		# Add new package to database
		db.session.add(new_package)
		db.session.commit()
		return new_package
	
	@staticmethod
	def update_package(data, package_id):
		# Get current user email
		email = session.get('email')
		# Check if user exists with that email
		user = User.query.filter_by(email=email).first()
		if user is None:
			raise Exception('This action is not allowed.')
		# Get user role
		role = user.get_role()
		# Get package
		package = TravelPackage.query.get(package_id)
		# If user role is user and package is not custom, raise exception
		if role == 'user' and not package.is_custom:
			raise Exception('This action is not allowed.')
		# Update package
		package.name = data.get('name') if data.get('name') else package.name
		package.description = data.get('description') if data.get('description') else package.description
		package.flights = data.get('flights') if data.get('flights') else package.flights
		package.hotels = data.get('hotels') if data.get('hotels') else package.hotels
		package.activities = data.get('activities') if data.get('activities') else package.activities
		# Commit changes
		db.session.commit()
		return package
	
	@staticmethod
	def delete_package(package_id):
		# Get current user email
		email = session.get('email')
		# Check if user exists with that email
		user = User.query.filter_by(email=email).first()
		if user is None:
			raise Exception('This action is not allowed.')
		# Get user role
		role = user.get_role()
		# Get package
		package = TravelPackage.query.get(package_id)
		# If user role is admin or agent, delete package
		if role == 'admin' or role == 'agent':
			# Delete package
			db.session.delete(package)
			# Commit changes
			db.session.commit()
			return True
		else:
			raise Exception('This action is not allowed.')
