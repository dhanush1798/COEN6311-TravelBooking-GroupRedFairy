from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from app.routes import 
# from app.models import
from config import Config

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

# Register the routes
#app.register_blueprint(user_bp)

if __name__ == '__main__':
	app.run(debug=True)
