import { Model } from "./type";
declare const getQuestion: (questionsModel: Model) => string;
declare const getChoice: (choicesModel: Model) => string;
declare const getResult: (resultModel: {
    resultName: Model;
    description: Model;
}) => {
    resultName: string;
    description: string;
};
export { getQuestion, getChoice, getResult };
//# sourceMappingURL=get.d.ts.map