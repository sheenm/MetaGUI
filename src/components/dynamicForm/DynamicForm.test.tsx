import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DynamicForm } from './DynamicForm'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="" />, div)
    ReactDOM.unmountComponentAtNode(div)
})

it('renders static label', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="label: labelName" />, div)

    const labelText: string = (div.querySelector('form label:first-child') as any).textContent
    expect(labelText).toBe('labelName')

    ReactDOM.unmountComponentAtNode(div)
})

it('renders error when tries to use static and dynamic label at the same time', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="label:= labelName" />, div)

    const labelText: string = (div.querySelector('form span:first-child') as any).textContent
    expect(labelText).toContain('Ошибка синтаксиса')

    ReactDOM.unmountComponentAtNode(div)
})

it('renders static textbox', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="text textName" />, div)

    const textbox = div.querySelector('input[name="textName"]')
    expect(textbox).not.toBeNull()

    ReactDOM.unmountComponentAtNode(div)
})

it('renders error textbox when no name', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="text " />, div)

    const textbox = div.querySelector('form label:first-child')
    expect(textbox).toBeNull()

    const labelText: string = (div.querySelector('form span:first-child') as any).textContent
    expect(labelText).toContain('Ошибка синтаксиса')

    ReactDOM.unmountComponentAtNode(div)
})

it('renders error textbox when no name (and tries expression)', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="text ='hello. world' + 'something' + NAME" />, div)

    const textbox = div.querySelector('form label:first-child')
    expect(textbox).toBeNull()

    const labelText: string = (div.querySelector('form span:first-child') as any).textContent
    expect(labelText).toContain('Ошибка синтаксиса')

    ReactDOM.unmountComponentAtNode(div)
})

it('renders static submit', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="submit: submitText" />, div)

    const submitText: string = (div.querySelector('form input:first-child') as any).value
    expect(submitText).toBe('submitText')

    ReactDOM.unmountComponentAtNode(div)
})

it('renders error when tries to use static and dynamic submit at the same time', () => {
    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input="submit:= submitText" />, div)

    const labelText: string = (div.querySelector('form span:first-child') as any).textContent
    expect(labelText).toContain('Ошибка синтаксиса')

    ReactDOM.unmountComponentAtNode(div)
})
