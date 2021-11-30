import tableUtils from '../utils';

const SubmissionActions = ({record, iconsFunction}) => {
	const actionsInfo = tableUtils.getActionsInfo(record?.actions);

	return (
		<div className="submission-actions">
			{
				actionsInfo
					? actionsInfo.map(iconInfo => (
						<img
							key={record.id+iconInfo.title}
							src={iconInfo.iconSrc}
							title={iconInfo.title}
							onClick={() => iconsFunction[iconInfo.accessor](record)}
							alt={iconInfo.title}
						/>
					))
					: null
			}
		</div>
	);
};

export default SubmissionActions;
