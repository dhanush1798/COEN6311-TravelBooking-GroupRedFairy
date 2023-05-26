""" 
Activity model 
"""
from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Enum, DateTime, Text, Float
from app.extensions import db

class Activity(db.Model):
	__tablename__ = 'activities'

	id = Column(Integer, primary_key=True)
	travel_package_id = Column(Integer, db.ForeignKey('travel_packages.id'), nullable=False)
	name = Column(String(120), nullable=False)
	description = Column(String(120), nullable=False)
	price = Column(Float, nullable=False)
	available_in = Column(String(120), nullable=False)
	created_at = Column(DateTime, nullable=False, server_default=db.func.now())

	def get_id(self):
		return self.id
	
	def get_travel_package_id(self):
		return self.travel_package_id
	
	def get_name(self):
		return self.name
	
	def get_description(self):
		return self.description
	
	def get_price(self):
		return self.price
	
	def get_available_in(self):
		return self.available_in
	
	def get_created_at(self):
		return self.created_at
	
	def serialize(self):
		return {
			'id': self.get_id(),
			'travel_package_id': self.get_travel_package_id(),
			'name': self.get_name(),
			'description': self.get_description(),
			'price': self.get_price(),
			'available_in': self.get_available_in(),
			'created_at': self.get_created_at()
		}

	
