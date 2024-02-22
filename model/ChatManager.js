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

    async refresh(){
        let response = await fetch("https://jsonplaceholder.typicode.com/posts", 
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const messages = await response.json()
        // console.log(messages)

        this.contacts = this.fetchContacts(messages)
        this.messages = this.constructMessages(messages)
        //console.log(this.contacts)
        //console.log(this.messages)
    }
    
    /**
     * 
     * @param {Array} params 
     */
    fetchContacts (params) {
        // Fetching al messages user and then just getting the unique names.
        return params
            .map( message => message.userId)
            .filter( (contactName, i, self) => { return i == self.indexOf(contactName)})
    }

    constructMessages (params) {
        let messages = []
        params.forEach(element => {
            messages.push (new Message( element.id, element.userId, element.body))
        });
        return messages
    }

    sendMessage (){

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
