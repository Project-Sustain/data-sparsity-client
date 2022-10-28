import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { Paper, Typography, Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Stack, Button } from '@mui/material';
import { colors } from '../../../helpers/colors';
import chroma from 'chroma-js';
import PieChartIcon from '@mui/icons-material/PieChart';

const useStyles = makeStyles({
    root: {
        margin: "10px",
        padding: "10px",
        width: '50vw',
        zIndex: 5000,
        opacity: '0.9'
    },
    table: {
        overflow: 'auto',
        maxHeight: 475
    },
    selected: {
        marginTop: "10px"
    },
    low: {
        color: colors.primary
    },
    high: {
        color: colors.tertiary
    },
    button: {
        width: "100%",
        marginTop: "20px"
    },
    noPieMessage: {
        margin: "10px",
        padding: "10px",
        width: "50%"
    }
});

export default function ScorePieChart(props) {
    const classes = useStyles();
    const [pieData, setPieData] = useState([]);
    const [colorScale, setColorScale] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [scoreSet, setScoreSet] = useState([]);

    const pieClick = (event, index) => {
        setSelectedIndex(index);
    }

    const tableClick = (event) => {
        const score = parseFloat((event.target).innerHTML);
        const index = scoreSet.indexOf(score);
        if(index !== -1) {
            setSelectedIndex(index);
        }
        else {}
    }

    useEffect(() => {
        const initialScoreSet = [...new Set(props.scores)];
        setScoreSet(initialScoreSet);
        const initialColorScale = chroma.scale([colors.tertiary, colors.primary]).colors(initialScoreSet.length);
        setColorScale(initialColorScale);
        const data = initialScoreSet.map((score, index) => {
            const numberWithThisScore = props.scores.filter(entry => {return entry === score}).length;
            const percent = ((numberWithThisScore / props.scores.length) * 100).toFixed(2);
            const color = index === selectedIndex ? colors.highlight : initialColorScale[index];
            return {
                "score": score,
                "sites": numberWithThisScore,
                "fill": color,
                "percent": percent
            }
        });
        setPieData(data);
    }, [props.scores, selectedIndex]);

    const RenderPieChart = () => {
        if(pieData.length < 100) {
            return (
                <ResponsiveContainer width='100%' height={500}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="sites"
                            nameKey="score"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            onClick={pieClick}
                        />
                    </PieChart>
                </ResponsiveContainer>
            );
        }

        else return (
            <Paper elevation={2} className={classes.noPieMessage}>
                <Typography variant='h4' align='center'><PieChartIcon/> Too many slices to render pie</Typography>
            </Paper>
        );
    }

    if(pieData.length > 0 && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.root}>

                <Stack direction='row' justifyContent="center">
                    <Typography align='center' variant='h5'>Sparsity Score Spread&nbsp;</Typography>
                    <Typography align='center' variant='h5' className={classes.low}>{pieData[pieData.length-1].score}</Typography>
                    <Typography align='center' variant='h5'>&nbsp;-&nbsp;</Typography>
                    <Typography align='center' variant='h5' className={classes.high}>{pieData[0].score}</Typography>
                </Stack>

                <Stack direction='row'>
                    <TableContainer className={classes.table} component={Paper}>
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
                                                <TableCell sx={{backgroundColor: colorScale[index]}}></TableCell>
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

                    <RenderPieChart/>

                </Stack>
                
                <Button disabled={selectedIndex === -1} color='secondary' variant='outlined' className={classes.button} onClick={() => setSelectedIndex(-1)}>Clear Selection</Button>
            
            </Paper>
        );
    }

    else return null;
}