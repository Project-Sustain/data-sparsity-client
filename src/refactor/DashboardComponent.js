import { makeStyles } from '@material-ui/core';
import { paperRoot } from '../library/styles';
import { Paper } from '@mui/material';


const useStyles = makeStyles({
    root: paperRoot
})


export default function DashboardComponent(props) {
    const classes = useStyles();


    return (
        <Paper 
            className={classes.root}
            elevation={3}
        >
            {props.children}
        </Paper>
    );

}