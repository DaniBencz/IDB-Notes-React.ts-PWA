import React from 'react';
import { render, fireEvent, queryByAttribute } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event'
// https://github.com/testing-library/user-event

// https://www.youtube.com/watch?v=ZmVBCpefQe8&feature=youtu.be&t=1

// as clarification, below code should be same as testing-library 'render' function,
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

const getById = queryByAttribute.bind(null, 'id')	// handy custom function
test('renders Notes', () => {
	const { getByText, container } = render(<App test={true} />);
	
	const title = getByText("IDB Notes")
	expect(title).toBeInTheDocument()	// same as:
	expect(container.querySelector('h1').textContent).toBe("IDB Notes")
	
	const displayPlaceolder = getByText('Your notes will appear here')
	expect(displayPlaceolder).toBeInTheDocument()

	const formTitle = getByText('New Note')
	expect(formTitle).toBeInTheDocument()

	const formTitlePlaceholder = getById(container, 'title')
	expect(formTitlePlaceholder.placeholder).toBe("Title")
})

test('updtes input value upon submiting empty note', () => {
	const dom = render(<App test={true} />);
	const input = getById(dom.container, 'title')
	const submit = getById(dom.container, 'create')
	
	fireEvent.click(submit)
	expect(input.value).toBe('Please provide title!')
})

test('take userEvent for a spin', () => {
	const dom = render(<App test={true} />);
	const input = getById(dom.container, 'title')

	// below same as fireEvent.change(input, { target: { value } })
	// but instead of inserting string at once, simulates the typing sequnce
	userEvent.type(input, 'Hello!')
	expect(input.value).toBe('Hello!')	// same as:
	// expect(input).toHaveAttribute('value', 'Hello!')
})

/* test('submit valid note', () => {
	const dom = render(<App test={true} />);
	const input = getById(dom.container, 'title')
	const submit = getById(dom.container, 'create')
	
	// not sure how to implement mocking of indexedDB, to test valid submission event
	// submit won't work, as is, because indexedDB is not implemented in jsdom

	// const dbs = {
	// 	transaction: {
	// 		objectstore: {
	// 			add: {
	// 				onsuccess: jest.fn()
	// 			}
	// 		}
	// 	}
	// }

	// window.indexedDB = 'mock'
	// const addNewNote = jest.fn()
	// console.log('idb: ', window.indexedDB)
	// fireEvent.change(input, { target: { value } })
	// fireEvent.click(submit)

	userEvent.type(input, 'Hello!')
	// submit and assertion comes here
}) */


