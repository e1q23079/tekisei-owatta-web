import fs from "fs";
import { Model, jsonData } from "./type";

const getJsonData = () => {
    const jsonText = fs.readFileSync(`./data/model.json`, "utf-8");
    const jsonInfo: jsonData = JSON.parse(jsonText);
    return jsonInfo;
}

const getQuestionsModel = (jsonInfo: jsonData): Model => {
    return jsonInfo.questions;
}

const getChoicesModel = (jsonInfo: jsonData): Model => {
    return jsonInfo.choices;
}

const getResultsModelResult = (jsonInfo: jsonData): { resultName: Model, description: Model } => {
    return { resultName: jsonInfo.results.resultName, description: jsonInfo.results.description };
}

export { getJsonData, getQuestionsModel, getChoicesModel, getResultsModelResult };