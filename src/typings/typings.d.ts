declare module '@types' {
    interface IParsedElement {
        name: string
        createComponent: React.SFC<IDynamicFormComponentCreatorProps>
        valueExpression?: string
    }

    interface IDynamicFormComponentCreatorProps {
        name: string,
        value?: string,
        onChange: (newValue: string) => void
    }
}
