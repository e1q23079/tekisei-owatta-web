import { Model } from "./type";

const makeSentence = (model: Model, maxWords: number = 100): string => {
    const result: string[] = [];
    let word: string = "^^START^^";
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
}
export { makeSentence };