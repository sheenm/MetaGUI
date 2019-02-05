import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const SubmitComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ value, name }) =>
    <input key={name} type='submit' value={value} />
