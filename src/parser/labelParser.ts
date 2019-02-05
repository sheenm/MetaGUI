import { IParsedElement } from '@types'
import { LabelComponent } from '../components/dynamicForm/dynamicFormComponents/LabelComponent'
import { UnknownComponent } from '../components/dynamicForm/dynamicFormComponents/UnknownComponent'

export const parseLabel = (str: string): IParsedElement => {
    const isStatic = str.indexOf(':') !== -1
    const isDynamic = str.indexOf('=') !== -1

    if (!isStatic && !isDynamic) {
        return {
            createComponent: UnknownComponent,
            name: str,
            value: 'Не найден текст для лейбла',
        }
    }

    if (isStatic && isDynamic) {
        return {
            createComponent: UnknownComponent,
            name: str,
            value: 'Нельзя задавать и динамическое, и статическое значение лейблу одновременно',
        }
    }
    const value = str.substring(str.search(/[:=]/) + 1).trim()

    return {
        createComponent: LabelComponent,
        isExpression: isDynamic,
        name: str,
        value,
    }
}
