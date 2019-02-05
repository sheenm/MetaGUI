import { IParsedElement } from '@types'
import { SubmitComponent } from '../components/dynamicForm/dynamicFormComponents/SubmitComponent'
import { UnknownComponent } from '../components/dynamicForm/dynamicFormComponents/UnknownComponent'

export const parseSubmit = (str: string): IParsedElement => {

    const isStatic = str.indexOf(':') !== -1
    const isDynamic = str.indexOf('=') !== -1

    if (!isStatic && !isDynamic) {
        return {
            createComponent: UnknownComponent,
            name: str,
            value: 'Не найден текст для кнопки'
        }
    }

    if (isStatic && isDynamic) {
        return {
            createComponent: UnknownComponent,
            name: str,
            value: 'Нельзя задавать и динамическое, и статическое значение кнопке одновременно',
        }
    }

    const value = str.substring(str.search(/[:=]/) + 1).trim()

    return {
        createComponent: SubmitComponent,
        isExpression: isDynamic,
        name: str,
        value,
    }
}
