import { IDynamicFormComponentCreatorProps } from '@types'
import * as React from 'react'

export const TextComponent: React.SFC<IDynamicFormComponentCreatorProps> = ({ name, onChange, value }) =>
    <input key={name} type='text' name={name} onChange={createOnChangeEventListener(onChange)} value={value} disabled={value != null} />


const createOnChangeEventListener = (onChange: (newValue: string) => void) =>
    ({ target }: React.ChangeEvent<HTMLInputElement>) => onChange(target.value)

