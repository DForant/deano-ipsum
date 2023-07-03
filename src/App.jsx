import { useState } from 'react'
import ipsums from './data'
import {HiOutlineClipboardDocument} from 'react-icons/hi2'
import {ToastContainer, toast, Zoom} from 'react-toastify'

function App() {
  const [activeIpsum, setActiveIpsum] = useState(0)
  const [sentences, setSentences] = useState(1)
  const [paragraphs, setParagraphs] = useState(1)
  const [ipsumResult, setIpsumResult] = useState([])
  const [isIpsumGenerated, setIsIpsumGenerated] = useState(false)
  const [allowParagraphs, setAllowParagraphs] = useState(false)

  const buildParagraph = (currentIpsum) => {
    let randomNumber
    let paragraph = ''
    let i=0
    while (i < sentences){
    randomNumber= Math.floor(Math.random()*currentIpsum.sentences.length)
      paragraph = paragraph + `${currentIpsum.sentences[randomNumber]} ` 
      i++
    }
    paragraph = paragraph.substring(0, paragraph.length-1)
    paragraph = allowParagraphs?'<p>'+paragraph+'</p>':paragraph

    return paragraph
  }

  const buildIpsum = () => {
    const currentIpsum = ipsums.find(ipsum => ipsum.id == activeIpsum)
    const newIpsum = []
    
    let i = 0
    while (i < paragraphs){
      newIpsum.push(buildParagraph(currentIpsum))
      i++
    }

    setIpsumResult(newIpsum)
  }

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

  const handleSubmit =  (e) => {
    e.preventDefault()
    setIpsumResult([])
    if(activeIpsum!=0){
      buildIpsum()
      setIsIpsumGenerated(true)
    } else
    {
      setIsIpsumGenerated(false)
    }
  }

  return (
    <main className='section-center'>
      <h2 className='title'>Deano Ipsum</h2>
      <div className='title-underline' style={{width: '20rem'}}></div>
      <form className='lorem-form' onSubmit={handleSubmit}>
        <select id='ipsum' name='ipsum' onChange={(e) => setActiveIpsum(e.target.value) }>
          <option key='0' value='0' onChange={(e) => setActiveIpsum(e.target.value)}>--Select Ipsum--</option>
          {ipsums.map((item) => {
            return(
              <option key={item.id} value={item.id}>{item.name}</option>
            )
          })}
        </select>
        <fieldset>
          <label htmlFor='paragraphs'>How Many Paragraphs:</label>
          <input id='paragraphs' name='paragraps' type='number' min='1' max='10' step='1' value={paragraphs} onChange={(e) => setParagraphs(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor='sentances'>How Many sentances per paragraph:</label>
          <input id='sentences' name='sentences' type='number' min='1' max='20' step='1' value={sentences} onChange={(e) => setSentences(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor='includePTags'>Include paragraph(&lt;p&gt;) tags?</label>
          <input type='checkbox' id='allowHtml' name='allowHtml' onChange={() => setAllowParagraphs(!allowParagraphs)}/>
        </fieldset>
        <button type='submit' className='btn'>Get Ipsum</button>
      </form>
      {
        (isIpsumGenerated) &&
        <section className='lorem-result-container'>
          <div>
          <button type='button' className='icon' onClick={saveToClipboard}><HiOutlineClipboardDocument/></button>
          </div>
          
          <div className='lorem-text'>
            {ipsumResult.map((item, index) => {
              return(
                <p key={index}>{item}</p>
              )
            })}
          </div>
        </section>
      }
      <ToastContainer position='top-center' transition={Zoom} autoClose={1000} hideProgressBar/>
      
    </main>
  )
}

export default App
