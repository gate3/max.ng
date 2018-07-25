const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
function decodeMorse(morseCode) {
  // Your code should go here.
  if(morseCode === ''){
    return morseCode
  }

  if(typeof morseCode !== 'string'){
    throw new Error('Invalid input')
  }

  // Split the provided string into words using three spaces
  const splitWords = morseCode.split('   ')
  
  /**
   * 
   * @param {string} word the morse word to convert to readable
   * 
   * Split each word into single characters and get the english readable version to form a new string 
   */
  const formWordFromCharacters = (word) => {
    const chars = word.split(' ')
    return chars.map(s=>MORSE_CODE[s]).join('')
  }
  let readable = ''
  //Loop through the words and call the function to form the human readable string
  for(let i = 0; i < splitWords.length; i++){
    if(splitWords[i] === MORSE_CODE["...---..."]){
      continue
    }

    readable += formWordFromCharacters(splitWords[i])
    readable += ' '
  }
  return readable.trim()
}

module.exports = decodeMorse;
