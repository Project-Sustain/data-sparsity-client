import { useState } from "react";
import { Box, Drawer, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        zIndex: 5000,
        opacity: 0.75
    },
    openButton: {
        position: 'fixed',
        top: 10,
        left: 10
    },
    formGroup: {
        margin: '10px',
        padding: '10px'
    },
    drawer: {
        width: 250,
        height: 250
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
            return <Button className={classes.openButton} onClick={handleDrawerOpen}>Curator</Button>
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
                    <FormGroup className={classes.formGroup}>
                        <Button onClick={handleDrawerClose}>Close</Button>
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