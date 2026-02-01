"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsModelResult = exports.getChoicesModel = exports.getQuestionsModel = exports.getJsonData = void 0;
const fs_1 = __importDefault(require("fs"));
const getJsonData = () => {
    const jsonText = fs_1.default.readFileSync(`./data/model.json`, "utf-8");
    const jsonInfo = JSON.parse(jsonText);
    return jsonInfo;
};
exports.getJsonData = getJsonData;
const getQuestionsModel = (jsonInfo) => {
    return jsonInfo.questions;
};
exports.getQuestionsModel = getQuestionsModel;
const getChoicesModel = (jsonInfo) => {
    return jsonInfo.choices;
};
exports.getChoicesModel = getChoicesModel;
const getResultsModelResult = (jsonInfo) => {
    return { resultName: jsonInfo.results.resultName, description: jsonInfo.results.description };
};
exports.getResultsModelResult = getResultsModelResult;
//# sourceMappingURL=load.js.map