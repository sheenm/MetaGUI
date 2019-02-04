import * as React from 'react'
import injectSheet from 'react-jss'
import { DynamicForm } from '../dynamicForm/DynamicForm'


interface IProps {
    classes: { app: string, input: string }
}

interface IState {
    input: string
}

const styles = {
    app: {
        display: 'flex',
        'flex-direction': 'row',
    },
    input: {
        'border-right': '1px solid #eee'
    }
}

export class AppComponent extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { input: '' }
    }

    public render() {
        const { classes } = this.props

        return <div className={classes.app}>
            <div className={classes.input}>
                <textarea onChange={this.onTextAreaChange} />
            </div>
            <DynamicForm input={this.state.input} />
        </div>
    }

    private onTextAreaChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            input: target.value
        })
    }
}


export const App = injectSheet(styles)(AppComponent)

