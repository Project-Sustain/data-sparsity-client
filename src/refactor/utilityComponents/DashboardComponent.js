import { makeStyles } from '@material-ui/core';
import { paperRoot } from '../../library/styles';
import { Paper, Stack } from '@mui/material';


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
            <Stack
                direction='column'
                spacing={1.5}
                justifyContent='center'
                alignItems='center'
            >
                {props.children}
            </Stack>
        </Paper>
    );

}