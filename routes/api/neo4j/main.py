from flask import Flask
from flask_restful import Api

# APIs
import employees  # Sql
import users  # In-memory
import studentsApi # Neo-4j

# from sqlalchemy import create_engine
# from json import dumps
# from flask.ext.jsonpify import jsonify

app = Flask(__name__)
api = Api(app)

api.add_resource(users.User, "/users/<string:name>")

api.add_resource(employees.Tracks, '/tracks')

api.add_resource(employees.Employees, '/employees')
api.add_resource(employees.Employees_Name, '/employees/<employee_id>')

app.run(debug=True)
