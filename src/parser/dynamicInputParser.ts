import { IParsedElement } from '@types'
import { createTextComponent } from './createTextComponent'

export class DynamicInputParser {
    // private inputTypes: string

    public parse(input: string): IParsedElement[] {
        return [{
            createComponent: createTextComponent,
            name: 'NAME',
            value: '',
        }]
    }
}

