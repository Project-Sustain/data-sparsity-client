import { useState, useEffect, memo } from 'react';
import { makeStyles } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie, Legend } from 'recharts';
import { Typography, Stack } from '@mui/material';
import { colors } from '../../../library/colors';
import { Button } from '@mui/material';
import { ButtonGroup } from '@mui/material';

const useStyles = makeStyles({
    table: {
        maxHeight: '40vh',
        overflow: 'auto'
    }
});

export default memo(function SelectedSite({site, scores, setMapViewState, sparsityData, setSparsityData, index, collectionProperties}) {
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

    /**
     * There is a bug if you remove the Site Data component from the dashboard. This resets to local state so
     *  lastHighlight goes back to {}. Store this state higher? The refactor should fix this...
     */

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
        if(Object.keys(lastHighlight).length > 0) {
            data[lastHighlight.index].color = lastHighlight.color;
        }
        setLastHighlight({
            'index': index,
            'color': data[index].color
        });
        data[index].color = [1, 255, 0];
        setSparsityData(data);
    }

    const deselectSite = () => {
        let data = [...sparsityData];
        data[lastHighlight.index].color = lastHighlight.color;
        setLastHighlight({});
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
                <ButtonGroup>
                    <Button variant='outlined' onClick={selectSite}>Select</Button>
                    <Button disabled={Object.keys(lastHighlight).length === 0} variant='outlined' onClick={deselectSite}>Deselect</Button>
                </ButtonGroup>
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
});