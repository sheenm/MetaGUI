import { IParsedElement } from '@types'
import { TextComponent } from '../components/dynamicForm/dynamicFormComponents/TextComponent'
import { UnknownComponent } from '../components/dynamicForm/dynamicFormComponents/UnknownComponent'

export const parseText = (str: string): IParsedElement => {

    const name = findInputName(str)
    if (!name) {
        return {
            createComponent: UnknownComponent,
            isExpression: false,
            name: str,
            value: 'Не найдено название текстбокса',
        }
    }

    const value = findValueExpression(str)

    return {
        createComponent: TextComponent,
        isExpression: value != null,
        name,
        value
    }
}

const findInputName = (str: string): string => {
    const regExpMatches = str.match(/^\w+\s+(\w+)/)
    const name = (regExpMatches && regExpMatches[1]) || ''

    return name
}

const findValueExpression = (str: string): string | undefined => {
    const indexOfDynamicSign = str.indexOf('=')
    if (indexOfDynamicSign === -1) {
        return undefined
    }

    return str.slice(str.indexOf('=') + 1)
}
