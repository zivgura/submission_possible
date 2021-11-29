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
            'status': 'failure',
            'message': 'user name or password already exists'
        })
    else:
        db.users[username] = {
            'salt': salt,
            'key': key
        }

        db.submissions[username] = []

        return jsonify({
            'status': 'success',
            'message': 'user name registered successfully'
        })


def verify_user(username, password):
    salt = db.users[username]['salt']
    key = db.users[username]['key']
    new_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)

    if key != new_key:
        return jsonify({
            'status': 'failure',
            'message': 'user name or password is incorrect'
        })
    else:
        return jsonify({
            'status': 'success',
            'message': 'user name and password are correct'
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
    return jsonify({"newSubmissionId": submission_id, "status": "added successfully"})


@app.route('/update', methods=['POST'])
def update_submission():
    email = request.json['email']
    data = request.json['data']
    submission_id = request.json['submissionId']

    db.update(email, submission_id, data)
    jsonify({'status': 'updated successfully'})


@app.route('/bind', methods=['POST'])
def bind_submission():
    try:
        email = request.form['email']
        submission_id = request.form['submissionId']
        signed_application = request.form['file']

        update = {
            'signedApplication': signed_application,
            'status': 'BOUND'
        }
        db.update(email, submission_id, update)
        return jsonify({'status': 'bound successfully'})
    except:
        return jsonify({'status': 'binding failed'})


if __name__ == '__main__':
    app.run()
