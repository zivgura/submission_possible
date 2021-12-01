import bindIcon from '../assets/bind-icon.png';
import editIcon from '../assets/edit-icon.png';

const columns = [
	{
		Header: '#',
		accessor: 'id'
	},
	{
		Header: 'Submission ID',
		accessor: 'submissionId'
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
