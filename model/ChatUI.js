import { COLORS, FONT_TEXT, IMPORTANT_TEXT} from '../StyleConstants.js'
import { ChatManager } from './ChatManager.js'
import {objectToStyle, objectToAttr, createHtmlElement, appendHtmlElement} from './DOMHelpers.js'

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
    constructor(timeout, contactsContainer, messagesContainer, TextArea, SendButton, ChatManager){
        this.timeout = timeout
        this.contactsContainer = contactsContainer
        this.messagesContainer = messagesContainer
        this.TextArea = TextArea
        this.SendButton = SendButton,
        this.ChatManager = ChatManager
    }

    start (){
        this.ChatManager.refresh()
        setTimeout(()=>{ 
            this.refreshUI()
        }
            , 2000)
    }

    refreshUI(){
        this.contactsContainer.innerHTML = ''
        this.messagesContainer.innerHTML = ''
        this.ChatManager.refresh()
        this.insertContact()
    }
    
    insertContact(){
        // console.log(this.ChatManager.contacts)
        this.ChatManager.contacts.forEach(contactName => {
            let contact = createHtmlElement('div', this.contactsContainer, contactName) 
            contact.style = objectToStyle({
                'background-color': COLORS.primary_dark,
                'box-sizing': 'border-box',
                color : COLORS.on_primary,
                ...IMPORTANT_TEXT,
                width : '100%',
                padding : '2ch',
                'margin-bottom' : '3ch',
                'border-radius' : '1ch'
            })
        });
    }
    
    insertMessage(){

    }

}