import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from "@material-ui/core";
import { Paper, Slider, Typography, LinearProgress, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { mean, standardDeviation, median } from 'simple-statistics';
import { colors } from '../../../helpers/colors';

const useStyles = makeStyles({
    paper: {
        margin: "10px",
        padding: "10px",
        width: '50vw'
    },
    slider: {
        width: "100%"
    }
});

export default function SparsityScoresChart(props) {
    const classes = useStyles();

    const scaleArray = [
        {'name': 'Exponential 1', 'cutoffs': [0.001, 0.01, 0.1, 1]},
        {'name': 'Exponential 2', 'cutoffs': [1, 10, 100, 1000]},
        {'name': 'Log 1', 'cutoffs': [0.1, 1, 1.1, 1.01]},
        {'name': 'Linear 1', 'cutoffs': [25, 50, 75, 100]},
        {'name': 'Linear 2', 'cutoffs': [50, 100, 150, 200]}
    ];

    const [data, setData] = useState({});
    const [average, setAverage] = useState(0);
    const [stdDev, setStdDev] = useState(0);
    const [med, setMed] = useState(0);
    const [scale, setScale] = useState(scaleArray[0]);
    const [numBuckets, setNumBuckets] = useState(5);

    useEffect(() => {
        if(props.scores.length > 0){
            setStdDev(standardDeviation(props.scores).toFixed(2));
            setAverage(mean(props.scores).toFixed(2));
            setMed(median(props.scores).toFixed(2));
        }
    }, [props.scores]);

    useEffect(() => {
        if(props.scores.length > 0) {

            /**
             * NOTE: There are numBuckets-1 cutoffs!
             * 
             * First, get the cutoffs array aka scale.scale array based off of numBuckets
             * and low/high for the selected scale (exp, log, lin)
             * 
             * Then, create the buckets dynamically and add them as objects with a name field and numberOfSites field
             */
            // const chartData = [...Array(numBuckets).keys()].map(index => {
                const chartData = [0, 1, 2, 3, 4].map(index => {
                switch(index){
                    case 0:
                        return {name: `0-${scale.cutoffs[index]}`, numberOfSites: props.scores.filter(score => score < scale.cutoffs[index]).length};
                    case numBuckets-1:
                        return {name: `>${scale.cutoffs[index-1]}`, numberOfSites: props.scores.filter(score => score >= scale.cutoffs[index-1]).length};
                    default:
                        return {name: `${scale.cutoffs[index-1]}-${scale.cutoffs[index]}`, numberOfSites: props.scores.filter(score => score >= scale.cutoffs[index-1] && score < scale.cutoffs[index]).length};
                }
            });

            setData(chartData);
        }
    }, [props.scores, scale, numBuckets]);

    const updateScale = (event) => {
        const value = parseInt(event.target.value);
        setScale(scaleArray[value]);
    }

    const updateNumBuckets = (event) => {
        setNumBuckets(parseInt(event.target.value));
    }

    if(props.status === "VALID" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant='h5' align='center'>Mean: {average}, Median:{med}, Std Dev: {stdDev}</Typography>
                    <ResponsiveContainer width='100%' height={400}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="numberOfSites" fill={colors.secondary} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                    {/* <FormControl className={classes.slider}>
                        <FormLabel align='center' color='secondary' id="slider">Number of Bars</FormLabel>
                        <Slider
                            aria-labelledby="slider"
                            min={5}
                            max={20}
                            step={1}
                            value={numBuckets}
                            onChange={updateNumBuckets}
                            color='secondary'
                            valueLabelDisplay="auto"
                            marks
                        />
                    </FormControl> */}
                    <FormControl>
                        <FormLabel align='center' color='secondary' id="scale">X-Axis Scale</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="scale"
                            value={scaleArray.findIndex((element) => {return element.name === scale.name})}
                            onChange={updateScale}
                        >
                            {scaleArray.map((scale, index) => {
                                    return <FormControlLabel key={index} value={index} control={<Radio color='secondary' />} label={scale.name} />
                            })}
                        </RadioGroup>
                    </FormControl>
                </Stack>
            </Paper>
        );
    }

    else if(props.status === "INVALID" && props.inDashboard) {
        return (
            <Paper elevation={2} className={classes.paper}>
                <Typography>No Data Matching Request</Typography>
            </Paper>
        );
    }

    else if(props.status === "PENDING" && props.inDashboard) {
        return (
            <Paper elevation={2} className={classes.paper}>
                <Typography>Chart Loading...</Typography>
                <LinearProgress color='secondary' />
            </Paper>
        );
    }
    
    else return null;
}