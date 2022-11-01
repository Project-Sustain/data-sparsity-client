import { makeStyles } from "@material-ui/core";
import { Paper, Table, TableBody, TableHead, TableRow, TableCell, TableContainer } from '@mui/material';

const useStyles = makeStyles({
    root: {
        overflow: 'auto',
        maxHeight: 475
    },
});

export default function PieTable(props) {
    const classes = useStyles();

    const tableClick = (event) => {
        const score = parseFloat((event.target).innerHTML);
        const index = props.scoreSet.indexOf(score);
        if(index !== -1) {
            props.setSelectedIndex(index);
        }
        else {}
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
                        props.pieData.map((entry, index) => {
                            return (
                                <TableRow key={index} onClick={tableClick}>
                                    <TableCell sx={{backgroundColor: props.colorScale[index]}}></TableCell>
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