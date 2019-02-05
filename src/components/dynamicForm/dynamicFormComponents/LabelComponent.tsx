import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const LabelComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ value }) =>
    <label key={value}>{value}</label>


