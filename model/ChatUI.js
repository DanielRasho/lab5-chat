import { COLORS, FONT_TEXT, IMPORTANT_TEXT} from '../StyleConstants.js'
import { ChatManager, EMBED_TYPES, EmbedContent } from './ChatManager.js'
import {objectToStyle, objectToAttr, createHtmlElement, appendHtmlElement} from './DOMHelpers.js'

/**
 * A class for controling and updatading the UI
 */
export class ChatUI{

    /**
     * 
     * @param {int} timeout 
     * @param {HTMLElement} contactsContainer 
     * @param {HTMLElement} messagesContainer 
     * @param {HTMLElement} TextArea 
     * @param {HTMLElement} SendButton 
     * @param {ChatManager} ChatManager 
     */
    constructor(timeout, username, contactsContainer, messagesContainer, TextArea, SendButton, ChatManager){
        this.timeout = timeout
        this.username = username
        this.refreshIntervalID = undefined
        this.contactsContainer = contactsContainer
        this.messagesContainer = messagesContainer
        this.TextArea = TextArea
        this.SendButton = SendButton,
        this.ChatManager = ChatManager
    }

    /**
     * Let class start to check every given timeout if there is new data on server 
     * and update de DOM
     */
    start (){
//        this.refreshIntervalID = setInterval(()=> {
//            this.refreshUI()
//            console.log("Hellow world");
//1        }, this.timeout)
        this.refreshUI()
    }

    /**
     * Resets Containers in the DOM and append new fresh data from server.
     */
    async refreshUI(){
        await this.ChatManager.refresh()
        this.contactsContainer.innerHTML = ''
        this.messagesContainer.innerHTML = ''
        this.insertContact()
        this.insertMessage()
    }
    
    /**
     * Check for all contacts in Chat Manager and inserts them into the DOM.
     */
    insertContact(){
        // console.log(this.ChatManager.contacts)
        this.ChatManager.contacts.forEach(contactName => {
            let contact = createHtmlElement('div', this.contactsContainer) 
            contact.style = objectToStyle({
                'background-color': COLORS.primary_dark,
                'box-sizing': 'border-box',
                color : COLORS.on_primary,
                width : '100%',
                height: '7ch',
                padding : '2ch',
                'margin-bottom' : '3ch',
                'border-radius' : '1ch',
                display: 'flex',
                'justify-items': 'center',
            })

            let profile_photo = createHtmlElement('img', contact)
                objectToAttr(profile_photo, {src: './assets/photos/avatar.jpg'})
                profile_photo.style = objectToStyle(
                    {
                        height: '100%', 
                        'border-radius': '50%',
                        'margin-right' : '2ch'
                    }
                )

            let profile_text = createHtmlElement('span', contact, contactName)
                profile_text.style = objectToStyle(
                    {
                        color: COLORS.on_primary,
                        ...IMPORTANT_TEXT,
                    }
                )
        });
    }
    
    /**
     * Check for all messages in Chat Manager and inserts them into the DOM.
     */
    insertMessage(){
        this.ChatManager.messages.forEach(msg => {
            
            let message_container = createHtmlElement('div', this.messagesContainer)
                let message = createHtmlElement('div', message_container) 
                    let message_author = createHtmlElement('div', message, msg.author === this.username ? '' : msg.author)
                    let message_text = createHtmlElement('div', message, msg.text)
                    let embed_content = createHtmlElement('div', message, '')
            this.appendEmbedContent(embed_content, msg.embeds)

            message_container.style = objectToStyle({
                    width: '100%',
                    overflow: 'hidden',
                    height: 'auto',
            })

            message.style = objectToStyle({
                'box-sizing': 'border-box',
                'background-color': msg.author === this.username ? COLORS.intern_message : COLORS.extern_message,
                'margin-left': msg.author === this.username ? 'auto' : '0',
                'margin-bottom' : '3ch',
                color : COLORS.on_background,

                width : '40vw',
                padding : '2ch',
                height: 'auto',

                'border-radius' : '0.5ch',
            })
            message_author.style = objectToStyle({
                ...IMPORTANT_TEXT,
            })

            message_text.style = objectToStyle({
                ...FONT_TEXT,
                with : '100%',
                'word-break': 'break-word'
            })
            
        })
    }
   
    /**
     * 
     * @param {HTMLElement} parent 
     * @param {Array.<EmbedContent>} embed 
     */
    appendEmbedContent(parent, embeds){
        embeds.forEach(embed => {
            let embedElement
            if(embed.type == EMBED_TYPES.IMG){
                embedElement = createHtmlElement('img', parent)
                objectToAttr(embedElement, {src : embed.url})
                embedElement.style = objectToStyle({
                    width: "100%", 
                    'margin': '2ch 0'})
            }
            else if(embed.type == EMBED_TYPES.YT_VIDEO){

            }
            else{
                
            }
       }); 
    }
    
    sendMessage(){
        
    }

}