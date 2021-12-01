import tableUtils from '../utils';

const SubmissionActions = ({record, iconsFunction}) => {
	const actionsInfo = tableUtils.getActionsInfo(record?.actions);

	return (
		<div className="submission-actions">
			{
				actionsInfo.length > 0
					? actionsInfo.map(iconInfo => {
						if (iconInfo) {
							const {icon: Icon} = iconInfo;
							return (
								<Icon
									key={record.id + iconInfo.title}
									title={iconInfo.title}
									onClick={() => iconsFunction[iconInfo.accessor](record)}
									alt={iconInfo.title}
								/>
							);
						}

						return null;
					})
					: null
			}
		</div>
	);
};

export default SubmissionActions;
