import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// as clarification, below code should be same as testing library render function,
// however, it don't seem to work
// import * as ReactDOM from 'react-dom'
// import { getQueriesForElement } from '@testing-library/react';
/* const render = (component: JSX.Element) => {
	const root = document.createElement('div')
	ReactDOM.render(component, root)
	return getQueriesForElement(root)	// has getByText and getByLabelText
} */

window.alert = jest.fn()	// to supperess 'Error: Not implemented: window.alert'

test('renders Waiting for DB', () => {
	// optianlly cleaning up effects of mocking on the global object
	// that otherwise would persist across tests:
	window.alert.mockClear();

	const { getByText } = render(<App test={false} />);
	const Waiting = getByText("Waiting for Database Connection...");
	expect(Waiting).toBeInTheDocument();
});

test('renders Notes', () => {
	const { getByText } = render(<App test={true} />);
	const Notes = getByText("IDB Notes")
	expect(Notes).toBeInTheDocument()

	// const root = document.createElement('div')
	// ReactDOM.render(<App test={true} />, root)
	// expect(root.querySelector('h1').textContent).toBe("IDB Notes")
})

// test('saves note', () => {
// 	const { getByText } = render(<App test={true} />);
// })
