const serverUrl = 'http://localhost:5000';

const tryLogin = async (email, password) => {
	const response = await fetch(serverUrl + '/login', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email,
			password
		})
	});

	return response;
};

const getSubmissions = async (email) => {
	const response = await fetch(serverUrl + `/submissions/${email}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});

	return response;
};

const getSubmissionById = async (submissionId) => {
	const response = await fetch(serverUrl + `/submission/${submissionId}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});

	return response;
};

const updateSubmission = async (email, submission) => {
	const response = await fetch(serverUrl + '/update', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email,
			data: submission
		})
	});

	return response;
};

const addNewSubmission = async (email, submission) => {
	const response = await fetch(serverUrl + '/add', {
		method: 'PUT',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email,
			data: submission
		})
	});

	return response;
};

const prepareSubmissionsForTable = submissionFromDb => (
	{
		id: submissionFromDb.id,
		status: submissionFromDb.status,
		actions: submissionFromDb.actions
	}
);

const prepareSubmissionForEdit = submissionFromDb => (
	{
		companyName: submissionFromDb.companyName,
		physicalAddress: submissionFromDb.physicalAddress,
		annualRevenue: submissionFromDb.annualRevenue
	}
);

const prepareSubmissionForDb = (updatedDetails, submissionFromDb) => ({
	...submissionFromDb,
	updatedDetails
});

export default {
	tryLogin,
	getSubmissions,
	updateSubmission,
	addNewSubmission,
	getSubmissionById,
	prepareSubmissionsForTable,
	prepareSubmissionForEdit,
	prepareSubmissionForDb
};
