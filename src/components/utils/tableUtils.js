import tableConstants from '../../constants';

const getActionsInfo = actions => (
	actions?.map(action => (
		tableConstants.actionsInfo[action]
	))
);

export default {
	getActionsInfo
};
