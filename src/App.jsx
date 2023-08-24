import ipsums from './data'
import './scss/app.scss'
import {HiOutlineClipboardDocument} from 'react-icons/hi2'
import {ToastContainer, Zoom} from 'react-toastify'
import { useGlobalContext } from './context'

function App() {
  const {
    paragraphs,
    setParagraphs,
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
  } = useGlobalContext()

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
          <label htmlFor='includePTags'>Include paragraph(&lt;p&gt;) tags?</label>
          <input type='checkbox' id='allowHtml' name='allowHtml' onChange={() => setAllowParagraphs(!allowParagraphs)}/>
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
