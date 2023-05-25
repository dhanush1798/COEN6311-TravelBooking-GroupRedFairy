""" 
User class model 
"""
from sqlalchemy import Column, String
from sqlalchemy.types import Integer, Enum, DateTime
from app import db

class UserRoleEnum(Enum):
	admin = 'admin'
	agent = 'agent'
	user = 'user'

class User(db.Model):
	__tablename__ = 'users'
	
	id = Column(Integer, primary_key=True)
	email = Column(String(120), unique=True, nullable=False)
	password = Column(String(120), nullable=False)
	first_name = Column(String(120), nullable=False)
	last_name = Column(String(120), nullable=False)
	city = Column(String(120), nullable=True)
	state = Column(String(120), nullable=True)
	country = Column(String(120), nullable=True)
	role = Column(Enum(UserRoleEnum), default='user', nullable=False)
	created_at = Column(DateTime, nullable=False)

	def get_id(self):
		return self.id
	
	def get_email(self):
		return self.email
	
	def get_password(self):
		return self.password
	
	def get_first_name(self):
		return self.first_name
	
	def get_last_name(self):
		return self.last_name
	
	def get_name(self):
		return self.first_name + ' ' + self.last_name
	
	def get_city(self):
		return self.city
	
	def get_state(self):
		return self.state
	
	def get_country(self):
		return self.country
	
	def get_role(self):
		return self.role
	
	def get_created_at(self):
		return self.created_at