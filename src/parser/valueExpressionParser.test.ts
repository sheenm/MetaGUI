import { valueExpressionParser } from "./valueExpressionParser"

it('getParts should divide by +', () => {
    const inputString = 'SURNAME + " " + NAME + " Батькович"'
    const expected = [
        'SURNAME',
        '" "',
        'NAME',
        '" Батькович"'
    ]

    const actual = valueExpressionParser.getParts(inputString)

    expect(actual.length).toBe(expected.length)
    for (let i = 0; i < expected.length; i++) {
        expect(actual[i].trim()).toEqual(expected[i].trim())
    }
})

it('getParts should divide by + when has plus sign in quotes', () => {
    const inputString = 'SURNAME + " + " + NAME + " Батькович"'
    const expected = [
        'SURNAME',
        '" + "',
        'NAME',
        '" Батькович"'
    ]

    const actual = valueExpressionParser.getParts(inputString)

    expect(actual.length).toBe(expected.length)
    for (let i = 0; i < expected.length; i++) {
        expect(actual[i].trim()).toEqual(expected[i].trim())
    }
})
