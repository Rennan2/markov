/** Textual markov chain generator using bigrams */

class MarkovMachine {
    /** build markov machine */
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c!== "");
        this.makeChains();
    }
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        let chains = new Map();

        for (let i = 0; i < this.words.length - 1; i++) {
            let bigram = this.words[i] + " " + this.words[i + 1];
            let nextWord = this.words[i + 2] || null;

            if (chains.has(bigram)) chains.get(bigram).push(nextWord);
            else chains.set(bigram, [nextWord]);

        }
        this.chains = chains;
    }
    /** pick random from array */
    choice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    /** random text from chain */
    makeText(numWords = 100) {
        let keys = Array.from(this.chains.keys());
        let key = this.choice(keys);
        let out = [];

        while (out.length < numWords && key!== null) {
            let [word1, word2] = key.split(" ");
            out.push(word1);
            key = word2 + " " + this.choice(this.chains.get(key));
        }
        return out.join(" ");


    }
}

module.exports = {
    MarkovMachine,
};