import { useState } from "react";
import { Box, Drawer, Divider, IconButton, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Typography } from "@mui/material";


const useStyles = makeStyles({
    root: {
        margin: '10px',
        padding: '10px'
    },
});


export default function UiCurator({Curator, requestStatus}) {
    const classes = useStyles();

    /**
     * Only display Request Form & Map Legend until data returns, then display all
     * @returns Array of Curator.stateMap items
     */
    const getOptionsList = () => {
        if(requestStatus === 'VALID') {
            return Curator.stateMap;
        }
        else {
            return [Curator.stateMap[0], Curator.stateMap[1]];
        }
    }


    return (
        <FormGroup className={classes.root}>
            {
                getOptionsList().map((element, index) => {
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
    );

}