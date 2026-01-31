import { Button, Card, Container, Typography, List, ListItemButton, ListItemText, Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

// QuestionViewコンポーネント
const QuestionView = () => {
    //  ページ遷移用のフック
    const navigate = useNavigate();
    //  クエリパラメータの取得
    const [searchParams] = useSearchParams();
    const key = searchParams.get("key");

    // 問題データの型定義
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
    }

    // 問題データのstate
    const [questionsData, setQuestionsData] = useState<Question[] | null>(null);

    // 結果データのstate
    const [resultsData, setResultsData] = useState<Result[] | null>(null);

    // 選択肢の選択状態を管理するためのstate
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    // 現在の出題数
    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
    // 総出題数
    const [totalQuestionNumber, setTotalQuestionNumber] = useState(0);
    // 最終問題かどうかの判定
    const lastQuestion = currentQuestionNumber === totalQuestionNumber;

    // スコアのstate
    const [score, setScore] = useState(0);

    // 問題を取得
    useEffect(() => {
        fetch(`/get/question?key=${key}`, { method: 'GET' })
            .then(response => response.json())
            .then((data: ApiResponse) => {
                setQuestionsData(data.questions);
                setTotalQuestionNumber(data.questions.length);
                setResultsData(data.results);
            });
    }, [key]);

    // 結果を取得
    const getResult = (score: number): Result | null => {
        for (const result of resultsData || []) {
            if (score >= result.minScore && score <= result.maxScore) {
                return result;
            }
        }
        return null;
    };

    // 次へボタン押下時の処理
    const handleNextQuestion = () => {
        if (selectedIndex !== null && questionsData) {
            setScore(prevScore => prevScore + questionsData[currentQuestionNumber - 1].point[selectedIndex]);
        }
        setSelectedIndex(null); // 選択肢のリセット
        if (lastQuestion) {
            const result: Result | null = getResult(score);
            navigate(key ? `/result?key=${key}` : "/result", { state: { result: result?.result, text: result?.text } });
        } else {
            setCurrentQuestionNumber(prev => prev + 1);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
            <Card>
                {/* 回答状況 */}
                <Typography variant="body1" component="div" sx={{ p: 2 }}>
                    回答状況: {currentQuestionNumber} / {totalQuestionNumber}
                </Typography>
                {/* 質問 */}
                <Typography variant="h6" component="div" sx={{ px: 2 }}>
                    最も適切な選択肢を1つ選んでください。
                </Typography>
                <Typography variant="body1" component="div" sx={{ px: 2 }}>
                    {questionsData ? questionsData[currentQuestionNumber - 1].text : "読み込み中..."}
                </Typography>
                {/* 選択肢 */}
                <List sx={{ px: 3 }}>
                    {questionsData ? questionsData[currentQuestionNumber - 1].options.map((option, index) => (
                        <ListItemButton key={index} selected={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
                            <ListItemText primary={option} />
                        </ListItemButton>
                    )) : ""}
                </List>
                {/* 次へボタン */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button variant="contained" color="primary" sx={{ mx: 3, my: 2 }} onClick={handleNextQuestion} disabled={selectedIndex === null}>
                        {lastQuestion ? "回答を終了する" : "次へ"}
                    </Button>
                </Box>
            </Card>
        </Container >
    )
};
export default QuestionView;