import { useEffect, useState } from 'react';
import initialData from './initial-data';
import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Button from './components/Button';
import { v4 } from 'uuid';

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const TodoTable = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h1 {
		color: white;
		padding: 30px;
	}
`;

function App() {
	const [state, setState] = useState(initialData);
	const [text, setText] = useState('');
	useEffect(() => {
		const prevData = localStorage.getItem('backupData');
		if (prevData) {
			setState(JSON.parse(prevData));
		}
	}, []);
	const onDragStart = (result) => {
		document.body.style.color = 'pink';
		return;
	};
	const onDragUpdate = (result) => {
		return;
	};
	const onDragEnd = (result) => {
		document.body.style.color = 'inherit';
		//TODO: reorder out column
		const { destination, source, draggableId, type } = result;
		if (!destination) {
			return;
		}
		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'column') {
			const newColumnOrder = Array.from(state.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);
			const newState = {
				...state,
				columnOrder: newColumnOrder,
			};
			setState(newState);
			return;
		}

		const start = state.columns[source.droppableId];
		const finish = state.columns[destination.droppableId];
		if (start === finish) {
			const column = state.columns[source.droppableId];
			const newTaskIds = Array.from(column.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);
			const newColumn = {
				...column,
				taskIds: newTaskIds,
			};

			const newState = {
				...state,
				columns: {
					...state.columns,
					[newColumn.id]: newColumn,
				},
			};
			setState(newState);
			return;
		}

		// Moving from one list to another
		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};
		if (finish.id !== 'column-4') {
			const finishTaskIds = Array.from(finish.taskIds);
			finishTaskIds.splice(destination.index, 0, draggableId);
			const newFinish = {
				...finish,
				taskIds: finishTaskIds,
			};
			const newState = {
				...state,
				columns: {
					...state.columns,
					[newStart.id]: newStart,
					[newFinish.id]: newFinish,
				},
			};
			setState(newState);
			localStorage.setItem('backupData', JSON.stringify(newState));
			return;
		}
		const newState = {
			...state,
			columns: {
				...state.columns,
				[newStart.id]: newStart,
			},
		};
		setState(newState);
		localStorage.setItem('backupData', JSON.stringify(newState));
	};
	const onUpdateInput = (data) => {
		setText(data);
	};
	const onSubmitInput = (data) => {
		if (data.trim() === '') {
			return;
		}
		const taskId = v4();
		const newTasks = { ...state.tasks, [taskId]: { id: taskId, content: data } };
		const newTaskIds = [...state.columns['column-1'].taskIds, taskId];
		const newTodoColumn = { ...state.columns['column-1'], taskIds: newTaskIds };
		const newColumns = { ...state.columns, 'column-1': newTodoColumn };
		const newState = { ...state, tasks: newTasks, columns: newColumns };
		setState(newState);
		setText('');
		localStorage.setItem('backupData', JSON.stringify(newState));
	};
	return (
		<TodoTable>
			<h1>MY TO DO LIST</h1>
			<DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd}>
				<Droppable droppableId="all-columns" direction="horizontal" type="column">
					{(provided) => (
						<Container {...provided.droppableProps} ref={provided.innerRef}>
							{state.columnOrder.map((columnId, index) => {
								const column = state.columns[columnId];
								const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
								return <Column key={column.id} column={column} tasks={tasks} index={index} />;
							})}
							{provided.placeholder}
						</Container>
					)}
				</Droppable>
			</DragDropContext>
			<Button inputText={text} onUpdateInput={onUpdateInput} onSubmitInput={onSubmitInput} />
		</TodoTable>
	);
}

export default App;
