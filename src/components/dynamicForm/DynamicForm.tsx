import * as React from 'react'
import injectSheet from 'react-jss'
import { DynamicInputParser } from '../../parser/dynamicInputParser'
import { valueExpressionParser } from '../../parser/valueExpressionParser'
import { DynamicFormRepository } from '../../repository/dynamicFormRepository'

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

            return <form className={this.props.classes.dynamicForm} onSubmit={this.submit}>
                {elements.map(({ createComponent, name, value, isExpression }) =>
                    createComponent({ name, value: this.getValue(value, isExpression), onChange: this.onElementChange(name) }))}
            </form>
        }

        private submit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const repository = new DynamicFormRepository()
            repository.submitDynamicForm(this.state.values)
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

            const parts = valueExpressionParser.getParts(value)
            const updatedParts = parts.map(part => {
                const stateValue = values.get(part.trim())

                return stateValue || valueExpressionParser.parsePart(part)
            })

            return updatedParts.join('')
        }
    }
)
