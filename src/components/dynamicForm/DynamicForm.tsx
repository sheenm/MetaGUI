import * as React from 'react'
import { DynamicInputParser } from 'src/parser/dynamicInputParser'

interface IProps {
    input: string
}

interface IState {
    // - значения элементов на форме по имени
    values: Map<string, string>
}

export class DynamicForm extends React.Component<IProps, IState> {

    private parser: DynamicInputParser

    constructor(props: IProps) {
        super(props)

        this.parser = new DynamicInputParser()
        this.state = { values: new Map<string, string>() }

    }

    public render() {
        const elements = this.parser.parse(this.props.input)

        return elements.map(({ createComponent, name, value }) => createComponent({ name, value, onChange: this.onElementChange(name) }))
    }

    private onElementChange = (name: string) => {
        return (newValue: string) => {
            const newValues = new Map(this.state.values)

            newValues.set(name, newValue)

            this.setState({
                values: newValues
            })
        }
    }
}

