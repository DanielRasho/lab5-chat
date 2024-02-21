import {objectToStyle, objectToAttr, createHtmlElement, appendHtmlElement} from './model/DOMHelpers.js'
import { COLORS, FONT_TEXT, STRINGS } from './StyleConstants.js'


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
    const MESSAGES = createHtmlElement('div', CHAT)
    const INPUT_BOX = createHtmlElement('div', CHAT)
        const TEXT_AREA = createHtmlElement('textarea', INPUT_BOX)
            objectToAttr(TEXT_AREA, {placeholder: STRINGS.chat_placeholder})
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
        overflow : 'scroll'
    }
)

CONTACTS.style = objectToStyle(
    {
        'grid-row':  '1',
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
        'grid-template-rows': '1fr 10ch',
    }
)

MESSAGES.style = objectToStyle(
    {
        'grid-row':  '1',
    }
)    

INPUT_BOX.style = objectToStyle(
    {
        'background-color':  COLORS.white,
        padding: '2ch 3ch',
        'grid-row':  '2',
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
        width : '6ch',
        height : '6ch',
        'margin-left' : '3ch'
    }
)