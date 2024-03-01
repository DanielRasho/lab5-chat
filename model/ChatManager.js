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
        this.cacheMessages = []
        this.LINK_PREVIEW_KEY = '390ed3399463b57cc25616015bccf600'
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
        const messagesObject = await response.json()
        const messages = messagesObject

        this.contacts = this.updateContacts(messages)
        this.messages = this.messages.concat(await this.updateMessages(messages))
        
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
    async updateMessages (params) {

        // Getting new messages
        let newMessages = params.slice(this.cacheMessages.length)
        console.log(newMessages);


        this.cacheMessages = this.cacheMessages.concat(newMessages)

        // Rendering new messages
        let messages = []
        for (const message of newMessages) {
            messages.push( new Message( 
                    message.id, 
                    message.username, 
                    message.content,
                    await this.getEmbedContent(message.content)
                )
            )
        }
        return messages
    }

    async getEmbedContent (message) {
        const urlRegex = new RegExp(/(http|https|ftp):[\w?\/\.=\%_\-\?\&]+/, 'g');
        const isImage = (url) => /\.(jpg|jpeg|png|webp|avif|gif|svg)[\?\w=\w\.]*$/.test(url);
        
        // matchAll return an array of mathing elements, picking the first one since 
        // the last is trivial
        let urlsFoundInMessage = [...message.matchAll(urlRegex)].map(m => m[0])

        let embedContents = [];
        for (const url of urlsFoundInMessage) {
            let type;
            if (isImage(url)) {
                type = EMBED_TYPES.IMG;
                embedContents.push(new EmbedContent(type, url));
            } else {
                type = EMBED_TYPES.URL;
                let urlInfo = await this.fetchOGData(url);
                embedContents.push(new EmbedContent(
                    type,
                    url,
                    urlInfo.title,
                    urlInfo.image,
                    urlInfo.description
                ));
            }
        }

        return embedContents
    }

    async fetchOGData(siteUrl){
        console.log("hellow");
        const requestURL = `https://api.linkpreview.net/?fields=image_x,icon_type,locale&q=${siteUrl}`
        const webPage = await fetch(requestURL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'X-Linkpreview-Api-Key': this.LINK_PREVIEW_KEY}
        }) 
        const urlInfo = await webPage.json()
        return urlInfo
        //const dummy = '{"title":"Title","description":"Esto es una descripcion","image":"https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGxjNzl6a2E4ZWxrczRqazlwOXU3b2JhMWp3emhiajNmN3dqcW1qeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XD16Yi4PaP6s67JSaQ/giphy.gif","url":"youtube.com"}'
        //return JSON.parse(dummy)
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
    constructor(type, url, ogTitle = undefined, ogImage = undefined, ogDescription = undefined){
        this.type = type
        this.url = url
        this.ogTitle = ogTitle
        this.ogImage = ogImage
        this.ogDescription = ogDescription
    }
}

export const EMBED_TYPES = Object.freeze({
    IMG : 'IMG',
    URL : 'URL'
})

