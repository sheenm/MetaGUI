

const getParts = (value: string) => {
    let indexOfLastPlus = 0
    let isQuoteOpened = false
    const parts: string[] = []

    for (let i = 0; i < value.length; i++) {
        if (value[i] === '"') {
            isQuoteOpened = !isQuoteOpened
        }

        if ((value[i] === '+') && !isQuoteOpened) {
            parts.push(value.substring(indexOfLastPlus, i))
            indexOfLastPlus = i + 1
        }
        else if (value.length - 1 === i) {
            parts.push(value.substring(indexOfLastPlus))
        }
    }


    return parts
}

const parsePart = (part: string) => {
    const firstQuoteIndex = part.indexOf('"')
    const lastQuoteIndex = part.lastIndexOf('"')

    return part.substring(firstQuoteIndex + 1, lastQuoteIndex)
}

export const valueExpressionParser = { getParts, parsePart }
