import { useContext, useMemo } from 'react';
import { useTable } from 'react-table';
import { useHistory } from 'react-router-dom';
import SubmissionActions from './SubmissionActions';
import { tableConstants } from '../../constants';
import AppContext from '../../contexts';
import { ReactComponent as AddIcon } from '../../assets/add-icon.svg';
import './submissions-table.css';

const SubmissionsTable = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const {data} = state;
	const {columns} = tableConstants;

	const onAddNew = () => {
		setState({
			...state,
			currentPage: 'New',
		});

		history.push('/submission');
	};

	const iconsFunction = useMemo(() => {
		const onEdit = (record) => {
			setState({
				...state,
				currentRecordId: record.submissionId,
				currentPage: 'Edit'
			});

			history.push('/submission');
		};

		const onBind = (record) => {
			setState({
				...state,
				currentRecordId: record.submissionId,
				currentPage: 'Bind'
			});

			history.push('/bind');
		};

		return ({
			'EDIT': onEdit,
			'BIND': onBind
		});
	}, [history, setState, state]);

	const formattedData = useMemo(() => (
		data.map(record => ({
			...record,
			actions: (
				<SubmissionActions record={record} iconsFunction={iconsFunction}/>
			)
		}))
			.sort(({id: id1}, {id: id2}) => id1 - id2)
	), [data, iconsFunction]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({columns, data: formattedData});

	return (
		<div className="table-page">
			<div className="table-container">
				<table {...getTableProps()}>
					<thead>
					{
						headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{
									headerGroup.headers.map(column => (
										<th {...column.getHeaderProps()}>
											{
												column.render('Header')
											}
										</th>
									))}
							</tr>
						))
					}
					</thead>
					<tbody {...getTableBodyProps()}>
					{
						rows.map(row => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} className={rows.indexOf(row) % 2 === 0 ? 'odd' : 'even'}>
									{
										row.cells.map(cell => (
											<td {...cell.getCellProps()}>
												{
													cell.render('Cell')
												}
											</td>
										))
									}
								</tr>
							);
						})
					}
					</tbody>
				</table>
			</div>
			<div className="new-submission">
				<AddIcon className="new-submission-button" onClick={onAddNew}/>
			</div>
		</div>
	);
};

export default SubmissionsTable;
