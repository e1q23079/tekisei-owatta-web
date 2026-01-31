import express from 'express';
import fs from "fs";

// Create an instance of an Express application
const app = express();
// Define the port to run the server on
const port = process.env.PORT || 3000;
// Define a simple route to respond with "Hello, World!" when accessing the root URL
app.use(express.static('public'));

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
    const data = fs.readFileSync(`./src/sample.json`, "utf-8");
    const apiResponse: ApiResponse = JSON.parse(data);
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