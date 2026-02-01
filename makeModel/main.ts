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

// 選択肢データのトークナイズ
const choices_token: string[][] = [];
// 各選択肢文をトークナイズ
for (const choice of choices) {
    console.log(`Tokenizing choice: ${choices.indexOf(choice) + 1}/${choices.length}`);
    const tokens = await tokenizeJapaneseText(choice);
    choices_token.push(tokens);
}
console.log("Choices have been tokenized.");
// トークナイズのモデル作成
const choice_model = makeModels(choices_token);
console.log("Choice model has been created.");

// 結果データのトークナイズ
const results_token_result_name: string[][] = [];
const results_token_description: string[][] = [];
// 各結果文をトークナイズ
for (const result of results) {
    console.log(`Tokenizing result: ${results.indexOf(result) + 1}/${results.length}`);
    const tokens_name = await tokenizeJapaneseText(result.result_name);
    results_token_result_name.push(tokens_name);
    const tokens_description = await tokenizeJapaneseText(result.description);
    results_token_description.push(tokens_description);
}
console.log("Results have been tokenized.");
// トークナイズのモデル作成
const result_model_result_name = makeModels(results_token_result_name);
const result_model_description = makeModels(results_token_description);
console.log("Result model has been created.");


// JSONデータの作成
type jsonData = {
    questions: Model,
    choices: Model,
    results: {
        resultName: Model,
        description: Model
    }
};

const jsonData: jsonData = {
    questions: question_model,
    choices: choice_model,
    results: {
        resultName: result_model_result_name,
        description: result_model_description
    }
};

// JSONデータをファイルに書き込み
fs.writeFileSync(`./data/model.json`, JSON.stringify(jsonData, null, 2), "utf-8");
console.log("Model JSON file has been created successfully.");