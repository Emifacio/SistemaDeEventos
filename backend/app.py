from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  
from os import environ
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DATABASE_URL')
CORS(app)  # Enable CORS for all routes
db = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = 'laclavesecreta'
jwt = JWTManager(app)



class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
      
@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if username is None or password is None:
        return jsonify({'message': 'Missing username or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 400

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({'message': 'Invalid username or password'}), 401



class Event(db.Model):
    __tablename__ = 'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    date = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(200))

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'date': self.date,
            'location': self.location,
            'description': self.description
        }
  
db.create_all()

# create a test route
@app.route('/test', methods=['GET'])
def test():
  return jsonify({'message': 'The server is running'})

# create event
@app.route('/api/flask/event', methods=['POST'])
def create_event():
  try:
    data = request.get_json()
    new_event = Event(name=data['name'], date=data['date'], location=data['location'], description=data['description'] )
    db.session.add(new_event)
    db.session.commit()  

    return jsonify({
            'id': new_event.id,
            'name': new_event.name,
            'date': new_event.date,
            'location': new_event.location,
            'description': new_event.description
    }), 201  

  except Exception as e:
    return make_response(jsonify({'message': 'error creating event', 'error': str(e)}), 500)
  
# get all events
@app.route('/api/flask/events', methods=['GET'])
def get_events():
  try:
    events = Event.query.all()
    events_data = [{'id': event.id, 'name': event.name, 'date': event.date, 'location': event.location, 'description': event.description} for event in events]
    return jsonify(events_data), 200
  except Exception as e:
    return make_response(jsonify({'message': 'error getting events', 'error': str(e)}), 500)
  
# get an event by id
@app.route('/api/flask/events/<id>', methods=['GET'])
def get_event(id):
  try:
    event = Event.query.filter_by(id=id).first() # get the first event with the id
    if event:
      return make_response(jsonify({'event': event.json()}), 200)
    return make_response(jsonify({'message': 'event not found'}), 404) 
  except Exception as e:
    return make_response(jsonify({'message': 'error getting event', 'error': str(e)}), 500)
  
# update a event by id
@app.route('/api/flask/events/<id>', methods=['PUT'])
def update_event(id):
  try:
    event = Event.query.filter_by(id=id).first()
    if event:
      data = request.get_json()
      event.name = data['name']
      event.date = data['date']
      event.location = data ['location']
      event.description = data ['description'] 
      db.session.commit()
      return make_response(jsonify({'message': 'event updated'}), 200)
    return make_response(jsonify({'message': 'event not found'}), 404)  
  except Exception as e:
      return make_response(jsonify({'message': 'error updating event', 'error': str(e)}), 500)

# delete an event by id
@app.route('/api/flask/events/<id>', methods=['DELETE'])
def delete_event(id):
  try:
    event = Event.query.filter_by(id=id).first()
    if event:
      db.session.delete(event)
      db.session.commit()
      return make_response(jsonify({'message': 'event deleted'}), 200)
    return make_response(jsonify({'message': 'event not found'}), 404) 
  except Exception as e:
    return make_response(jsonify({'message': 'error deleting event', 'error': str(e)}), 500)
