/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.wordsArr = words.filter(c => c !== "");
    this.obj = {};
    this.makeChains();
    this.makeText();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // adds each unique word in text as a key in this.obj object
    this.wordsArr.forEach(word => {
      this.obj[word] = []
    });

    // starting at the 2nd word in the text, this loop pushes the currentWord
    // into the this.obj as a value using the prior word as the key
    for (let i = 1; i < this.wordsArr.length; i++) {
      let priorIdx = i - 1;
      let priorWord = this.wordsArr[priorIdx];
      let currentWord = this.wordsArr[i];
    
      this.obj[priorWord].push(currentWord);
    }

    // pushes 'null' as value for the last word of text, since no words follow the last word
    const lastWord = this.wordsArr[this.wordsArr.length-1]
    this.obj[lastWord].push(null);

    console.log(this.obj);
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let newPhraseArr = [];

    // randomly selects first word
    let arrOfKeys = Object.keys(this.obj);
    let randomIdx = Math.floor(Math.random() * arrOfKeys.length);
    let startingWord = arrOfKeys[randomIdx];

    newPhraseArr.push(startingWord);
    console.log(newPhraseArr);

    // randomly selects a nextWord from the list of possible words that follow
    // adds this word to the newPhraseArr and checks if this word === null. If so, the loop stops
    // if not, this loop continues until the new phrase length equals the numWords param passed in
    for (let i = 1; i <= numWords; i++) {
      let priorWord = newPhraseArr[i-1];

      let nextPossibleWords = this.obj[priorWord];
      let randomIdx2 = Math.floor(Math.random() * nextPossibleWords.length);
      let nextWord = nextPossibleWords[randomIdx2];

      newPhraseArr.push(nextWord);
      
      if (nextWord === null) {
        break
      }
    }
    console.log(newPhraseArr.join(' '));
  }
}

let mm = new MarkovMachine("the cat in the hat is in the hat");
