from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

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
        "password": password
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

    if user.get('password') == password:
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials!"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
