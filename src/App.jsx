import {bidenIpsum, bostonianIpsum, conservativeIpsum, cowboyIpsum, gamerIpsum, geekIpsum,
        harryPotterIpsum, hockeyIpsum, liberalIpsum, newYorkerIpsum, pirateIpsum, rastaIpsum,
        starWarsIpsum, surferIpsum, trumpIpsum} from './data'
import { useState } from 'react'

function App() {
  const [generator, setgenerator] = useState('')
  const [sentances, setSentances] = useState(0)
  const [paragraphs, setParagraphs] = useState(0)
  const [ipsumResult, setIpsumResult] = useState([])

  return (
    <main>
      <section className='section-center'>
        <h4 className='title'>Deano Ipsum</h4>
        <div className='title-underline' style={{width: '12rem'}}></div>

        <form className='lorem-form'>

          <label htmlFor='generator'>Select a generator:</label>


          <label htmlFor='paragrsaphs'>How Many Paragraphs</label>
          <input type='number' min='1' max='10' step='1'/>
        </form>

      </section>
    </main>
  )
}

export default App
