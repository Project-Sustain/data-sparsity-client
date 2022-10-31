import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper, Typography } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import { colors } from '../helpers/colors';
import chroma from 'chroma-js';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
    root: {
        zIndex: 5000,
        opacity: 0.9,
        margin: '10px',
        padding: '10px',
        width: '10vw'
    },
    table: {
        marginTop: '10px'
    }
})

export default function MapLegend(props) {
    const classes = useStyles();
    const numberOfBins = 7;
    const range = props.max - props.min;
    const step = range / (numberOfBins-1);
    const colorGradient = chroma.scale([colors.tertiary, colors.primary]).colors(numberOfBins);
    const scoreGradient = [...Array(numberOfBins).keys()].map(index => {return (props.min + (step * index)).toFixed(2)});

    return (
        <Paper className={classes.root} elevation={3}>
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
        </Paper>
    )
}