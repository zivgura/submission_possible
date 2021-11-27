class Submission:

    def __init__(self, submission_id, company_name, physical_address, annual_revenue, signed_application,
                 submitted_by, status='NEW', actions=['EDIT', 'BOND']):
        self.submission_id = submission_id
        self.company_name = company_name
        self.physical_address = physical_address
        self.annual_revenue = annual_revenue
        self.status = status
        self.signed_application = signed_application
        self.submitted_by = submitted_by
        self.actions = actions

    def to_db_format(self):
        return {
            'id': self.submission_id,
            'companyName': self.company_name,
            'physicalAddress': self.physical_address,
            'annualRevenue': self.annual_revenue,
            'status': self.status,
            'signedApplication': self.signed_application,
            'submittedBy': self.submitted_by,
            'actions': self.actions
        }
