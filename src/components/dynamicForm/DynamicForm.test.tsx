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

/** Тест из тестового задания */
it('renders complexForm', () => {
    const input = 'label: Имя\ntext NAME\nlabel: Фамилия\ntext SURNAME\nlabel: ФИО\ntext FULLNAME=SURNAME + " " + NAME + " Батькович"\nsubmit: Сохранить'

    const div = document.createElement('div')
    ReactDOM.render(<DynamicForm input={input} />, div)

    const firstLabelText: string = (div.querySelector('form label:nth-child(1)') as any).textContent
    expect(firstLabelText).toContain('Имя')

    const firstTextbox = div.querySelector('input[name="NAME"]') as HTMLInputElement
    expect(firstTextbox).not.toBeNull()

    const secondLabelText: string = (div.querySelector('form label:nth-child(3)') as any).textContent
    expect(secondLabelText).toContain('Фамилия')

    const secondTextBox = div.querySelector('input[name="SURNAME"]') as HTMLInputElement
    expect(secondTextBox).not.toBeNull()

    const thirdLabelText: string = (div.querySelector('form label:nth-child(5)') as any).textContent
    expect(thirdLabelText).toContain('ФИО')

    const thirdTextBox = div.querySelector('input[name="FULLNAME"]') as HTMLInputElement
    expect(thirdTextBox).not.toBeNull()

    // 2 текстбокса пустые... Надо будет подключить Enzyme чтоб нормально проверить
    expect(thirdTextBox.value).toContain(' Батькович')

    ReactDOM.unmountComponentAtNode(div)
})
