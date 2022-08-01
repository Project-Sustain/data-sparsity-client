import { Paper, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: "10px",
        padding: "10px",
        width: "10vw",
        position: 'absolute',
        top: '10px',
        left: '30px'
    }
})

export default function DashboardCurator(props) {
    const classes = useStyles();

    const disable = (entry) => {
        if(entry.label === "Application Status" || entry.label === "Request Form") {
            return false;
        }
        else if(props.status === "VALID") {
            return false;
        }
        else return true;
    }

    if(props.dashboardStatus) {
        return (
            <Paper elevation={3} className={classes.root}>
                <Typography align='center' variant='h5'>Dashboard</Typography>
                <FormGroup>
                    {
                        props.dashboardStatus.map((entry, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={entry.check}
                                            // disabled={disable(entry)}
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

    else return null;
}