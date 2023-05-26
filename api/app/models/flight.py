""" 
Hotel model 
"""
import enum
from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Enum, DateTime, Text, Float
from app.extensions import db

class FlightSeatClassEnum(enum.Enum):
	economy = 'economy'
	business = 'business'
	first_class = 'first_class'

class FlightSeatLocationEnum(enum.Enum):
	window = 'window'
	aisle = 'aisle'
	middle = 'middle'

class Flight(db.Model):
	__tablename__ = 'flights'

	id = Column(Integer, primary_key=True)
	travel_package_id = Column(Integer, db.ForeignKey('travel_packages.id'), nullable=False)
	airline = Column(String(120), nullable=False)
	departure_date = Column(DateTime, nullable=False)
	arrival_date = Column(DateTime, nullable=False)
	departure_airport = Column(String(120), nullable=False)
	arrival_airport = Column(String(120), nullable=False)
	seat_class = Column(Enum(FlightSeatClassEnum), default='economy', nullable=False)
	seat_location = Column(Enum(FlightSeatLocationEnum), default='window', nullable=False)
	seat_number = Column(String(5), nullable=False)
	price = Column(Float, nullable=False)
	created_at = Column(DateTime, nullable=False, server_default=db.func.now())

	def get_id(self):
		return self.id
	
	def get_travel_package_id(self):
		return self.travel_package_id
	
	def get_airline(self):
		return self.airline
	
	def get_departure_date(self):
		return self.departure_date
	
	def get_arrival_date(self):
		return self.arrival_date
	
	def get_departure_airport(self):
		return self.departure_airport
	
	def get_arrival_airport(self):
		return self.arrival_airport
	
	def get_seat_class(self):
		return self.seat_class
	
	def get_seat_location(self):
		return self.seat_location
	
	def get_seat_number(self):
		return self.seat_number
	
	def get_price(self):
		return self.price
	
	def get_created_at(self):
		return self.created_at
	
	def serialize(self):
		return {
			'id': self.get_id(),
			'travel_package_id': self.get_travel_package_id(),
			'airline': self.get_airline(),
			'departure_date': self.get_departure_date(),
			'arrival_date': self.get_arrival_date(),
			'departure_airport': self.get_departure_airport(),
			'arrival_airport': self.get_arrival_airport(),
			'seat_class': self.get_seat_class(),
			'seat_location': self.get_seat_location(),
			'seat_number': self.get_seat_number(),
			'price': self.get_price(),
			'created_at': self.get_created_at()
		}

