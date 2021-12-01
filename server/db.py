submissions = {
    'zivgura6@gmail.com': [
        {
            'id': '1',
            'submissionId': '654-dfg',
            'companyName': 'Sayata',
            'physicalAddress': 'TLV',
            'annualRevenue': '1000000$',
            'status': 'NEW',
            'signedApplication': None,
            'submittedBy': 'Ziv',
            'actions': ['EDIT', 'BIND']
        },
        {
            'id': '2',
            'submissionId': '654-ddfg',
            'companyName': 'Sayata',
            'physicalAddress': 'TLV',
            'annualRevenue': '1000000$',
            'status': 'BOUND',
            'signedApplication': 'file',
            'submittedBy': 'Ziv',
            'actions': []
        },
        {
            'id': '3',
            'submissionId': '654-dfsdg',
            'companyName': 'Sayata',
            'physicalAddress': 'TLV',
            'annualRevenue': '1000000$',
            'status': 'BOUND',
            'signedApplication': 'file',
            'submittedBy': 'Ziv',
            'actions': []
        }
    ]
}

users = {
    'zivgura6@gmail.com': {
        'salt': b'\x88F\x8f.|\xba\x89\x15\xfd/\xc3M\x90\x05"E\x93\xf6\xbb.\x05\xa7Zz\x96\x1a\xf11\xd4^9\x1e',
        'key': b'\r\x06\xe1\xf0Hs\xddJCc-zP\xef\xd4[\xe35\xebA\x0b\xf00\xd81a\xae\xde\x98_\xc5\xaa'
    }
}


def add(email, submission):
    submissions[email].append(submission)


def get(email):
    try:
        return submissions[email]
    except:
        return None


def get_by_id(submission_id):
    return [item for sublist in submissions.values() for item in sublist if item['submissionId'] == submission_id]


def update(email, submission_id, updates):
    broker_submissions = get(email)
    submission = [item for item in broker_submissions if item['submissionId'] == submission_id][0]
    index = broker_submissions.index(submission)
    del broker_submissions[index]
    submission.update(updates)
    broker_submissions.append(submission)
    submissions[email] = broker_submissions
    return True
