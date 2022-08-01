import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { Typography, Paper, Stack, TableContainer, TableRow, TableCell, Table, TableHead, TableBody, Grid } from '@mui/material';
import moment from 'moment';
import { colors } from '../../helpers/colors';

const useStyles = makeStyles({
    table: {
        maxHeight: '40vh',
        overflow: 'auto'
    }
});

export default function SelectedSite(props) {
    const classes = useStyles();
    const [pieData, setPieData] = useState([]);
    const [tableData, setTableData] = useState([]);


    useEffect(() => {
        const timeLists = props.site.epochTimes.map(epochTime => {
            return moment.unix(epochTime/1000).format('MM/DD/YYYY HH:mm:ss');
        });
        setTableData(timeLists);
    }, [props.site]);

    useEffect(() => {
        if(props.site){

            const myScore = props.site.sparsityScore;
            const numberOfSameScores = props.scores.filter(score => {return score === myScore}).length;
            const numberOfDifferentScores = props.scores.length - numberOfSameScores;
            setPieData([
                {
                    "name": props.site.sparsityScore,
                    "value": numberOfSameScores,
                    "fill": colors.tertiary
                },
                {
                    "name": "Other",
                    "value": numberOfDifferentScores,
                    "fill": colors.primary
                }
            ]);

        }
    }, [props.site, props.scores]);
    
    return (
        <Stack direction='row' justifyContent='space-around' alignItems='flex-start' spacing={2}>
            <Stack direction='column' justifyContent='flex-start' className={classes.section}>
                <Typography><strong>Formal Name:</strong> {props.site.organizationFormalName}</Typography>
                <Typography><strong>Site Type:</strong> {props.site.monitoringLocationTypeName}</Typography>
                <Typography><strong>Absolute Sparsity Score:</strong> {props.site.sparsityScore}</Typography>
                <Typography><strong>Relative Sparsity Score:</strong> {props.site.relativeSparsityScore}</Typography>
                <ResponsiveContainer width='100%' height={250}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={75}
                            label
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Stack>

            <Stack className={classes.section}>
                <TableContainer component={Paper} className={classes.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{tableData.length} Observations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tableData.map((date, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{date}</TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>

        </Stack>
    );
}