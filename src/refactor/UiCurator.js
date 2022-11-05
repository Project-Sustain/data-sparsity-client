import { useState } from "react";
import { Box, Drawer, Divider, Button, IconButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const useStyles = makeStyles({
    root: {
        zIndex: 5000,
        opacity: 0.75
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
    formGroup: {
        margin: '10px',
        padding: '10px'
    },
    drawer: {
        width: 250
    }
});


export default function UiCurator({Curator}) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);


    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const renderOpenButton = () => {
        if(!open) {
            return  <IconButton 
                        className={classes.openButton} 
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
        }
        else return null
    }


    return (
        <>
            {renderOpenButton()}
            <Drawer
                className={classes.root}
                variant='persistent'
                anchor='left'
                open={open}
                onClose={handleDrawerClose}
            >
                <Box
                    className={classes.drawer}
                    role='presentation'
                >
                    <div className={classes.closeButton}>
                        <IconButton onClick={handleDrawerClose}><ChevronLeftIcon/></IconButton>
                    </div>
                    <Divider/>
                    <FormGroup className={classes.formGroup}>
                        {
                            Curator.stateMap.map((element, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={element.state}
                                                onChange={element.function}
                                            />
                                        }
                                        label={element.name}
                                    />
                                );
                            })
                        }
                    </FormGroup>
                </Box>
            </Drawer>
        </>
    );

}