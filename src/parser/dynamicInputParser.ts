import { IParsedElement } from '@types'
import { UnknownComponent } from '../components/dynamicForm/dynamicFormComponents/UnknownComponent'
import { parseLabel } from './labelParser'
import { parseSubmit } from './submitInputParser'
import { parseText } from './textParser'

export class DynamicInputParser {
    private parsers = new Map<string, (str: string) => IParsedElement>()

    constructor() {
        this.initParsers()
    }

    public parse(input: string): IParsedElement[] {
        const rows = input.split('\n')

        return rows
            .filter(row => row.trim().length)
            .map(row => {
                const type = this.parseElementType(row)
                const parseFunction = this.parsers.get(type)

                if (parseFunction) {
                    return parseFunction(row)
                }
                else {
                    return {
                        createComponent: UnknownComponent,
                        name: row,
                        value: `Неизвестный тип ${type}`,
                    }
                }

            })
    }

    private parseElementType(row: string) {
        const parsed = row.match(/^\s*\w+/)

        return parsed ? parsed[0].trim() : 'unknown'
    }

    private initParsers() {
        this.parsers.set('label', parseLabel)
        this.parsers.set('text', parseText)
        this.parsers.set('submit', parseSubmit)
    }
}
