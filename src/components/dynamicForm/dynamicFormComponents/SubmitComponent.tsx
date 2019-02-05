import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const SubmitComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ value }) =>
    <input key={value} type='submit' value={value} />
