import {createContext, useState, useContext} from 'react'
import ipsums from './data'
import { buildParagraph } from './ParagraphGen'
import {toast} from 'react-toastify'

const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [activeIpsum, setActiveIpsum] = useState(0)    
    const [ipsumResult, setIpsumResult] = useState([])
    const [paragraphs, setParagraphs] = useState(1)
    const [size, setSize] = useState('small')    
    const [allowParagraphs, setAllowParagraphs] = useState(false)
    const [isIpsumGenerated, setIsIpsumGenerated] = useState(false)

    const saveToClipboard = async () => {
        let copyText = ''
        ipsumResult.map((text,index) => {
        copyText+=text
        copyText+=(index!==ipsumResult.length)?'\n': ''
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
            toast.error('Clipboard access not available')
            console.log(navigator.clipboard);
        }

    } 
    
    const buildIpsum = () => {
        const currentIpsum = ipsums.find(ipsum => ipsum.id == activeIpsum)
        const newIpsum = []
        let i = 0
        while (i < paragraphs){
            newIpsum.push(buildParagraph(allowParagraphs, size, currentIpsum))
            i++
        }
        setIpsumResult(newIpsum)
        console.log(newIpsum);
    }    
    
    return(
        <AppContext.Provider
            value={{
                paragraphs,
                setParagraphs,
                size,
                setSize, 
                ipsumResult,
                setIpsumResult,
                activeIpsum,
                setActiveIpsum, 
                allowParagraphs,
                setAllowParagraphs, 
                saveToClipboard,
                isIpsumGenerated,
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