import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	margin-top: 40px;
	h2 {
		color: white;
		margin-bottom: 20px;
		text-align: center;
	}
	input {
		width: 300px;
		height: 30px;
		border-radius: 10px;
		font-size: 20px;
		padding: 5px;
	}
	button {
		margin-left: 20px;
		width: 100px;
		height: 45px;
		font-weight: bold;
	}
`;

function Button({ inputText, onUpdateInput, onSubmitInput }) {
	const updateText = (e) => {
		let inputData = e.target.value;
		onUpdateInput(inputData);
	};
	const addTask = (e) => {
		onSubmitInput(inputText);
	};
	return (
		<Container>
			<h2>ADD NEW TASK</h2>
			<input type="text" value={inputText} onChange={updateText} />
			<button onClick={addTask}>Add</button>
		</Container>
	);
}

export default Button;
