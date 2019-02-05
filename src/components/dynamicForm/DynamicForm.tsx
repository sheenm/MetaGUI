import * as React from 'react'
import injectSheet from 'react-jss'
import { DynamicInputParser } from '../../parser/dynamicInputParser'

interface IProps {
    input: string
    classes: { dynamicForm: string }
}

interface IState {
    // - значения элементов на форме по имени
    values: Map<string, string>
}

const styles = {
    dynamicForm: {
        display: 'flex',
        'flex-direction': 'column'
    }
}

export const DynamicForm = injectSheet(styles)(
    class DynamicFormComponent extends React.Component<IProps, IState> {

        private parser: DynamicInputParser

        constructor(props: IProps) {
            super(props)

            this.parser = new DynamicInputParser()
            this.state = { values: new Map<string, string>() }

        }

        public render() {
            const elements = this.parser.parse(this.props.input)
            // todo: Необходимо valueExpression -> value переделать чтоб реальо выполнялось экспрессион

            return <form className={this.props.classes.dynamicForm}>
                {elements.map(({ createComponent, name, value, isExpression }) =>
                    createComponent({ name, value: this.getValue(value, isExpression), onChange: this.onElementChange(name) }))}
            </form>
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

        private getValue = (value: string | undefined, isExpression: boolean | undefined) => {
            const { values } = this.state

            if (!isExpression || !value) {
                return value
            }

            const parts = value.split('+')
            const updatedParts = parts.map(part => {
                const stateValue = values.get(part.trim())

                return stateValue || this.parsePart(part)
            })

            return updatedParts.join('')
        }

        private parsePart(part: string) {
            const firstQuoteIndex = part.indexOf('"')
            const lastQuoteIndex = part.lastIndexOf('"')
            // tslint:disable-next-line:no-console
            console.log(part)

            return part.substring(firstQuoteIndex + 1, lastQuoteIndex)
        }
    }
)
