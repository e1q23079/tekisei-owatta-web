"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const load = __importStar(require("./load"));
const get_1 = require("./get");
// Create an instance of an Express application
const app = (0, express_1.default)();
// Define the port to run the server on
const port = process.env.PORT || 3000;
// Define a simple route to respond with "Hello, World!" when accessing the root URL
app.use(express_1.default.static('public'));
// // CORS設定
// app.use(cors({
//     origin: 'http://localhost:5173', // フロントエンドのURLに置き換えてください
// }))
const jsonInfo = load.getJsonData();
const questionsModel = load.getQuestionsModel(jsonInfo);
const choicesModel = load.getChoicesModel(jsonInfo);
const resultsModel = load.getResultsModelResult(jsonInfo);
// 1~4のランダムな配列を生成
const generateRandomArray = () => {
    const arr = [1, 2, 3, 4];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
};
// a~bのランダムな問題数を生成
const generateRandomQuestionCount = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
};
// データを取得
const getData = () => {
    const questions = [];
    const questionCount = generateRandomQuestionCount(15, 30);
    for (let i = 0; i < questionCount; i++) {
        const question = (0, get_1.getQuestion)(questionsModel);
        const options = [];
        for (let j = 0; j < 4; j++) {
            options.push((0, get_1.getChoice)(choicesModel));
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
    const results = [];
    for (let i = 0; i < stepWidth; i++) {
        const resultData = (0, get_1.getResult)(resultsModel);
        results.push({
            minScore: i * scoreStep + 1,
            maxScore: (i + 1) * scoreStep,
            result: resultData.resultName,
            text: resultData.description
        });
    }
    const apiResponse = {
        questions: questions,
        results: results
    };
    return apiResponse;
};
// 質問データの取得
app.get("/get/question", async (req, res) => {
    // 質問データの読み込み
    res.json(getData());
});
// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map