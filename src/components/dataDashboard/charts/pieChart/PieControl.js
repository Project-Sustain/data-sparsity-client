import { useState, useEffect, memo } from 'react';
import { makeStyles } from "@material-ui/core";
import { Paper, Typography, Stack, Button } from '@mui/material';
import { colors } from '../../../../library/colors';
import chroma from 'chroma-js';
import PieTable from './PieTable';
import CustomPieChart from './CustomPieChart';

const useStyles = makeStyles({
    root: {
        margin: "10px",
        padding: "10px",
        width: '50vw',
        zIndex: 5000,
        opacity: '0.9'
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
});

export default memo(function ScorePieChart(props) {
    const classes = useStyles();
    const [pieData, setPieData] = useState([]);
    const [colorScale, setColorScale] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [scoreSet, setScoreSet] = useState([]);

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
                    <PieTable
                        setSelectedIndex={setSelectedIndex}
                        pieData={pieData}
                        colorScale={colorScale}
                        scoreSet={scoreSet}
                    />

                    <CustomPieChart
                        setSelectedIndex={setSelectedIndex}
                        pieData={pieData}
                    />
                </Stack>

                <Button disabled={selectedIndex === -1} color='secondary' variant='outlined' className={classes.button} onClick={() => setSelectedIndex(-1)}>Clear Selection</Button>
            
            </Paper>
        );
    }

    else return null;
});