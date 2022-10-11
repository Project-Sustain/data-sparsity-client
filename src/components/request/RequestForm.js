import { useState, useEffect, memo } from 'react';
import { gisStateCounty } from '../../library/gisInfo';
import { sendJsonRequest } from '../../helpers/api';
import { sparsityMetadata } from '../../library/metadata';
import { Paper, Stack, Typography } from '@mui/material';
import SpatialDropdown from './SpatialDropdown';
import SpatialRadios from './SpatialRadios';
import TemporalSlider from './TemporalSlider';
import CollectionSelector from './CollectionSelecter';
import SubmitButton from './SubmitButton';
import { makeStyles } from "@material-ui/core";
import BaselineRadios from './BaselineRadios';
import { Divider } from '@mui/material';

const useStyles = makeStyles({
    paper: {
        margin: "10px",
        padding: "10px",
        width: "50vw",
        zIndex: 5000,
        opacity: '0.9'
    },
    item: {
        margin: '10px'
    }
  });

export default memo(function RequestForm(props) {
    const classes = useStyles();

    const [stateInfo, setStateInfo] = useState([]);
    const [firstTime, setFirstTime] = useState();
    const [lastTime, setLastTime] = useState();
    const [selectedState, setSelectedState] = useState({});
    const [selectedCounty, setSelectedCounty] = useState({});

    const [collection, setCollection] = useState({});
    const [spatialScope, setSpatialScope] = useState("COUNTY");
    const [spatialIdentifier, setSpatialIdentifier] = useState("");
    const [temporalRange, setTemporalRange] = useState([]);
    const [baseline, setBaseline] = useState();
    const selectedConstraints = [];

    useEffect(() => {
        props.setCollectionProperties(collection.sitePropertyFields);
        setBaseline(collection.initialBaseline);
    }, [props, collection]);

    useEffect(() => {
        setStateInfo(gisStateCounty);
        setSelectedState(gisStateCounty[15]);
        setSelectedCounty(gisStateCounty[15].counties[3]);
        setSpatialIdentifier(gisStateCounty[15].GISJOIN);
        setCollection(sparsityMetadata[0]);
        setBaseline(sparsityMetadata[0].initialBaseline);
    }, []);
    
    useEffect(() => {
        switch(spatialScope) {
            case "COUNTRY":
                setSpatialIdentifier("");
                break;
            case "STATE":
                setSpatialIdentifier(selectedState.GISJOIN);
                break;
            case "COUNTY":
                setSpatialIdentifier(selectedCounty.GISJOIN);
                break;
            case "SITE":
                setSpatialIdentifier(""); // FIXME eventually this is a monitorId?
                break;
            default:
                break;                
        }
    }, [selectedState, selectedCounty, spatialScope]);

    useEffect(() => {
        (async () => {
            const collectionName = collection.collection;
            const params = {'collectionName': collectionName}
            const response = await sendJsonRequest("temporalRange", params);
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

    const updateSelectedState = (event) => {
        const newState = event.target.value;
        setSelectedState(newState);
        setSelectedCounty(newState.counties[0]);
    }
    
    const updateSelectedCounty = (event) => {
        setSelectedCounty(event.target.value);
    }

    if(stateInfo.length > 0 && props.inDashboard) {
        return (
            <Paper elevation={3} className={classes.paper}>
                <Typography className={classes.item} align='center' variant='h5'>Data Request Form</Typography>
                <CollectionSelector
                    className={classes.item}
                    setCollection={setCollection}
                    sparsityMetadata={sparsityMetadata}
                    collection={collection}
                />
                <Stack direction='row' justifyContent='space-evenly' className={classes.item}>
                    <SpatialRadios
                        className={classes.item}
                        spatialScope={spatialScope}
                        setSpatialScope={setSpatialScope}
                    />
                    <Divider orientation='vertical' flexItem />
                    <BaselineRadios 
                        className={classes.item}
                        baseline={baseline}
                        setBaseline={setBaseline}
                    />
                </Stack>
                <Stack direction='row' justifyContent='space-between' className={classes.item}>
                    <SpatialDropdown
                        disabled={false}
                        options={stateInfo}
                        label='State'
                        update={updateSelectedState}
                        value={selectedState}
                    />
                    <SpatialDropdown
                        disabled={spatialScope !== 'COUNTY'}
                        options={selectedState.counties.sort((a, b) => {return a.collection - b.collection})}
                        label='County'
                        update={updateSelectedCounty}
                        value={selectedCounty}
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
                    spatialIdentifier={spatialIdentifier}
                    startTime={temporalRange[0]}
                    endTime={temporalRange[1]}
                    measurementTypes={selectedConstraints}
                    baseline={baseline}

                    setStatus={props.setStatus}
                    sparsityData={props.sparsityData}
                    setSparsityData={props.setSparsityData}
                    setSelectedIndex={props.setSelectedIndex}
                    
                    setStats={props.setStats}
                />
            </Paper>
        );
    }

    else return null;
    
})