import { Model, jsonData } from "./type";
declare const getJsonData: () => jsonData;
declare const getQuestionsModel: (jsonInfo: jsonData) => Model;
declare const getChoicesModel: (jsonInfo: jsonData) => Model;
declare const getResultsModelResult: (jsonInfo: jsonData) => {
    resultName: Model;
    description: Model;
};
export { getJsonData, getQuestionsModel, getChoicesModel, getResultsModelResult };
//# sourceMappingURL=load.d.ts.map