from flask import Flask
from app.extensions import db
from app.routes import user_routes
from config import Config

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = Config.SQLALCHEMY_TRACK_MODIFICATIONS

# Register extensions
db.init_app(app)

# Register the routes
app.register_blueprint(user_routes.user_routes)

if __name__ == '__main__':
	app.run(debug=True)
