import {objectToStyle, objectToAttr, createHtmlElement, appendHtmlElement} from './model/DOMHelpers.js'
import { COLORS, FONT_TEXT, STRINGS } from './StyleConstants.js'
import { ChatManager } from './model/ChatManager.js'
import { ChatUI } from './model/ChatUI.js'


// ============
// =   HTML
// ============

const SIDEBAR = createHtmlElement('div', document.body)
    const CONTACTS= createHtmlElement('div', SIDEBAR)
    const PROFILE = createHtmlElement('div', SIDEBAR)
        const PROFILE_PHOTO  = createHtmlElement('img', PROFILE)
            objectToAttr(PROFILE_PHOTO, {src : './assets/photos/avatar.jpg'})
        const USERNAME = createHtmlElement('span', PROFILE, STRINGS.username)

const CHAT = createHtmlElement('div', document.body)
    const CONTACT = createHtmlElement('div', CHAT)
        const CONTACT_PHOTO  = createHtmlElement('img', CONTACT)
            objectToAttr(CONTACT_PHOTO, {src : './assets/photos/avatar.jpg'})
        const CONTACT_NAME = createHtmlElement('span', CONTACT, STRINGS.groupname)
    const MESSAGES = createHtmlElement('div', CHAT)
    const INPUT_BOX = createHtmlElement('div', CHAT)
        const TEXT_AREA = createHtmlElement('textarea', INPUT_BOX)
            objectToAttr(TEXT_AREA, {placeholder: STRINGS.chat_placeholder, maxlength:'140'})
        const SEND_BUTTON = createHtmlElement('button', INPUT_BOX)
            const SEND_ICON_BUTTON = createHtmlElement('i', SEND_BUTTON)
                objectToAttr(SEND_ICON_BUTTON, {
                    class : 'fa-solid fa-paper-plane fa-rotate-by',
                    style : `color: ${COLORS.white}; font-size: 1.2rem ; --fa-rotate-by: 20deg;`
                })

// ============
// = STYLES 
// ============
document.body.style = objectToStyle(
    {
        margin : '0',
        'background-color': COLORS.background,
        display: 'grid',
        'grid-template-columns': '40ch 1fr',
        height: '100vh',
        width:'100%'
    }
)

SIDEBAR.style = objectToStyle(
    { 
        'background-color':  COLORS.white,
        display : 'grid',
        'grid-template-columns': '1fr',
        'grid-template-rows': '1fr 10ch',
    }
)

CONTACTS.style = objectToStyle(
    {
        'grid-row':  '1',
        height: '85vh',
        padding : '2ch',
        overflow: 'scroll'
        
    }
)

PROFILE.style = objectToStyle(
    {
        'background-color':  COLORS.primary,
        padding: '2ch 3ch',
        'grid-row':  '2',
        overflow: 'hidden',
        display: 'flex',
        'align-items' : 'center'
    }
)

USERNAME.style = objectToStyle(
    {
        ...FONT_TEXT,
        'font-size' : '1.3rem',
        color : COLORS.on_primary,
        'margin-left' : '2ch'
    }
)

PROFILE_PHOTO.style = objectToStyle(
    {
        height : '100%',
        'border-radius': '50%'
    }
)

CHAT.style = objectToStyle(
    { 
        display : 'grid',
        'grid-template-columns': '1fr',
        'grid-template-rows': '10ch 1fr 10ch',
    }
)

CONTACT.style = objectToStyle(
    {
        'grid-row':  '1',
        'background-color':  COLORS.primary,
        padding: '2ch 3ch',
        overflow: 'hidden',
        display: 'flex',
        'align-items' : 'center'
    }
)

CONTACT_PHOTO.style = objectToStyle(
    {
        height : '100%',
        'border-radius': '50%'
    }

)

CONTACT_NAME.style = objectToStyle (
    {
        ...FONT_TEXT,
        'font-size' : '1.3rem',
        color : COLORS.on_primary,
        'margin-left' : '2ch'
    }
)


MESSAGES.style = objectToStyle(
    {
        'grid-row':  '2',
        height : '79vh',
        padding : '0 4ch',
        overflow : 'scroll'
    }
)    

INPUT_BOX.style = objectToStyle(
    {
        'background-color':  COLORS.white,
        padding: '2ch 3ch',
        'grid-row':  '3',
        display: 'flex',
        'align-items': 'center'
    }
)

TEXT_AREA.style = objectToStyle(
    {
        'background-color': COLORS.white_dark,
        border : 'none',
        outline: 'none',
        resize: 'none',
        'border-radius': '1ch',
        'padding': '1ch 2ch', 
        width: '100%',
        ...FONT_TEXT
    }
)

SEND_BUTTON.style = objectToStyle(
    {
        'background-color': COLORS.primary,
        border : 'none',
        outline: 'none',
        'border-radius': '50%',
        cursor : 'pointer',
        'flex-shrink' : '0',
        width : '6ch',
        height : '6ch',
        'margin-left' : '3ch'
    }
)

// ============
// =  LOGIC 
// ============

const AppChatManager = new ChatManager()
const AppChatUI = new ChatUI(3000, 1 ,CONTACTS, MESSAGES, TEXT_AREA, SEND_BUTTON, AppChatManager)

// Start UI functionalities.
AppChatUI.start()
