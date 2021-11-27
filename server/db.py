submissions = {
    'zivgura6@gmail.com': [
        {
            'id': '1',
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
            'companyName': 'Sayata',
            'physicalAddress': 'TLV',
            'annualRevenue': '1000000$',
            'status': 'BOND',
            'signedApplication': 'file',
            'submittedBy': 'Ziv',
            'actions': ['EDIT']
        },
        {
            'id': '3',
            'companyName': 'Sayata',
            'physicalAddress': 'TLV',
            'annualRevenue': '1000000$',
            'status': 'BOND',
            'signedApplication': 'file',
            'submittedBy': 'Ziv',
            'actions': []
        }
    ]
}

users = {
    "zivgura6@gmail.com": {
        'salt': b'\x88F\x8f.|\xba\x89\x15\xfd/\xc3M\x90\x05"E\x93\xf6\xbb.\x05\xa7Zz\x96\x1a\xf11\xd4^9\x1e',
        'key': b'\r\x06\xe1\xf0Hs\xddJCc-zP\xef\xd4[\xe35\xebA\x0b\xf00\xd81a\xae\xde\x98_\xc5\xaa'
    }
}


def add(email, submission):
    submissions[email].append(submission)


def get(email):
    return submissions[email]


def get_by_id(submission_id):
    return [item for sublist in submissions.values() for item in sublist if item['id'] == submission_id]
