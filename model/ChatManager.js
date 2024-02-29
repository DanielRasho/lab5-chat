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
        let response = await fetch("https://apiweb.programmerscrew.com/public/messages", 
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const messagesObject = await response.json()
        const messages = messagesObject.data
        //console.log(messages)

        this.contacts = this.updateContacts(messages)
        this.messages = this.updateMessages(messages)
    }
    
    /**
     * Retrieves all unique users participating in the chat.
     * @param {Array} params API data Object
     */
    updateContacts (params) {
        // Fetching al messages user and then just getting the unique names.
        return params
            .map( message => message.username)
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
            messages.unshift (new Message( 
                element.id, 
                element.username, 
                element.message,
                this.getEmbedContent(element.message)
                )
            )
        });
        return messages
    }

    getEmbedContent (message) {
        const urlRegex = new RegExp(/(http|https|ftp):[\w?\/\.=\%_\-\?\&]+/, 'g');
        const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)[\?\w=\w\.]*$/.test(url);
        const isYTVideo = (url) => url.includes("www.youtube.com")
        
        // matchAll return an array of mathing elements, picking the first one since 
        // the last is trivial
        let urlsFoundInMessage = [...message.matchAll(urlRegex)].map(m => m[0])

        return urlsFoundInMessage.map( url => {
            let type
            if(isImage(url)) 
                type = EMBED_TYPES.IMG
            else if (isYTVideo(url))
                type = EMBED_TYPES.YT_VIDEO
            else 
                type = EMBED_TYPES.URL
            return new EmbedContent(type, url)
        })
    }

    async sendMessage (username, message){
        fetch("https://apiweb.programmerscrew.com/public/messages", {
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
    /**
     * @param {int} id 
     * @param {string} author 
     * @param {string} text 
     * @param {Array.<EmbedContent>} embeds 
     */
    constructor(id, author, text, embeds){
        this.id = id
        this.author = author
        this.text = text
        this.embeds = embeds
    }
}

/**
 * representation of embed content
 */
export class EmbedContent {
    constructor(type, url){
        this.type = type
        this.url = url
    }
}

export const EMBED_TYPES = Object.freeze({
    IMG : 'IMG',
    YT_VIDEO: 'YT_VIDEO',
    URL : 'URL'
})

