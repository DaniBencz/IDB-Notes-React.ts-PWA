import React from 'react';
import { render } from '@testing-library/react';
import * as ReactDOM from 'react-dom'
import App from './App';

test('renders learn react link', () => {
	const { getByText } = render(<App test={false} />);
	const Waiting = getByText("Waiting for Database Connection...");
	expect(Waiting).toBeInTheDocument();
});

// how to mock the state of the component?
test('renders', () => {
	const root = document.createElement('div')
	ReactDOM.render(<App test={true} />, root)
	expect(root.querySelector('h1').textContent).toBe("IDB Notes")
})

test('Fake 1', () => {
	const num = 3
	expect(true).toBeTruthy()
	expect(num).toBe(3)
})