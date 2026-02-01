"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.getChoice = exports.getQuestion = void 0;
const make_1 = require("./make");
const getQuestion = (questionsModel) => {
    const text = (0, make_1.makeSentence)(questionsModel);
    return text;
};
exports.getQuestion = getQuestion;
const getChoice = (choicesModel) => {
    const text = (0, make_1.makeSentence)(choicesModel);
    return text;
};
exports.getChoice = getChoice;
const getResult = (resultModel) => {
    const resultName = (0, make_1.makeSentence)(resultModel.resultName);
    const description = (0, make_1.makeSentence)(resultModel.description);
    return {
        resultName,
        description
    };
};
exports.getResult = getResult;
//# sourceMappingURL=get.js.map