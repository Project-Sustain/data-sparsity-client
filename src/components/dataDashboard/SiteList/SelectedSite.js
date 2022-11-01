import { useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { Typography, Stack } from '@mui/material';
import { colors } from '../../../library/colors';
import { Button } from '@mui/material';

const useStyles = makeStyles({
    table: {
        maxHeight: '40vh',
        overflow: 'auto'
    }
});

export default function SelectedSite(props) {
    const classes = useStyles();
    const [pieData, setPieData] = useState([]);
    const [lastHighlight, setLastHighlight] = useState({});

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

    // useEffect(() => {
    //     setLastHighlight({});
    // }, [props.scores]);

    const selectSite = () => {
        const newViewState = {
            longitude: props.site.coordinates[0],
            latitude: props.site.coordinates[1],
            zoom: 17,
            pitch: 30,
            bearing: 0
        }
        props.setMapViewState(newViewState);
        //FIXME Fly map

        let data = [...props.sparsityData];
        if(Object.keys(lastHighlight) > 0) {
            data[lastHighlight.index].color = lastHighlight.color;
        }
        const lastObj = {
            'index': props.index,
            'color': data[props.index].color
        }
        console.log({lastObj})
        setLastHighlight(lastObj);
        data[props.index].color = [1, 255, 0];
        props.setSparsityData(data);
    }
    
    return (
        <Stack direction='row' justifyContent='space-around' alignItems='flex-start' spacing={2}>
            <Stack direction='column' justifyContent='flex-start' className={classes.section}>
                <Typography><strong>Mean Time Between Observations:</strong> {props.site.siteMean}</Typography>
                <Typography><strong>Sparsity Score:</strong> {props.site.sparsityScore}</Typography>
                <Typography><strong>Total Observations:</strong> {props.site.numberOfMeasurements}</Typography>
                {
                    props.site.sitePropertyInfo.map((property, index) => {
                        return <Typography key={index}><strong>{props.collectionProperties[index]}</strong>: {property}</Typography>
                    })
                }
                <Button variant='outlined' onClick={selectSite}>Select</Button>
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

        </Stack>
    );
}