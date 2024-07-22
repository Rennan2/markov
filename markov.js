/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      let word = this.words[i];
      if (!chains[word]) chains[word] = [];
      chains[word].push(this.words[i + 1]);
    }
    chains[this.words[this.words.length - 1]] = null;
    this.chains = chains;
    
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // random key
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.randomChoice(keys);
    let out = [];

    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains(key));
    } 
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};