import { AppBar, Toolbar, Typography } from '@mui/material'

// NavBarコンポーネント
const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                    終わってる適性検査
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar;