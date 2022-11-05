import { useState } from "react";
import { Box, Drawer, Divider, IconButton } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from "@mui/material";
import UiCurator from "./UiCurator";


const useStyles = makeStyles({
    root: {
        zIndex: 5000,
        opacity: 0.9,
        overflow: 'auto'
    },
    openButton: {
        position: 'fixed',
        top: 5,
        left: 5
    },
    closeButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: '10px'
    },
    drawer: {
        width: 'auto',
        height: '60vh'
    },
    titleText: {
        margin: '10px'
    }
});


export default function DataDashboard({Curator, requestStatus}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleDrawerClose = () => {
        setOpen(false);
    }


    return (
        <>
            <IconButton 
                className={classes.openButton} 
                onClick={() => setOpen(!open)}
            >
                <MenuIcon/>
            </IconButton>
            <Drawer
                className={classes.root}
                variant='persistent'
                anchor='bottom'
                open={open}
                onClose={handleDrawerClose}
            >
                <Box
                    className={classes.drawer}
                    role='presentation'
                >
                    <Typography className={classes.titleText} align='center' variant='h5'>Dashboard Control</Typography>
                    <Divider/>
                    <UiCurator
                        Curator={Curator}
                        requestStatus={requestStatus}
                    />
                </Box>
            </Drawer>
        </>
    );

}