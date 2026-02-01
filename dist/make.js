"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSentence = void 0;
const makeSentence = (model, maxWords = 1000) => {
    const result = [];
    let word = "^^START^^";
    for (let i = 0; i < maxWords; i++) {
        const candidateWords = model[word];
        if (!candidateWords) {
            break;
        }
        const nextWord = candidateWords[Math.floor(Math.random() * candidateWords.length)];
        if (nextWord === "^^END^^" || nextWord === undefined) {
            break;
        }
        result.push(nextWord);
        word = nextWord;
    }
    return result.join("");
};
exports.makeSentence = makeSentence;
//# sourceMappingURL=make.js.map