import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../contexts';
import { dbService, toastService } from '../../services';
import { dbUtils } from '../../utils';
import { NOOP } from '../../constants';
import './submission-form.css';

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
			const updatedSubmissionForDb = dbService.prepareSubmissionForDb(updatedDetails, submissionFromDb);
			const response = await dbService.updateSubmission(state.email, state.currentRecordId, updatedSubmissionForDb);
			dbUtils.handleResponseFromServer(response, NOOP);

			setState({
				...state,
				currentRecordId: null,
				currentPage: 'Submissions'
			});

			setSubmissionFromDb(null);
			history.push('/submissions');
		} else {
			try {
				const response = await dbService.addNewSubmission(state.email, updatedDetails);
				const isExists = dbUtils.handleResponseFromServer(response, NOOP);

				if (isExists) {
					const {newSubmissionId} = response;

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
	}, [submissionFromDb]);

	return (
		<div className="submission-form">
			<div className="submission-form-container">
				<h2>{`${currentPage} submission`}</h2>
				<div className="submission-form-fields">
					<div className="form-field">
						<input placeholder="Company name" type="text" className={editable ? 'editable' : 'not-editable'}
							   ref={companyNameRef}/>
					</div>

					<div className="form-field">
						<input placeholder="Physical address" type="text"
							   className={editable ? 'editable' : 'not-editable'}
							   ref={physicalAddressRef}/>
					</div>

					<div className="form-field">
						<input placeholder="Annual revenue" type="text"
							   className={editable ? 'editable' : 'not-editable'}
							   ref={annualRevenueRef}/>
					</div>

					<div className="form-action">
					<button onClick={onSave} className={editable ? 'editable' : 'not-editable'}>
						Save
					</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SubmissionForm;
