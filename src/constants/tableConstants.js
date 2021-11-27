import { useContext } from 'react';
import { AppContext } from '../contexts';
import bindIcon from '../assets/bind-icon.png';
import editIcon from '../assets/edit-icon.png';

const columns = [
	{
		Header: 'Submission ID',
		accessor: 'id'
	},
	{
		Header: 'Status',
		accessor: 'status'
	},
	{
		Header: 'Actions',
		accessor: 'actions'
	}
];

const actionsInfo = {
	EDIT: {
		iconSrc: editIcon,
		title: 'Edit',
		accessor: 'EDIT'
	},
	BIND: {
		iconSrc: bindIcon,
		title: 'Bind',
		accessor: 'BIND'
	}
};


export default {
	columns,
	actionsInfo
};
