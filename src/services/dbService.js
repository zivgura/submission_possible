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

	return await response.json();
};

const tryRegister = async (email, password) => {
	const response = await fetch(serverUrl + '/register', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email,
			password
		})
	});

	return await response.json();
};

const getSubmissions = async (email) => {
	const response = await fetch(serverUrl + `/submissions/${email}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});

	return await response.json();
};

const getSubmissionById = async (submissionId) => {
	const response = await fetch(serverUrl + `/submission/${submissionId}`, {
		method: 'GET',
		headers: {'Content-Type': 'application/json'}
	});

	return await response.json();
};

const updateSubmission = async (email, submissionId, updatedData) => {
	const response = await fetch(serverUrl + '/update', {
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({
			email,
			data: updatedData,
			submissionId
		})
	});

	return await response.json();
};

const bindSubmission = async (formData) => {
	const response = await fetch(serverUrl + '/bind', {
		method: 'POST',
		body: formData
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

	return await response.json();
};

const prepareSubmissionsForTable = submissionFromDb => (
	{
		id:submissionFromDb.id,
		submissionId: submissionFromDb.submissionId,
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
	...updatedDetails
});

export default {
	tryLogin,
	tryRegister,
	getSubmissions,
	updateSubmission,
	addNewSubmission,
	bindSubmission,
	getSubmissionById,
	prepareSubmissionsForTable,
	prepareSubmissionForEdit,
	prepareSubmissionForDb
};
