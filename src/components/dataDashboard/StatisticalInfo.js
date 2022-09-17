import { makeStyles } from "@material-ui/core";
import { Paper, Typography, LinearProgress, Stack, Divider } from "@mui/material";
import { styled } from '@mui/material/styles';
// import { colors } from '../../helpers/colors';

const useStyles = makeStyles({
    root: {
        margin: "10px",
        padding: "10px",
        zIndex: 5000,
        opacity: '0.9'
    },
    overview: {
        maxWidth: '25vw'
    }
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function StatisticalInfo(props) {
    const classes = useStyles();

    if(props.status === "VALID" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.root}>
                <Typography variant='h4' align='center'>Overview</Typography>
                <Stack 
                    direction='row' 
                    justifyContent='space-evenly'
                    alignItems="center"
                >
                    <Item className={classes.overview}>
                        <Typography variant='h5'><strong>Sparsity Score</strong></Typography>
                        <Typography>
                            Sparsity Score represents the average amount of time between observations
                            at a given observation site. The number is normalized based off of the mean and
                            standard deviation of both frequency of measure and total number of observations
                            at every site in the query.
                        </Typography>
                    </Item>
                    <Item>
                        <Typography variant='h5'><strong>Time Between Observations</strong></Typography>
                        <Typography>Mean: {props.meanDifference}</Typography>
                        <Typography>Standard Deviation: {props.standardDeviationDifference}</Typography>
                    </Item>
                    <Item>
                        <Typography variant='h5'><strong>Number of Observations per Site</strong></Typography>
                        <Typography>Mean: {props.meanObservations}</Typography>
                        <Typography>Standard Deviation: {props.standardDeviationObservations}</Typography>
                    </Item>
                </Stack>
            </Paper>
        );
    }

    else if(props.status === "INVALID" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.root}>
                <Typography>No Data Matching Request</Typography>
            </Paper>
        );
    }

    else if(props.status === "PENDING" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.root}>
                <Typography>Statistics Loading...</Typography>
                <LinearProgress color='tertiary' />
            </Paper>
        );
    }
    else return null;
}