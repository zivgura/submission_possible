import hashlib
import os

from flask import Flask, jsonify, request
import uuid
import itertools
from flask_cors import CORS
from server import db, Submission

app = Flask(__name__)
CORS(app)


_counter = itertools.count(4)


def add_new_user(username, password):
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)

    if username in db.users:
        return jsonify({
            "status": "failure",
            "message": "user name or password already exists"
        })
    else:
        db.users[username] = {
            'salt': salt,
            'key': key
        }

        db.submissions[username] = []

        return jsonify({
            "status": "success",
            "message": "user name registered successfully"
        })


def verify_user(username, password):
    try:
        salt = db.users[username]['salt']
        key = db.users[username]['key']
        new_key = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)

        if key != new_key:
            return jsonify({
                "status": "failure",
                "message": "user name or password are incorrect"
            })
        else:
            return jsonify({
                'status': 'success',
                'message': 'user name and password are correct'
            })
    except:
        return jsonify({
            "status": "failure",
            "message": "user name or password are incorrect"
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
    submission_from_db = db.get(email)
    if submission_from_db:
        return jsonify({
            "status": "success",
            "data": submission_from_db
        })
    else:
        return jsonify({
            "status": "failure",
            "data": None
        })


@app.route('/submission/<submission_id>', methods=['GET'])
def get_submission_by_id(submission_id):
    return jsonify({
        "data": db.get_by_id(submission_id)
    })


@app.route('/add', methods=['PUT'])
def add_submission():
    email = request.json['email']
    data = request.json['data']

    submission_id = uuid.uuid4().__str__()
    company_name = data['companyName']
    physical_address = data['physicalAddress']
    annual_revenue = data['annualRevenue']
    submitted_by = email

    next_id = next(_counter)
    submission = Submission.Submission(next_id, submission_id, company_name, physical_address, annual_revenue, None,
                                       submitted_by)

    print(submission.to_db_format())
    db.add(email, submission.to_db_format())
    return jsonify({
        "newSubmissionId": submission_id,
        "message": "added successfully",
        "status": "success"
    })


@app.route('/update', methods=['POST'])
def update_submission():
    email = request.json['email']
    data = request.json['data']
    submission_id = request.json['submissionId']

    if db.update(email, submission_id, data):
        return jsonify({
            "status": "success",
            "message": "updated successfully"
        })
    else:
        return jsonify({"failure": "did not updated"})


@app.route('/bind', methods=['POST'])
def bind_submission():
    try:
        email = request.form['email']
        submission_id = request.form['submissionId']
        signed_application = request.form['file']

        update = {
            'signedApplication': signed_application,
            'status': 'BOUND',
            'actions': []
        }

        db.update(email, submission_id, update)
        return jsonify({"status": "bound successfully"})
    except:
        return jsonify({"status": "binding failed"})


if __name__ == '__main__':
    app.run()
