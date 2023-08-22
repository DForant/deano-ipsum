import { useState } from 'react'
import ipsums from './data'
import './scss/app.scss'
import {HiOutlineClipboardDocument} from 'react-icons/hi2'
import {ToastContainer, toast, Zoom} from 'react-toastify'

function App() {
  const [activeIpsum, setActiveIpsum] = useState(0)
  const [size, setSize] = useState('small')
  const [paragraphs, setParagraphs] = useState(1)
  const [ipsumResult, setIpsumResult] = useState([])
  const [isIpsumGenerated, setIsIpsumGenerated] = useState(false)
  const [allowParagraphs, setAllowParagraphs] = useState(false)

  const buildParagraph = (currentIpsum) => {
    let paragraph = ''
    let sentences = 0
    let i=0

    switch(size){
      case 'small':
        sentences = 3
        break
      case 'med':
        sentences = 6
        break
      case 'large':
        sentences = 9
        break
      case 'extra-large':
        sentences = 20
        break
    }

    while (i < sentences){
        paragraph = paragraph + getSentence(currentIpsum) 
        i++
      }
      paragraph = paragraph.substring(0, paragraph.length-1)
      paragraph = allowParagraphs?'<p>'+paragraph+'</p>':paragraph

      return paragraph
  }

  const getSentence = (currentIpsum) =>{
    let i = 0
    let randomNumber = 0
    let sentence=''

    if(currentIpsum.name === 'Binary'){
      while (i < 8){
        for (let i=0; i<8; i++){
          randomNumber = Math.floor(Math.random()*currentIpsum.sentences.length)
          sentence= sentence+currentIpsum.sentences[randomNumber]
        }
        sentence = sentence + ' '
        i++
      }
    }
    else if (currentIpsum.name === 'Groot'){
      while (i < 8){
        randomNumber = Math.floor(Math.random()*currentIpsum.sentences.length)
        sentence = sentence + ` ${currentIpsum.sentences[randomNumber]}`
        i++
      }

    }
    else{
      randomNumber = Math.floor(Math.random()*currentIpsum.sentences.length)
      sentence = currentIpsum.sentences[randomNumber]
    }

    return sentence+'\n'

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
          <label htmlFor='size'>Paragraph Size</label>
          <select id='size' name='size' onChange={(e) => setSize(e.target.value)}>
            <option value='small'>Small</option>
            <option value='med'>Medium</option>
            <option value='large'>Large</option>
            <option value='extra-large'>Extra Large</option>
          </select> 
        </fieldset>
        <fieldset>
          <label htmlFor='includePTags'>Include paragraph(&lt;p&gt;) tags?</label>
          <input type='checkbox' id='allowHtml' name='allowHtml' onChange={() => setAllowParagraphs(!allowParagraphs)}/>
        </fieldset>
        <div>
          <button type='submit' className='btn'>Get Ipsum</button>
        </div>
        
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
