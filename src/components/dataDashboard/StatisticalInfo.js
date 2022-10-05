import { makeStyles } from "@material-ui/core";
import { Paper, Typography, LinearProgress, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
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
                <Stack 
                    direction='row' 
                    justifyContent='space-evenly'
                    alignItems="center"
                >
                    <Item className={classes.overview} elevation={3}>
                        <Typography variant='h5'><strong>Sparsity Score</strong></Typography>
                        <Typography>
                            Sparsity Score represents the average amount of time between observations
                            at a given observation site. The number is normalized based off of the mean and
                            standard deviation of both frequency of measure and total number of observations
                            at every site in the query.
                        </Typography>
                    </Item>
                    <Item elevation={3}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell><strong>Min</strong></TableCell>
                                        <TableCell><strong>Max</strong></TableCell>
                                        <TableCell><strong>Mean</strong></TableCell>
                                        <TableCell><strong>Standard Deviation</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Time Between Observations</TableCell>
                                        <TableCell>{props.stats.minTimeBetweenObservations}</TableCell>
                                        <TableCell>{props.stats.maxTimeBetweenObservations}</TableCell>
                                        <TableCell>{props.stats.meanTimeBetweenObservations}</TableCell>
                                        <TableCell>{props.stats.stdDevTimeBetweenObservations}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Number of Observations per Site</TableCell>
                                        <TableCell>{props.stats.minNumberOfObservations}</TableCell>
                                        <TableCell>{props.stats.maxNumberOfObservations}</TableCell>
                                        <TableCell>{props.stats.meanNumberOfObservations}</TableCell>
                                        <TableCell>{props.stats.stdDevNumberOfObservations}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Sparstiy Scores</TableCell>
                                        <TableCell>{props.stats.minSparsity}</TableCell>
                                        <TableCell>{props.stats.maxSparsity}</TableCell>
                                        <TableCell>{props.stats.meanSparsity}</TableCell>
                                        <TableCell>{props.stats.stdDevSparsity}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
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