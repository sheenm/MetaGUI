import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const UnknownComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ value, name }) =>
    <span key={name}>Ошибка синтаксиса: {value}</span>
