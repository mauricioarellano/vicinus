import { LocalesMenuButton, TitlePortal } from 'react-admin';
import { AppBar, Toolbar } from '@mui/material';

export const MyAppBar = () => (
    <AppBar>
        <Toolbar>
            <TitlePortal />
            <LocalesMenuButton />
        </Toolbar>
    </AppBar>
);
