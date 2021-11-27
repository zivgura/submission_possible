import hashlib
import os

from flask import Flask, jsonify, request
import uuid
from flask_cors import CORS
from server import db, Submission

app = Flask(__name__)
CORS(app)


def add_new_user(username, password):
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)

    if username in db.users:
        return jsonify({
            "status": "fail",
            "message": "user name or password already exists"
        })
    else:
        db.users[username] = {
            'salt': salt,
            'key': key
        }

        return jsonify({
            "status": "success",
            "message": "user name registered successfully"
        })


def verify_user(username, password):
    salt = db.users[username]['salt']
    key = db.users[username]['key']
    new_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)

    if key != new_key:
        return jsonify({
            "status": "fail",
            "message": "user name or password is incorrect"
        })
    else:
        return jsonify({
            "status": "success",
            "message": "user name and password are correct"
        })


@app.route('/register', methods=['POST'])
def register():
    email = request.json['email']
    password = request.json['password']
    return add_new_user(email, password)


@app.route('/login', methods=['POST'])
def login():
    email = request.json['email']
    password = request.json['password']
    return verify_user(email, password)


@app.route('/submissions/<email>', methods=['GET'])
def get_submissions(email):
    return jsonify({"data": db.get(email)})


@app.route('/submission/<submission_id>', methods=['GET'])
def get_submission_by_id(submission_id):
    return jsonify({"data": db.get_by_id(submission_id)})


@app.route('/add', methods=['PUT'])
def add_submission():
    email = request.json['email']
    data = request.json['data']

    submission_id = uuid.uuid4()
    company_name = data.companyName
    physical_address = data.physicalAddress
    annual_revenue = data.annualRevenue
    submitted_by = email

    submission = Submission.Submission(submission_id, company_name, physical_address, annual_revenue, None,
                                       submitted_by)

    db.add(email, submission.to_db_format())
    return jsonify({"status": "added successfully"})


@app.route('/update', methods=['POST'])
def update_submission():
    email = request.json['email']
    data = request.json['data']
    submission_id = request.json['submissionId']
    status = data.status
    actions = data.actions
    company_name = data.company_name
    physical_address = data.physical_address
    annual_revenue = data.annual_revenue
    submitted_by = data.submitted_by

    if request.json['signed_application']:
        signed_application = request.json['signed_application']
    else:
        signed_application = None

    submission = Submission.Submission(submission_id, company_name, physical_address, annual_revenue, status,
                                       signed_application, submitted_by, actions)

    db.add(email, submission.to_db_format())
    jsonify({"status": "updated successfully"})


if __name__ == '__main__':
    app.run()
