import {keys} from "$data/key-data.js";

// todo shadow vars

const getWordOccurrencesInDmzKeys = (keys) => {
    const dmzKeyTitles =  Object.values(keys).map(key => key.title)
    const words = {}

    for (let keyTitle of dmzKeyTitles) {
        for (let word of keyTitle.split(' ')) {
            word = word.toLowerCase()

            if (words[word]) {
                words[word][0] = words[word][0] + 1
                words[word][1].push(keyTitle)
            } else {
                words[word] = [1, [keyTitle]]
            }
        }
    }

    return words
}

const getUniqueWordsFromKeyTitles = (keys) => {
    const keyOccurrences = getWordOccurrencesInDmzKeys(keys)

    return Object.entries(keyOccurrences).filter(([_, val]) => val[0] === 1)
}

function getNumberOfWordMatches(a, b) {
    let matches = [];

    for ( let i = 0; i < a.length; i++ ) {
        for ( let e = 0; e < b.length; e++ ) {
            if ( a[i] === b[e] ) {
                matches.push( a[i] )
            }
        }
    }
    return matches.length
}

/**
 * Takes an array of words (generally OCR result) and returns the keys in the key-data file it matches by title
 * @param {string[]} words
 * @returns {string[]}
 */
export const getDmzKeysFromWords = (words) => {
    words = words.map(word => word.toLowerCase())
    let playerHasKeys = []

    const uniqueKeys = getUniqueWordsFromKeyTitles(keys)

    for (let key of uniqueKeys) {
        for (let word of words) {
            if (word === key[0]) {
                playerHasKeys.push(key[1][1][0])
            }
        }
    }

    // for all other words we loop through and try our best
    for (let word of words) {
        const wordOccurrencesInDmzKeys = getWordOccurrencesInDmzKeys(keys)
        let highestMatch = [null, 0]
        const dmzKeys = wordOccurrencesInDmzKeys[word]

        if (dmzKeys) {
            for (let key in dmzKeys[1]) {
                const wordsInSpecificKey = dmzKeys[1][key].toLowerCase().split(' ')
                const numberOfWordMatches = getNumberOfWordMatches(words, wordsInSpecificKey)

                if (numberOfWordMatches > 0 && numberOfWordMatches > highestMatch[1]) {
                    if (!wordsInSpecificKey.includes('room') && !wordsInSpecificKey.includes('locker')) {
                        highestMatch = [dmzKeys[1][key], numberOfWordMatches]
                    }
                }
            }

            if (highestMatch[0]){
                playerHasKeys.push(highestMatch[0])
            }

        }
    }

    return [...new Set(playerHasKeys)].sort()
}
