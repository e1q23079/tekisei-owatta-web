import { makeSentence } from "./make"
import { Model } from "./type";

const getQuestion = (questionsModel: Model): string => {
    const text = makeSentence(questionsModel);
    return text;
}

const getChoice = (choicesModel: Model): string => {
    const text = makeSentence(choicesModel);
    return text;
}

const getResult = (resultModel: { resultName: Model, description: Model }): { resultName: string, description: string } => {
    const resultName = makeSentence(resultModel.resultName);
    const description = makeSentence(resultModel.description);
    return {
        resultName,
        description
    };
}

export { getQuestion, getChoice, getResult };