# This file is intended to support new user registration and existing user login and interacting with the database
# it should also encrypt/decrypt passwords

from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__, static_folder='static')

user_db = {}

def register_user(username, password):
    if username in user_db:
        return False
    user_db[username] = password
    return True

def login_user(username, password):
    return user_db.get(username) == password

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if login_user(username, password):
        return jsonify({"success": True, "message": "Login successful!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid credentials!"}), 401

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if register_user(username, password):
        return jsonify({"success": True, "message": "User registered!"}), 201
    else:
        return jsonify({"success": False, "message": "User already exists!"}), 409

# Serve the HTML file
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

# Static folder serves JS and CSS automatically
if __name__ == '__main__':
    app.run(debug=True)
