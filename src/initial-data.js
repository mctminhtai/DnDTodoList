const initialData = {
	tasks: {},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To do',
			taskIds: [],
		},
		'column-2': {
			id: 'column-2',
			title: 'In Progress',
			taskIds: [],
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			taskIds: [],
		},
		'column-4': {
			id: 'column-4',
			title: 'Drop Task Here To Delete',
			taskIds: [],
		},
	},
	columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};
export default initialData;
