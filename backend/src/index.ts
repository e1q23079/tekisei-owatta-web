import express from 'express';
import fs from "fs";
import cors from 'cors';
import * as load from "./load";
import { getQuestion, getChoice, getResult } from "./get";

// Create an instance of an Express application
const app = express();
// Define the port to run the server on
const port = process.env.PORT || 3000;
// Define a simple route to respond with "Hello, World!" when accessing the root URL
app.use(express.static('public'));

// // CORS設定
// app.use(cors({
//     origin: 'http://localhost:5173', // フロントエンドのURLに置き換えてください
// }))

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

// 1~4のランダムな配列を生成
const generateRandomArray = (): number[] => {
    const arr: number[] = [1, 2, 3, 4];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i]!;
        arr[i] = arr[j]!;
        arr[j] = tmp!;
    }
    return arr;
}

// 10~100のランダムな問題数を生成
const generateRandomQuestionCount = (): number => {
    return Math.floor(Math.random() * 91) + 10;
}

// データを取得
const getData = (): ApiResponse => {
    const questions: Question[] = [];
    const questionCount = generateRandomQuestionCount();
    for (let i = 0; i < questionCount; i++) {
        const question: string = getQuestion(questionsModel);
        const options: string[] = [];
        for (let j = 0; j < 4; j++) {
            options.push(getChoice(choicesModel));
        }
        questions.push({
            text: question,
            options: options,
            point: generateRandomArray()
        });
    }

    const totalMaxScore = questionCount * 4; // 問題数、各問最大4点
    const stepWidth = Math.floor(questionCount / 2);
    const scoreStep = Math.floor(totalMaxScore / stepWidth); // 段階評価のためのスコア幅

    const results: Result[] = [];
    for (let i = 0; i < stepWidth; i++) {
        const resultData = getResult(resultsModel);
        results.push({
            minScore: i * scoreStep + 1,
            maxScore: (i + 1) * scoreStep,
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