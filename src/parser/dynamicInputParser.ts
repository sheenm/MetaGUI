import { IParsedElement } from '@types'
import { UnknownComponent } from '../components/dynamicForm/dynamicFormComponents/UnknownComponent'
import { parseLabel } from './labelParser'
import { parseSubmit } from './submitInputParser'
import { parseText } from './textParser'

export class DynamicInputParser {

    public parse(input: string): IParsedElement[] {
        const rows = input.split('\n')

        return rows
            .filter(row => row.trim().length)
            .map(row => {
                const type = this.parseElementType(row)

                if (type === 'label') {
                    return parseLabel(row)
                }
                else if (type === 'text') {
                    return parseText(row)
                }
                else if (type === 'submit') {
                    return parseSubmit(row)
                }
                else {
                    return {
                        createComponent: UnknownComponent,
                        name: row,
                        valueExpression: `Неизвестный тип ${type}`,
                    }
                }

            })
    }

    private parseElementType(row: string) {
        const parsed = row.match(/^\s*\w+/)

        return parsed ? parsed[0].trim() : 'unknown'
    }
}

