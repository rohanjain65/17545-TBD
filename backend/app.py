from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

user_db = {} #TODO: Replace this with a real database in production

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if username in user_db:
        return jsonify({"success": False, "message": "User already exists!"}), 409

    user_db[username] = password
    return jsonify({"success": True, "message": "User registered!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if user_db.get(username) == password:
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials!"}), 401

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
