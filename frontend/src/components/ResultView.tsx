import { Button, Card, Container, Typography, Box } from "@mui/material";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { useRef } from "react";
import * as htmlToImage from 'html-to-image';

// ResultViewコンポーネント
const ResultView = () => {
    //  ページ遷移用のフック
    const navigate = useNavigate();
    // 結果データの受け取り
    const location = useLocation();
    const { result, text } = location.state as { result: string; text: string; } || { result: "", text: "" };
    // クエリパラメータの取得
    const [searchParams] = useSearchParams();
    const key = searchParams.get("key");

    // 結果表示用のref
    const resultRef = useRef<HTMLDivElement>(null);

    // 画像を保存
    const handleSaveImage = () => {
        if (!resultRef.current) {
            return;
        }

        try {
            const dataUrl = htmlToImage.toPng(resultRef.current);
            dataUrl.then((data) => {
                const link = document.createElement('a');
                link.href = data;
                link.download = `終わってる適性検査_結果_${result}.png`;
                link.click();
            });
        } catch (error) {
            console.error("画像の保存に失敗しました:", error);
        }
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
            <Card ref={resultRef}>
                {/* タイトル */}
                <Typography variant="h4" component="div" sx={{ p: 2, mt: 1 }}>
                    終わってる適性検査 結果
                </Typography>
                {/* 注意書き */}
                <Alert severity="info" sx={{ mx: 2, textAlign: 'left' }}>
                    本適性検査は科学的根拠に一切基づくものではありません。
                </Alert>
                {/* 診断結果 */}
                <Typography variant="h5" component="div" sx={{ p: 2, mt: 1 }}>
                    診断結果： {result ? result : "未判定"}
                </Typography>
                {/* 結果の説明 */}
                <Typography variant="body1" component="div" sx={{ p: 2 }}>
                    {text ? text : "該当する結果がありませんでした。"}
                </Typography>
                {/* ボタン群 */}
                <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Button variant="outlined" onClick={() => navigate(key ? `/?key=${key}` : "/")}>最初からやり直す</Button>
                    <Button variant="contained" sx={{ ml: 2 }} onClick={handleSaveImage}>結果を保存する</Button>
                </Box>
                {/* 注意書き */}
                <Typography variant="body1" component="div" sx={{ p: 2, mb: 1 }}>
                    ※ このアプリは正式な適性検査ではありません。
                </Typography>
            </Card>
        </Container>
    )
};
export default ResultView;