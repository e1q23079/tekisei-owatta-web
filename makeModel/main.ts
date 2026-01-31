import fs from "fs";
import { parse } from "csv-parse/sync";
import { makeModels, Model, tokenizeJapaneseText } from "./learn";
import { makeSentence } from "./make";
// 質問データの配列
const questions = [];
// CSVファイルから質問データを読み込み
type Question = {
    question_text: string;
}
// 質問データの読み込み
const questionsCSV = fs.readFileSync(`./data/csv/questions.csv`, "utf-8");
const questionCSVRecord = parse(questionsCSV, {
    columns: true,
    skip_empty_lines: true
}) as Question[];

// 質問データを配列に格納
for (const record of questionCSVRecord) {
    questions.push(record.question_text);
}

// 選択肢データの配列
const choices = [];
// CSVファイルから選択肢データを読み込み
type Choice = {
    choice_text: string;
}
// 選択肢データの読み込み
const choicesCSV = fs.readFileSync(`./data/csv/choices.csv`, "utf-8");
const choiceCSVRecord = parse(choicesCSV, {
    columns: true,
    skip_empty_lines: true
}) as Choice[];
// 選択肢データを配列に格納
for (const record of choiceCSVRecord) {
    choices.push(record.choice_text);
}

// 結果データの配列
const results = [];
// CSVファイルから結果データを読み込み
type Result = {
    result_name: string;
    description: string;
}
// 結果データの読み込み
const resultsCSV = fs.readFileSync(`./data/csv/results.csv`, "utf-8");
const resultCSVRecord = parse(resultsCSV, {
    columns: true,
    skip_empty_lines: true
}) as Result[];
// 結果データを配列に格納
for (const record of resultCSVRecord) {
    results.push(record);
}
console.log("CSV data has been loaded.");

// 質問データのトークナイズ
const questions_token: string[][] = [];
// 各質問文をトークナイズ
for (const question of questions) {
    console.log(`Tokenizing question: ${questions.indexOf(question) + 1}/${questions.length}`);
    const tokens = await tokenizeJapaneseText(question);
    questions_token.push(tokens);
}
console.log("Questions have been tokenized.");
// トークナイズのモデル作成
const question_model = makeModels(questions_token);
console.log("Question model has been created.");


// JSONデータの作成
type jsonData = {
    questions: Model,
    choices: Model | null,
    results: Model | null
};

const jsonData: jsonData = {
    questions: question_model,
    choices: null,
    results: null
};

// JSONデータをファイルに書き込み
fs.writeFileSync(`./data/model.json`, JSON.stringify(jsonData, null, 2), "utf-8");
console.log("Model JSON file has been created successfully.");

for (let i = 0; i < 5; i++) {
    console.log(`Generated sentence ${i + 1}: ${makeSentence(question_model).join("")}`);
}