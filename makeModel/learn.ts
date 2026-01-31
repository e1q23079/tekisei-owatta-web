import kuromoji from "kuromoji";

const tokenizeJapaneseText = (text: string): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        kuromoji.builder({ dicPath: "node_modules/kuromoji/dict/" }).build((err, tokenizer) => {
            if (err) {
                reject(err);
                return;
            }
            const tokens = tokenizer.tokenize(text);
            const surfaces = tokens.map(token => token.surface_form);
            resolve(surfaces);
        });
    });
}

const START_TOKEN = "^^START^^";
const END_TOKEN = "^^END^^";

type Model = {
    [word: string]: string[];
}

const makeModel = (model: Model, tokens: string[]): Model => {
    let pre: string = START_TOKEN;
    for (const token of tokens) {
        if (!model[pre]) {
            model[pre] = [];
        }
        model[pre]!.push(token);
        pre = token;
    }
    if (!model[pre]) {
        model[pre] = [];
    }
    model[pre]!.push(END_TOKEN);
    return model;
}

const makeModels = (sentences: string[][]): Model => {
    const model: Model = {};
    for (const tokens of sentences) {
        makeModel(model, tokens);
    }
    return model;
}

export { tokenizeJapaneseText, makeModels, Model };