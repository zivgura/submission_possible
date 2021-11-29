import { useContext, useMemo } from 'react';
import { useTable } from 'react-table';
import { useHistory } from 'react-router-dom';
import SubmissionActions from './SubmissionActions';
import tableConstants from '../../constants';
import { AppContext } from '../../contexts';
import './submissions-table.css';

const SubmissionsTable = () => {
	const history = useHistory();
	const {state, setState} = useContext(AppContext);
	const {data} = state;
	const {columns} = tableConstants;

	const iconsFunction = useMemo(() => {
		const onEdit = (record) => {
			setState({
				...state,
				currentRecordId: record.id
			});

			history.push('/submission', 'Edit');
		};

		const onBind = (record) => {
			setState({
				...state,
				currentRecordId: record.id
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
		}))), [data, iconsFunction]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({columns, data: formattedData});

	return (
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
						<tr {...row.getRowProps()}>
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
	);
};

export default SubmissionsTable;
