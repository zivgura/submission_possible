import { useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';

const SubmissionForm = () => {
	const history = useHistory();
	const formPurpose = history.location.state;
	const {state, setState} = useContext(AppContext);
	console.log(state,'state');
	const companyNameRef = useRef();
	const physicalAddressRef = useRef();
	const annualRevenueRef = useRef();

	const getSubmissionDetails = (submissionId) => {
		return {
			companyName: 'Sataya',
			physicalAddress: 'TLV',
			annualRevenue: '100000000$'
		}
	};

	const onSave = () => {
		//update record
		const newRecord = {
			companyName: companyNameRef.current.value,
			physicalAddress: physicalAddressRef.current.value,
			annualRevenue: annualRevenueRef.current.value
		}

		if (formPurpose === 'edit') {
			setState({
				...state,
				currentRecordId: null
			});

			history.push('/submissions');
		}
		else {
			history.push('/bind');
		}
	};

	useEffect(() => {
		//get record details
		const {currentRecordId} = state;

		const recordInfo = currentRecordId
			? getSubmissionDetails(currentRecordId)
			: {}

		companyNameRef.current.value = recordInfo.companyName;
		physicalAddressRef.current.value = recordInfo.physicalAddress;
		annualRevenueRef.current.value = recordInfo.annualRevenue;
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
