import { Paper, FormGroup, FormControlLabel, Checkbox, Button, Divider } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles({
    button: {
        zIndex: 5000,
    },
    curator: {
        zIndex: 5000,
        margin: '10px',
        padding: '10px',
        width: '10vw',
        opacity: '0.9'
    }
})

export default function DashboardCurator(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const renderButton = () => {
        if(open) return null;
        else {
            return <Button className={classes.button} onClick={() => setOpen(true)}>Dashboard Menu</Button>
        }
    }

    const renderCurator = () => {
        if(!open) return null;
        else {
            return (
                <Paper elevation={3} className={classes.curator}>
                    <Button fullWidth onClick={() => setOpen(false)}>Close</Button>
                    <Divider />
                    <FormGroup>
                        {
                            props.dashboardStatus.map((entry, index) => {
                                return (
                                    <FormControlLabel
                                        key={index}
                                        control={
                                            <Checkbox
                                                checked={entry.check}
                                                onClick={() => entry.set(!entry.check)}
                                            />
                                        }
                                        label={entry.label}
                                    />
                                );
                            })
                        }
                    </FormGroup>
                </Paper>
            );
        }
    }

    if(props.dashboardStatus) {
        return (
            <>  
                {renderButton()}
                {renderCurator()}
            </>
        );
    }

    else return null;
}