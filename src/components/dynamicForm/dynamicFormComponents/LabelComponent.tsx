import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const LabelComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ value, name }) =>
    <label key={name}>{value}</label>
