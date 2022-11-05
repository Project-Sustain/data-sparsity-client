import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Button, Typography, Divider, Stack } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import { colors } from '../../library/colors';
import chroma from 'chroma-js';
import DashboardComponent from '../utilityComponents/DashboardComponent';


const useStyles = makeStyles({
    divider: {
        width: '100%'
    },
})


export default function MapLegend({visible, min, max, requestStatus, close}) {
    console.log({requestStatus})

    const classes = useStyles();
    const numberOfBins = 7;
    const range = max - min;
    const step = range / (numberOfBins-1);
    const colorGradient = chroma.scale([colors.tertiary, colors.primary]).colors(numberOfBins);
    const scoreGradient = [...Array(numberOfBins).keys()].map(index => {return (min + (step * index)).toFixed(2)});


    const renderTable = () => {
        if(requestStatus === 'VALID') {
            return (
                <TableContainer>
                    <Table className={classes.table} size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Sparsity Score</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                scoreGradient.map((score, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell sx={{backgroundColor: colorGradient[index]}} key={index}>{score}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }

        else return <Typography className={classes.noDataMessage}>No Data Yet</Typography>;
    };


    if(visible) {
        return (
            <div>
                <DashboardComponent>
                    <Stack
                        direction='column'
                        spacing={1}
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Typography align="center" variant='h5'>Map Legend</Typography>
                        <Divider className={classes.divider} />
                        {renderTable()}
                        <Button onClick={close}>Close</Button>
                    </Stack>
                </DashboardComponent>
            </div>
        );
    }

    else return null;
}