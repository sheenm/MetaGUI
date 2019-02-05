export class DynamicFormRepository {
    public submitDynamicForm(data: Map<string, string>) {

        const sendObject: any = {}
        for (const property of data.entries()) {
            sendObject[property[0]] = property[1]
        }

        fetch('', {
            body: JSON.stringify(sendObject),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
            .catch(error => alert(error))

    }
}
