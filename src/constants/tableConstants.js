import bindIcon from '../assets/bind-icon.png';

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

const actionsIcons = {
	NEW: 'NEW',
	EDIT: 'EDIT',
	BIND: bindIcon
};


export default {
	columns,
	actionsIcons
};
