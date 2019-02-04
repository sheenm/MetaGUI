import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const createTextComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ name, onChange, value }) =>
    <input type='text' name={name} onChange={createOnChangeEventListener(onChange)} />


const createOnChangeEventListener = (onChange: (newValue: string) => void) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) => onChange(target.value)

