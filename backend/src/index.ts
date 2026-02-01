import express from 'express';
import fs from "fs";
import * as load from "./load";
import { getQuestion, getChoice, getResult } from "./get";

// Create an instance of an Express application
const app = express();
// Define the port to run the server on
const port = process.env.PORT || 3000;
// Define a simple route to respond with "Hello, World!" when accessing the root URL
app.use(express.static('public'));

const jsonInfo = load.getJsonData();
const questionsModel = load.getQuestionsModel(jsonInfo);
const choicesModel = load.getChoicesModel(jsonInfo);
const resultsModel = load.getResultsModelResult(jsonInfo);

// 質問の型定義
type Question = {
    text: string;
    options: string[];
    point: number[];
}

// 結果の型定義
type Result = {
    minScore: number;
    maxScore: number;
    result: string;
    text: string;
}

// API Response 型定義
type ApiResponse = {
    questions: Question[];
    results: Result[];
} | { error: string };

// データを取得
const getData = (): ApiResponse => {
    const questions: Question[] = [];
    for (let i = 0; i < 10; i++) {
        const question: string = getQuestion(questionsModel);
        const options: string[] = [];
        for (let j = 0; j < 4; j++) {
            options.push(getChoice(choicesModel));
        }
        questions.push({
            text: question,
            options: options,
            point: [1, 2, 3, 4]
        });
    }
    const results: Result[] = [];
    for (let i = 0; i < 5; i++) {
        const resultData = getResult(resultsModel);
        results.push({
            minScore: i * 8 + 1,
            maxScore: (i + 1) * 8,
            result: resultData.resultName,
            text: resultData.description
        });
    }
    const apiResponse: ApiResponse = {
        questions: questions,
        results: results
    };
    return apiResponse;
}

// 質問データの取得
app.get("/get/question", async (req, res) => {
    // 質問データの読み込み
    res.json(getData());
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});