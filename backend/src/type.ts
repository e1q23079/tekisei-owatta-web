type jsonData = {
    questions: Model,
    choices: Model,
    results: {
        resultName: Model,
        description: Model
    }
};

type Model = {
    [word: string]: string[];
}

export type { jsonData, Model };