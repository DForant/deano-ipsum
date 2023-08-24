export const buildParagraph = (allowParagraphs, size, currentIpsum) => {
  let paragraph = ''
  let sentences = 3
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

export const getSentence = (currentIpsum) =>{
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