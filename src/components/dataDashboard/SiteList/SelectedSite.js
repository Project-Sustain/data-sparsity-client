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

export default function SelectedSite({site, scores, setMapViewState, sparsityData, setSparsityData, index, collectionProperties}) {
    const classes = useStyles();
    const [pieData, setPieData] = useState([]);
    const [lastHighlight, setLastHighlight] = useState({});

    useEffect(() => {
        if(site){

            const myScore = site.sparsityScore;
            const numberOfSameScores = scores.filter(score => {return score === myScore}).length;
            const numberOfDifferentScores = scores.length - numberOfSameScores;
            setPieData([
                {
                    "name": site.sparsityScore,
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
    }, [site, scores]);

    // useEffect(() => {
    //     setLastHighlight({});
    // }, [scores]);

    const selectSite = () => {
        const newViewState = {
            longitude: site.coordinates[0],
            latitude: site.coordinates[1],
            zoom: 17,
            pitch: 30,
            bearing: 0
        }
        setMapViewState(newViewState);
        //FIXME Fly map

        let data = [...sparsityData];
        if(Object.keys(lastHighlight) > 0) {
            data[lastHighlight.index].color = lastHighlight.color;
        }
        const lastObj = {
            'index': index,
            'color': data[index].color
        }
        console.log({lastObj})
        setLastHighlight(lastObj);
        data[index].color = [1, 255, 0];
        setSparsityData(data);
    }
    
    return (
        <Stack direction='row' justifyContent='space-around' alignItems='flex-start' spacing={2}>
            <Stack direction='column' justifyContent='flex-start' className={classes.section}>
                <Typography><strong>Mean Time Between Observations:</strong> {site.siteMean}</Typography>
                <Typography><strong>Sparsity Score:</strong> {site.sparsityScore}</Typography>
                <Typography><strong>Total Observations:</strong> {site.numberOfMeasurements}</Typography>
                {
                    site.sitePropertyInfo.map((property, index) => {
                        return <Typography key={index}><strong>{collectionProperties[index]}</strong>: {property}</Typography>
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