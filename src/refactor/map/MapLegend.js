import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Container, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import { colors } from '../../library/colors';
import chroma from 'chroma-js';
import { Divider } from '@mui/material';
import DashboardComponent from '../utilityComponents/DashboardComponent';


const useStyles = makeStyles({
    root: {
        maxWidth: '10vw'
    },
    table: {
        marginTop: '10px'
    }
})


export default function MapLegend({visible, min, max, requestStatus}) {

    const classes = useStyles();
    const numberOfBins = 7;
    const range = max - min;
    const step = range / (numberOfBins-1);
    const colorGradient = chroma.scale([colors.tertiary, colors.primary]).colors(numberOfBins);
    const scoreGradient = [...Array(numberOfBins).keys()].map(index => {return (min + (step * index)).toFixed(2)});


    if(visible && requestStatus === 'VALID') {
        return (
            <div className={classes.root}>
                <DashboardComponent>
                    <Typography align="center" variant='h5'>Map Legend</Typography>
                    <Divider/>
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
                </DashboardComponent>
            </div>
        );
    }

    else return null;
}