import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from "@material-ui/core";
import { Paper, Typography, LinearProgress, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel, Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { colors } from '../../../helpers/colors';

const useStyles = makeStyles({
    paper: {
        margin: "10px",
        padding: "10px",
        width: '50vw',
        zIndex: 5000,
        opacity: '0.9'
    },
    slider: {
        width: "100%"
    }
});

export default function SparsityScoresChart(props) {
    const classes = useStyles();

    const [data, setData] = useState({});

    useEffect(() => {
            let chartData = [];
            if(props.scores.length > 0) {
                try {
                    const numBuckets = 5;
                    const min = props.scores[props.scores.length-1];
                    const max = props.scores[0];
                    const range = max - min;
                    const rangePerBucket = range / numBuckets;

                    chartData = [0,1,2,3,4].map(index => {
                        const bucketMin = (min+(rangePerBucket*index)).toFixed(3);
                        const bucketMax = (min+(rangePerBucket*(index+1))).toFixed(3);
                        return {name: `${bucketMin} - ${bucketMax}`, numberOfSites: props.scores.filter(score => score >= bucketMin && score < bucketMax).length};
                    });

                } catch (exception) {
                    console.log({exception}); // FIXME Set a flag to display a message...
                }

            setData(chartData);
        }
    }, [props.scores]);

    // const updateScale = (event) => {
    //     const value = parseInt(event.target.value);
    //     setScale(scaleArray[value]);
    // }

    if(props.status === "VALID" && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant='h5' align='center'>Number of Sites Within Sparsity Range</Typography>
                    <ResponsiveContainer width='100%' height={400}>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="numberOfSites" fill={colors.secondary} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                    {/* <FormControl>
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
                    </FormControl> */}
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