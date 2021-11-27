import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFilePicker } from 'use-file-picker';
import { AppContext } from '../../contexts';
import { Loader } from '../../components';
import toastService from '../../services';
import './bind-submission.css';
import dbService from '../../services/dbService';

const BindSubmission = () => {
	const [openFileSelector, {plainFiles, loading, errors}] = useFilePicker({
		accept: '.pdf',
		multiple: false
	});

	const sendToServer = () => {
		// dbService.updateSubmission()
		toastService.onSuccess('File uploaded Successfully');
	};

	useEffect(() => {
		if (plainFiles.length > 0) {
			sendToServer(plainFiles);
		}
	}, [plainFiles]);

	return (
		<div className='bind-page'>
			<div className='loader'>
				{
					loading
						? <Loader/>
						: null
				}
			</div>
			<button className='bind-button' onClick={openFileSelector}>
				Select file
			</button>
		</div>
	);
};

export default BindSubmission;
