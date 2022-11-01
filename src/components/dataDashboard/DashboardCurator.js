import { Paper, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@material-ui/core";

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

    if(props.dashboardStatus) {
        return (
            <Paper elevation={3} className={classes.curator}>
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
    else return null;
}