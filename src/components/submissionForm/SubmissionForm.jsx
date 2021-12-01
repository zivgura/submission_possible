import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../contexts';
import { dbService, toastService } from '../../services';
import { dbUtils } from '../../utils';
import { NOOP } from '../../constants';
import './submission-form.css'

const SubmissionForm = ({editable = true}) => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const {currentPage} = state;
	const [submissionFromDb, setSubmissionFromDb] = useState(null);
	const companyNameRef = useRef();
	const physicalAddressRef = useRef();
	const annualRevenueRef = useRef();

	const onSave = async () => {
		const updatedDetails = {
			companyName: companyNameRef.current.value,
			physicalAddress: physicalAddressRef.current.value,
			annualRevenue: annualRevenueRef.current.value
		};

		if (currentPage === 'Edit') {
			const submissionForDb = dbService.prepareSubmissionForDb(updatedDetails, submissionFromDb.submission);
			await dbService.updateSubmission(state.email, submissionForDb);

			setState({
				...state,
				currentRecordId: null,
				currentPage: 'Submissions'
			});

			setSubmissionFromDb(null);
			history.push('/submissions');
		}
		else {
			try {
				const response = await dbService.addNewSubmission(state.email, updatedDetails);
				const isExists = dbUtils.handleResponseFromServer(response, NOOP);

				if(isExists) {
					const {newSubmissionId} = response;
					console.log(newSubmissionId);

					setState({
						...state,
						currentRecordId: newSubmissionId,
						currentPage: 'Bind'
					});

					history.push('/bind');
				}
			} catch {
				toastService.onError('Something went wrong \n Please try again');
			}
		}
	};

	useEffect(() => {
		const getDetails = async () => {
			if (state.currentRecordId) {
				const {data} = await dbService.getSubmissionById(state.currentRecordId);
				setSubmissionFromDb(data[0]);
			}
		};

		getDetails();
	}, [state.currentRecordId]);

	useEffect(() => {
		if (submissionFromDb) {
			const recordInfo = dbService.prepareSubmissionForEdit(submissionFromDb);
			companyNameRef.current.value = recordInfo?.companyName;
			physicalAddressRef.current.value = recordInfo?.physicalAddress;
			annualRevenueRef.current.value = recordInfo?.annualRevenue;
		}
	}, [submissionFromDb])

	return (
		<div>
			<h2>{`${currentPage} submission`}</h2>
			<div className="submission-form">
				<div className="submission-form-field">
					Company name:
					<input placeholder="Enter company name" type="text" className={editable ? 'editable' : 'not-editable'} ref={companyNameRef}/>
				</div>

				<div className="submission-form-field">
					Physical address:
					<input placeholder="Enter physical address" type="text" className={editable ? 'editable' : 'not-editable'} ref={physicalAddressRef}/>
				</div>

				<div className="submission-form-field">
					Annual revenue:
					<input placeholder="Enter annual revenue" type="text" className={editable ? 'editable' : 'not-editable'} ref={annualRevenueRef}/>
				</div>

				<button onClick={onSave} className={editable ? 'editable' : 'not-editable'}>
					Save
				</button>
			</div>
		</div>
	);
};

export default SubmissionForm;
