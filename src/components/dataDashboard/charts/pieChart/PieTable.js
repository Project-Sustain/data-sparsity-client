import { makeStyles } from "@material-ui/core";
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@mui/material';
import { colors } from '../../../../library/colors';

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        maxHeight: 475
    },
});

export default function PieTable({setSelectedIndex, selectedIndex, pieData, colorScale, scoreSet}) {
    const classes = useStyles();

    const tableClick = (event) => {
        const score = parseFloat((event.target).innerHTML);
        const index = scoreSet.indexOf(score);
        if(index !== -1) {
            setSelectedIndex(index);
        }
        else {}
    }

    const getColor = (index) => {
        return index === selectedIndex ? colors.highlight : colorScale[index];
    }

    return (
        <TableContainer className={classes.root} component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Sparsity Score</TableCell>
                        <TableCell>Number of Sites</TableCell>
                        <TableCell>% of Pie</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        pieData.map((entry, index) => {
                            return (
                                <TableRow key={index} onClick={tableClick}>
                                    <TableCell sx={{backgroundColor: getColor(index)}}></TableCell>
                                    <TableCell sx={{cursor: 'pointer'}}>{entry.score}</TableCell>
                                    <TableCell>{entry.sites}</TableCell>
                                    <TableCell>{entry.percent}%</TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );

}