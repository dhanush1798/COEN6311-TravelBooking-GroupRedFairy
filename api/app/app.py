from flask import Flask
from flask_migrate import Migrate
from extensions import db
from routes import user_routes
from dotenv import load_dotenv
from os import getenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = getenv('SQLALCHEMY_TRACK_MODIFICATIONS')
app.config['SECRET_KEY'] = getenv('SECRET_KEY')

# Register extensions
db.init_app(app)
migrate = Migrate(app, db)
# Create the database tables if they don't exist
with app.app_context():
	db.create_all()

# Register the routes
app.register_blueprint(user_routes.user_routes)

if __name__ == '__main__':
	app.run(debug=True)
