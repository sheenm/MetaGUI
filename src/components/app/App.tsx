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
        'flex-direction': 'column',
        margin: '0 auto 0',
        'max-width': '500px'
    },
    input: {
        'margin-bottom': '15px',
        resize: 'none',
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
            <textarea onChange={this.onTextAreaChange} className={classes.input} rows={10} autoFocus={true} />
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

