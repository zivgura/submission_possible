import { ReactComponent as BindIcon } from '../assets/bind-icon.svg';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';

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
		icon: EditIcon,
		title: 'Edit',
		accessor: 'EDIT'
	},
	BIND: {
		icon: BindIcon,
		title: 'Bind',
		accessor: 'BIND'
	}
};


export default {
	columns,
	actionsInfo
};
