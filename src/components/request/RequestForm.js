import { useState, useEffect, memo } from 'react';
import { gisStateCounty } from '../../library/gisInfo';
import { Api } from '../../helpers/api';
import { sparsityMetadata } from '../../library/metadata';
import { Paper, Stack, Typography } from '@mui/material';
import SpatialRadios from './SpatialRadios';
import TemporalSlider from './TemporalSlider';
import CollectionSelector from './CollectionSelecter';
import SubmitButton from './SubmitButton';
import { makeStyles } from "@material-ui/core";
import BaselineRadios from './BaselineRadios';

const useStyles = makeStyles({
    paper: {
        margin: "10px",
        padding: "10px",
        width: "80vw",
        zIndex: 5000,
        opacity: '0.9'
    },
    item: {
        margin: '10px'
    }
  });

export default memo(function RequestForm(props) {
    const classes = useStyles();

    const [firstTime, setFirstTime] = useState();
    const [lastTime, setLastTime] = useState();

    const [collection, setCollection] = useState(sparsityMetadata[0]);
    const [temporalRange, setTemporalRange] = useState([]);
    const [baseline, setBaseline] = useState(sparsityMetadata[0].initialBaseline);
    const selectedConstraints = [];

    useEffect(() => {
        props.setCollectionProperties(sparsityMetadata[0].sitePropertyFields);
    }, []);
    

    useEffect(() => {
        (async () => {
            const collectionName = collection.collection;
            const params = {'collectionName': collectionName}
            const response = await Api.sendJsonRequest("temporalRange", params);
            if(response) {
                const first = parseInt(response.firstTime);
                const last = parseInt(response.lastTime);
                setFirstTime(first);
                setLastTime(last);
                setTemporalRange([first, last]);
            }
            else console.log("ERROR sending serverConnection request");
        })();
    }, [collection]);

    if(props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.item} align='center' variant='h5'>Data Request Form</Typography>
                <CollectionSelector
                    className={classes.item}
                    setCollection={setCollection}
                    setBaseline={setBaseline}
                    setCollectionProperties={props.setCollectionProperties}
                    sparsityMetadata={sparsityMetadata}
                    collection={collection}
                />
                <Stack direction='row' justifyContent='space-evenly' className={classes.item}>
                    <SpatialRadios
                        className={classes.item}
                        shapefileCollection={props.shapefileCollection}
                        setShapefileCollection={props.setShapefileCollection}
                        currentShapeName={props.currentShapeName}
                    />
                    <BaselineRadios 
                        className={classes.item}
                        disableButton={props.status !== "VALID"} // FIXME Reconsider
                        baseline={baseline}
                        setBaseline={setBaseline}
                        setRequest={props.setRequest}

                        setStatus={props.setStatus}
                        setSparsityData={props.setSparsityData}
                        setSelectedIndex={props.setSelectedIndex}
                        setStats={props.setStats}
                    />
                </Stack>
                <Stack direction='row' justifyContent='center' className={classes.item}>
                    <TemporalSlider
                        min={firstTime}
                        max={lastTime}
                        temporalRange={temporalRange}
                        setTemporalRange={setTemporalRange}
                    />
                </Stack>
                <SubmitButton 
                    className={classes.item}
                    collection={collection}
                    startTime={temporalRange[0]}
                    endTime={temporalRange[1]}
                    measurementTypes={selectedConstraints}
                    baseline={baseline}
                    gisjoin={props.gisjoin}

                    setStatus={props.setStatus}
                    setSparsityData={props.setSparsityData}
                    setSelectedIndex={props.setSelectedIndex}
                    setStats={props.setStats}
                    setRequest={props.setRequest}
                />
            </Paper>
        );
    }

    else return null;
    
})