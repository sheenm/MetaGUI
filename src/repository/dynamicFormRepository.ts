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
            .then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    return response.json()
                }

                throw new Error((`error ${response.status}`))

            })
            .catch(error => alert(error))

    }
}
