import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import { AppContext } from '../../contexts';
import { Loader } from '../../components';
import { toastService, dbService } from '../../services';
import './bind-submission.css';

const BindSubmission = () => {
	const {state} = useContext(AppContext);
	const [fileState, setFileState] = useState({});
	const {currentRecordId, email} = state;

	const [openFileSelector, {plainFiles, loading}] = useFilePicker({
		accept: '.pdf',
		multiple: false
	});

	const onLoadedFile = async () => {
		const {file} = fileState;
		console.log(file);
		const formData = new FormData();
		formData.append('file', file);
		formData.append('email', email);
		formData.append('submissionId', currentRecordId);

		try {
			await dbService.bindSubmission(formData);
			toastService.onSuccess('File uploaded Successfully');
		} catch {
			toastService.onError('Failed to upload file');
		}
	};

	useEffect(() => {
		if (plainFiles.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(plainFiles[0]);
			reader.onload = () => {
				setFileState({
					...fileState,
					file: reader.result,
					fileSelected: true
				});
			};
			reader.onerror = () => {
				toastService.onError('Failed to upload file');
			};
		}
	}, [fileState, plainFiles]);

	return (
		<div className="bind-page">
			<div className="loader">
				{
					loading
						? <Loader/>
						: null
				}
			</div>
			<button className='bind-button' onClick={openFileSelector}>
				Select file
			</button>
			{
				fileState.fileSelected
					?
					(
						<button className='upload-button' onClick={onLoadedFile}>
							upload file
						</button>
					)
					: null
			}
		</div>
	);
};

export default BindSubmission;
