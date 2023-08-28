export const buildParagraph = (allowParagraphs, size, currentIpsum) => {
  let paragraph = ''
  let paragraphLength = 200
  let i=0

  switch(size){
    case 'small':
      paragraphLength = 200
      break
    case 'med':
      paragraphLength = 500
      break
    case 'large':
      paragraphLength = 800
      break
    case 'extra-large':
      paragraphLength = 1100
      break
  }

  for (i = 0; i < paragraphLength; i++){
    if(i < paragraphLength){
      paragraph = paragraph + getSentence(currentIpsum)
    }
      i = paragraph.length
  }
    
    paragraph = allowParagraphs?'<p>'+paragraph+'</p>':paragraph
    if(paragraph.length >= paragraphLength){
      paragraph+='\n'
    }
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

  return sentence+=' '

}