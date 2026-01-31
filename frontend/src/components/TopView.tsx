import { Button, Card, Container, Typography, List } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert } from "@mui/material";

// TopViewコンポーネント
const TopView = () => {
    const navigate = useNavigate();
    //  クエリパラメータの取得
    const [searchParams] = useSearchParams();
    const key = searchParams.get("key");

    return (
        <Container maxWidth="sm" sx={{ mt: 2, mb: 2, textAlign: 'center' }}>
            <Card>
                {/* タイトル */}
                <Typography variant="h4" component="div" sx={{ p: 2, mt: 1 }}>
                    終わってる適性検査
                </Typography>
                {/* 注意書き */}
                <Alert severity="info" sx={{ mx: 2, textAlign: 'left' }}>
                    本適性検査は科学的根拠に一切基づいておらず、人生の意思決定に絶対に用いないでください。
                </Alert>
                <Typography variant="body1" component="div" sx={{ p: 2 }}>
                    あなたの適性を測定できません。
                </Typography>
                {/* 概要 */}
                <List>
                    <Typography variant="body1" component="div" sx={{ p: 1 }}>
                        質問数：わからん
                    </Typography>
                    <Typography variant="body1" component="div" sx={{ p: 1 }}>
                        所要時間：しらん
                    </Typography>
                </List>
                {/* 検査を受けるボタン */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => navigate(key ? `/question?key=${key}` : "/question")}
                >
                    覚悟ができたので検査を始める
                </Button>
                {/* 注意書き */}
                <Typography variant="body1" component="div" sx={{ p: 2, mb: 1 }}>
                    ※ このアプリは正式な適性検査ではありません。
                </Typography>
            </Card>
        </Container>
    )
};
export default TopView;