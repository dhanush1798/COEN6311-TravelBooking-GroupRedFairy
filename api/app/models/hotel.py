""" 
Hotel model 
"""
from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Enum, DateTime, Text, Float
from extensions import db

class Hotel(db.Model):
	__tablename__ = 'hotels'

	id = Column(Integer, primary_key=True)
	travel_package_id = Column(Integer, db.ForeignKey('travel_packages.id'), nullable=False)	
	name = Column(String(120), nullable=False)
	address = Column(String(120), nullable=False)
	city = Column(String(120), nullable=False)
	state = Column(String(120), nullable=False)
	country = Column(String(120), nullable=False)
	check_in_date = Column(DateTime, nullable=False)
	check_out_date = Column(DateTime, nullable=False)
	price = Column(Float, nullable=False)
	created_at = Column(DateTime, nullable=False, server_default=db.func.now())

	def get_id(self):
		return self.id
	
	def get_travel_package_id(self):
		return self.travel_package_id
	
	def get_name(self):
		return self.name
	
	def get_address(self):
		return self.address
	
	def get_city(self):
		return self.city
	
	def get_state(self):
		return self.state
	
	def get_country(self):
		return self.country
	
	def get_check_in_date(self):
		return self.check_in_date
	
	def get_check_out_date(self):
		return self.check_out_date
	
	def get_price(self):
		return self.price
	
	def get_created_at(self):
		return self.created_at
	
	def serialize(self):
		return {
			'id': self.get_id(),
			'travel_package_id': self.get_travel_package_id(),
			'name': self.get_name(),
			'address': self.get_address(),
			'city': self.get_city(),
			'state': self.get_state(),
			'country': self.get_country(),
			'check_in_date': self.get_check_in_date(),
			'check_out_date': self.get_check_out_date(),
			'price': self.get_price(),
			'created_at': self.get_created_at()
		}
	
