import {objectToStyle, objectToAttr, createHtmlElement, appendHtmlElement} from './DOMHelpers.js'

const COLORS = {
    background : '#ece5dd',
    white : '#ffffff',
    white_dark : '#e1e6e2',
    on_background : '#000000',
    primary : '#128c7e',
    primary_dark : '#075E54',
    on_primary : '#ffffff',
    extern_message : '#ffffff',
    intern_message : '#dcf8c6'
}

const FONT = {
    
}

const STRINGS = {
    username : 'Smaugthur'
}

// ============
// =   HTML
// ============

const SIDEBAR = createHtmlElement('div', document.body)
    const CONTACTS= createHtmlElement('div', SIDEBAR)
    const PROFILE = createHtmlElement('div', SIDEBAR)
        const PROFILE_PHOTO  = createHtmlElement('img', PROFILE)
            objectToAttr(PROFILE_PHOTO, {src : './assets/photos/avatar.jpg'})
        const USER = createHtmlElement('span', PROFILE, STRINGS.username)

const CHAT = createHtmlElement('div', document.body)
    const MESSAGES = createHtmlElement('div', CHAT)
    const INPUT_BOX = createHtmlElement('div', CHAT)

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
        'grid-row':  '2',
    }
)

