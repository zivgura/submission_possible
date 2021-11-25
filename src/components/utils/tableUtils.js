import tableConstants from '../../constants';

const getActionsIcons = actions => (
	actions?.map(action => (
		tableConstants.actionsIcons[action]
	))
);

export default {
	getActionsIcons
};
