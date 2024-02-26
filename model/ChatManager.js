/**
 * Representation of a Chat that contain Contacts
 */
export class ChatManager {
    /**
     * @param {Array.<Contact>} contacts Array of Contact objects.
     */
    constructor(){
        this.contacts = []
        this.messages = []    
    }

    /**
     * Calls the API for fetching new messages and contacts
     */
    async refresh(){
        let response = await fetch("http://uwu-guate.site:3000/messages", 
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const messages = await response.json()
        // console.log(messages)

        this.contacts = this.updateContacts(messages)
        this.messages = this.updateMessages(messages)
        //console.log(this.contacts)
        //console.log(this.messages)
    }
    
    /**
     * Retrieves all unique users participating in the chat.
     * @param {Array} params API data Object
     */
    updateContacts (params) {
        // Fetching al messages user and then just getting the unique names.
        return params
            .map( message => message[1])
            .filter( (contactName, i, self) => { return i == self.indexOf(contactName)})
    }

    /**
     * Retrieves all messages in a chat. 
     * @param {Array} params API data object
     * @returns 
     */
    updateMessages (params) {
        let messages = []
        params.forEach(element => {
            messages.unshift (new Message( element[0], element[1], element[2]))
        });
        return messages
    }

    async sendMessage (username, message){
        fetch("http://uwu-guate.site:3000/messages", {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'message': message
            }),
            headers: { "Content-type" : "application/json; chartset=UTF-8" }
        })
    }
}

/**
 * Representation of a message entity
 */
export class Message {
    constructor(id, author, text){
        this.id = id
        this.author = author
        this.text = text
    }
}
