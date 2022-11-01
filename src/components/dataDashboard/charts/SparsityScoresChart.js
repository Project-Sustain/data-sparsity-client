import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { makeStyles } from "@material-ui/core";
import { Paper, Typography, Stack } from "@mui/material";
import { useEffect, useState } from 'react';
import { colors } from '../../../library/colors';

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
                        return {
                            name: `${bucketMin} - ${bucketMax}`, 
                            numberOfSites: props.scores.filter(score => {
                                const lessThanMax = index === 4 ? score <= bucketMax : score < bucketMax;
                                return score >= bucketMin && lessThanMax;
                            }).length};
                    });

                } catch (exception) {
                    console.log({exception}); // FIXME Set a flag to display a message...
                }

            setData(chartData);
        }
    }, [props.scores]);

    if(props.inDashboard) {
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
                </Stack>
            </Paper>
        );
    }
    
    else return null;
}