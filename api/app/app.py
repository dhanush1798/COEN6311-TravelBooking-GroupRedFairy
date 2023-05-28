from flask import Flask
from flask_migrate import Migrate
from extensions import db
from routes import user_routes
from config import Config

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS
app.config['SECRET_KEY'] = Config.SECRET_KEY

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
