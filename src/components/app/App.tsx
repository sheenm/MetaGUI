import * as React from 'react'
import injectSheet from 'react-jss'


interface IProps {
    classes: { app: string }
}

const styles = {
    app: {
        display: 'flex',
        'flex-direction': 'row',
    }
}

const appComponent = ({ classes }: IProps) => <div className={classes.app} />

export const App = injectSheet(styles)(appComponent)

