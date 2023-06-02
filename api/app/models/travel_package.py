""" 
Travel package class model 
"""
import enum
from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Enum, DateTime, Text, Float, Boolean
from extensions import db

class TravelPackage(db.Model):
	__tablename__ = 'travel_packages'
	
	id = Column(Integer, primary_key=True)
	name = Column(String(120), nullable=False)
	description = Column(Text, nullable=True)
	city = Column(String(120), nullable=True)
	image = Column(String(255), nullable=True)
	total_price = Column(Float, nullable=False)
	is_custom = Column(Boolean, nullable=False, default=False)
	flights = db.relationship('Flight', backref='travel_package', lazy=True)
	hotels = db.relationship('Hotel', backref='travel_package', lazy=True)
	activities = db.relationship('Activity', backref='travel_package', lazy=True)
	created_at = Column(DateTime, nullable=False, server_default=db.func.now())

	def get_id(self):
		return self.id
	
	def get_name(self):
		return self.name
	
	def get_description(self):
		return self.description
	
	def get_image(self):
		return self.image
	
	def get_total_price(self):
		return self.total_price
	
	def is_custom(self):
		return self.is_custom

	def get_flights(self):
		return self.flights
	
	def get_hotels(self):
		return self.hotels
	
	def get_activities(self):
		return self.activities
	
	def get_created_at(self):
		return self.created_at
	
	def serialize(self):
		return {
			'id': self.get_id(),
			'name': self.get_name(),
			'description': self.get_description(),
			'image': self.get_image(),
			'total_price': self.get_total_price(),
			'type': self.get_type(),
			'created_at': self.get_created_at()
		}
	

	
