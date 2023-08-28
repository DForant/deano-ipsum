import {createContext, useState, useContext, useReducer} from 'react'
import ipsums from './data'
import reducer from './reducer'
import { buildParagraph } from './ParagraphGen'
import {toast} from 'react-toastify'
import {
    ALLOW_P_TAGS,
    SET_ACTIVE_IPSUM,
    SET_NBR_PARAGRAPHS,
    SET_PARAGRAPH_SIZE,
    GET_IPSUM_RESULT,
    IS_IPSUM_GENERATED
} from './actions'

const AppContext = createContext()

const initialState = {
    activeIpsum: 0,
    size: 'small',
    paragraphs: 1,
    allowPTags: false,
    isIpsumGenerated: false,
    ipsumResult: []
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const setActiveIpsum = (id) => {
        dispatch(
            {type: SET_ACTIVE_IPSUM, payload: {id}}
        )
    }

    const setParagraphs = (nbr) => {
        dispatch(
            {type: SET_NBR_PARAGRAPHS, payload: {nbr}}
        )
    }

    const setAllowParagraphs = () => {
        dispatch(
            {type: ALLOW_P_TAGS}
        )
    }

    const setSize = (size) => {
        dispatch(
            {type: SET_PARAGRAPH_SIZE, payload: {size}}
        )
    }

    const setIpsumResult = (result) => {
        dispatch(
            {type: GET_IPSUM_RESULT, payload: {result}}
        )
    }

    const setIsIpsumGenerated = (isGenerated) => {
        dispatch(
            {type: IS_IPSUM_GENERATED, payload: {isGenerated}}
        )
    }

    const saveToClipboard = () => {
        let copyText = ''

        state.ipsumResult.map((text,index) => {
            copyText+=text
        }) 

        if(navigator.clipboard){
            try{
                navigator.clipboard.writeText(copyText)
                toast.success('Ipsum text copied to clipboard')
            } catch(err){
                toast.error('failed to copy to clipboad')
                console.log(err)
            }
        } else {
            toast.error('Clipboard access not available. Manually select text in textarea.')
        }

    } 
    
    const buildIpsum = () => {
        const currentIpsum = ipsums.find(ipsum => ipsum.id == state.activeIpsum)
        const newIpsum = []
        let i = 0
        while (i < state.paragraphs){
            newIpsum.push(buildParagraph(state.allowPTags, state.size, currentIpsum))
            i++
        }
        setIpsumResult(newIpsum)
    }    
    
    return(
        <AppContext.Provider
            value={{
                ...state,
                setParagraphs,
                setSize,
                setIpsumResult,
                setActiveIpsum, 
                setAllowParagraphs, 
                saveToClipboard,
                setIsIpsumGenerated,
                buildIpsum
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}