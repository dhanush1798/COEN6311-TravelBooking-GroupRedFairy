""" 
Travel package class model 
"""
import enum
from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Enum, DateTime, Text, Float
from app.extensions import db

class TravelPackageTypeEnum(enum.Enum):
	standard = 'standard'
	custom = 'custom'


class TravelPackage(db.Model):
	__tablename__ = 'travel_packages'
	
	id = Column(Integer, primary_key=True)
	name = Column(String(120), nullable=False)
	description = Column(Text, nullable=True)
	total_price = Column(Float, nullable=False)
	type = Column(Enum(TravelPackageTypeEnum), default='standard', nullable=False)
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
	
	def get_total_price(self):
		return self.total_price
	
	def get_type(self):
		return self.type

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
			'total_price': self.get_total_price(),
			'type': self.get_type(),
			'created_at': self.get_created_at()
		}
	

	
