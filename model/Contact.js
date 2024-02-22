import { Message} from "./Message"

/**
 * Representation of a person contact. A contact contain messages.
 */
export class Contact {
    messages = []
   
    /**
     * @param {string} username A contact username
     * @param {Array.<Message>} messages Messages of a contact.
     */
    constructor(id, username, messages){
        this.username = username
        
        if (messages === undefined)
            this.messages = []
        else
            this.messages = messages
    }
}