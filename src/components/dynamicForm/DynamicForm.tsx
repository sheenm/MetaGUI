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
                {elements.map(({ createComponent, name, valueExpression: value }) => createComponent({ name, value, onChange: this.onElementChange(name) }))}
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
    }
)
