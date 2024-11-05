from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from cipher import encrypt, decrypt
import random

app = Flask(__name__)
CORS(app) 

# Read MongoDB password from file
with open('mongo_pass.txt', 'r') as file:
    mongo_password = file.read().strip()  # Read and strip any extra whitespace/newline

# MongoDB connection string (replace <username>, <dbname>, and other parts accordingly)
mongo_uri = f"mongodb+srv://softwarelabtbd:{mongo_password}@tbd-haas.1j781.mongodb.net/?retryWrites=true&w=majority&appName=TBD-HaaS"

# Connect to MongoDB using the connection string
client = MongoClient(mongo_uri)
db = client['TBD-Haas']  
user_collection = db['users']
project_collection = db['Projects']
existingIDs_collection = db['existingIDs']

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password required!"}), 400

    if user_collection.find_one({"username": username}):
        return jsonify({"success": False, "message": "User already exists!"}), 409

    # Store the user in the database
    user_collection.insert_one({
        "username": username,
        "password": encrypt(password, 3, 1)
    })
    return jsonify({"success": True, "message": "User registered!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"success": False, "message": "Username and password required!"}), 400

    # Find the user in the database
    user = user_collection.find_one({"username": username})

    if not user:
        return jsonify({"success": False, "message": "User does not exist!"}), 404

    if decrypt(user.get('password'), 3, 1) == password:
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials!"}), 401

@app.route('/create', methods=['POST'])
def createProject():
    data = request.json
    # Get username to add to new project's authorized users list
    username = data.get('username')
    # Get project name
    projectName = data.get('projectName')

    # Check if project name is empty
    if not projectName:
        return jsonify({"success": False, "message": "Project name required!"}), 400
    # Check if project name is already in use
    if project_collection.find_one({"projectName": projectName}):
        return jsonify({"success": False, "message": "Project name already in use!"}), 409
    
    # Create random alphanumeric project ID of length 6 that is not already in use
    projectID = ''.join(random.choices('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=6))
    while existingIDs_collection.find_one({"projectID": projectID}):
        projectID = ''.join(random.choices('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k=6))
    # Add project ID to existingIDs collection
    existingIDs_collection.insert_one({
        "projectID": projectID
    })

    # Create new project with projectID, projectName, authorized users list, and initialized checked out HW quantity
    project_collection.insert_one({
        "projectID": projectID,
        "projectName": projectName,
        "authorizedUsers": [username],
        "checkedOutHW1": 0,
        "checkedOutHW2": 0
    })
    return jsonify({"success": True, "message": "Project created!"}), 201

@app.route('/join', methods=['POST'])
def joinProject():
    data = request.json
    # Get username to add to project's authorized users list
    username = data.get('username')
    # Get project ID
    projectID = data.get('projectID')

    # Check if project name is empty
    if not projectID:
        return jsonify({"success": False, "message": "Project ID required!"}), 400
    # Check if project ID exists
    if not project_collection.find_one({"projectID": projectID}):
        return jsonify({"success": False, "message": "Project ID not found!"}), 409
    
    # Check if user is already authorized to access project
    if username in project_collection.find_one({"projectID": projectID})["authorizedUsers"]:
        return jsonify({"success": False, "message": "User already authorized!"}), 409
    
    # Add username to authorized users list of project with projectID
    project_collection.update_one({"projectID": projectID}, {"$push": {"authorizedUsers": username}})

    return jsonify({"success": True, "message": "Project joined!"}), 201


@app.route('/checkout', methods=['POST'])
def checkoutHW():
    data = request.json
    username = data.get('username')
    projectID = data.get('projectID')
    hwsetName = data.get('hwsetName')
    quantity = data.get('quantity')

    if not username or not projectID or not hwsetName or not quantity:
        return jsonify({"success": False, "message": "All fields are required!"}), 400

    # Find the project in the database
    project = project_collection.find_one({"projectID": projectID})
    if not project:
        return jsonify({"success": False, "message": "Project not found!"}), 404

    # Find the hardware set and check available quantity
    hwset = db['HWSets'].find_one({"name": hwsetName})
    if not hwset:
        return jsonify({"success": False, "message": "HWSet not found!"}), 404

    if hwset['availableQuantity'] < quantity:
        return jsonify({"success": False, "message": "Not enough hardware available!"}), 409

    # Update available quantity and project checked out quantity
    db['HWSets'].update_one(
        {"name": hwsetName},
        {"$inc": {"availableQuantity": -quantity}}
    )
    hwsetNumber = 1 if hwsetName == "HWSet1" else 2
    project_collection.update_one(
        {"projectID": projectID},
        {"$inc": {f"checkedOutHW{hwsetNumber}": quantity}}
    )

    return jsonify({"success": True, "message": "Hardware checked out successfully!"}), 200

@app.route('/checkin', methods=['POST'])
def checkinHW():
    data = request.json
    username = data.get('username')
    projectID = data.get('projectID')
    hwsetName = data.get('hwsetName')
    quantity = data.get('quantity')

    if not username or not projectID or not hwsetName or not quantity:
        return jsonify({"success": False, "message": "All fields are required!"}), 400

    # Find the project in the database
    project = project_collection.find_one({"projectID": projectID})
    if not project:
        return jsonify({"success": False, "message": "Project not found!"}), 404

    # Update available quantity and project checked out quantity
    db['HWSets'].update_one(
        {"name": hwsetName},
        # Add quantity to stored availableQuantity
        {"$inc": {"availableQuantity": quantity}}
    )
    hwsetNumber = 1 if hwsetName == "HWSet1" else 2
    project_collection.update_one(
        {"projectID": projectID},
        {"$inc": {f"checkedOutHW{hwsetNumber}": -quantity}}
    )

    return jsonify({"success": True, "message": "Hardware checked in successfully!"}), 200



if __name__ == '__main__':
    app.run(debug=True, port=5000) 
