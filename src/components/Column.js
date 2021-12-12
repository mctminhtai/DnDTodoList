import React from 'react';
import styled from 'styled-components';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
const Container = styled.div`
	margin: 8px;
	border: 1px solid lightgrey;
	border-radius: 2px;
	width: 320px;
	display: flex;
	flex-direction: column;
	background-color: #fdc094;
`;
const Title = styled.h3`
	padding: 8px;
`;
const TaskList = styled.div`
	padding: 8px;
	transition: background-color 0.2s ease;
	background-color: ${(props) => (props.isDraggingOver ? 'skyblue' : '#ff9190')};
	flex-grow: 1;
	min-height: 100px;
`;

function Column({ column, tasks, index }) {
	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (
				<Container {...provided.draggableProps} ref={provided.innerRef}>
					<Title {...provided.dragHandleProps}>{column.title}</Title>
					<Droppable droppableId={column.id} type="task">
						{(provided, snapshot) => (
							<TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
								{tasks.map((task, index) => (
									<Task key={task.id} task={task} index={index} />
								))}
								{provided.placeholder}
							</TaskList>
						)}
					</Droppable>
				</Container>
			)}
		</Draggable>
	);
}

export default Column;
