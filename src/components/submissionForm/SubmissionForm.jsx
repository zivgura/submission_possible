import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import dbService from '../../services/dbService';

const SubmissionForm = () => {
	const history = useHistory();
	const formPurpose = history.location.state;
	const {state, setState} = useContext(AppContext);
	const {submissionFromDb, setSubmissionFromDb} = useState(null);
	const companyNameRef = useRef();
	const physicalAddressRef = useRef();
	const annualRevenueRef = useRef();

	const getSubmissionDetails = async (submissionId) => {
		const response = await dbService.getSubmissionById(submissionId)
		const {data} = await response.json();
		setSubmissionFromDb(data[0]);
		return dbService.prepareSubmissionForEdit(data[0]);
	};

	const onSave = async () => {
		const updatedDetails = {
			companyName: companyNameRef.current.value,
			physicalAddress: physicalAddressRef.current.value,
			annualRevenue: annualRevenueRef.current.value
		}

		if (formPurpose === 'edit') {
			const submissionForDb = dbService.prepareSubmissionForDb(updatedDetails, submissionFromDb);
			await dbService.updateSubmission(state.email, submissionForDb);

			setState({
				...state,
				currentRecordId: null
			});

			history.push('/submissions');
		}
		else {
			await dbService.addNewSubmission(state.email, updatedDetails);

			setState({
				...state,
				currentRecordId: null// new record ID
			});
			
			history.push('/bind');
		}
	};

	useEffect(() => {
		const getDetails = async () => {
			const {currentRecordId} = state;

			const recordInfo = currentRecordId
				? await getSubmissionDetails(currentRecordId)
				: {}

			companyNameRef.current.value = recordInfo.companyName;
			physicalAddressRef.current.value = recordInfo.physicalAddress;
			annualRevenueRef.current.value = recordInfo.annualRevenue;
		}

		getDetails();
	}, [state]);

	return (
		<div>
			<h2>{`${formPurpose} submission`}</h2>
			<div className='submission-form'>
				<div className='submission-form-field'>
					Company name:
					<input placeholder='Enter company name' type='text' ref={companyNameRef}/>
				</div>

				<div className='submission-form-field'>
					Physical address:
					<input placeholder='Enter physical address' type='text' ref={physicalAddressRef}/>
				</div>

				<div className='submission-form-field'>
					Annual revenue:
					<input placeholder='Enter annual revenue' type='text' ref={annualRevenueRef}/>
				</div>

				<button onClick={onSave}>
					Save
				</button>
			</div>
		</div>
	);
};

export default SubmissionForm;
