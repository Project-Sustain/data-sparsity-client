import { useState } from 'react'
import { makeStyles } from "@material-ui/core";

// Hooks
import { UseSiteSparsity } from './hooks/UseSiteSparsity';
import { UseRequest } from './hooks/UseRequest';
import { UseDeckMap } from './hooks/UseDeckMap';

// Components
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';
import { Button } from '@mui/material';
import DeckMap from './refactor/DeckMap';


const useStyles = makeStyles({
    root: {
        zIndex: 5000,
        opacity: 0.9,
        margin: '10px',
        padding: '10px',
        width: '10vw'
    }
})


export default function App() {
    const classes = useStyles();

    // OLD
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [shapefileCollection, setShapefileCollection] = useState('STATE');
    const [gisjoin, setGisjoin] = useState('G080');


    // NEW
    const [mapViewState, setMapViewState] = useState({
        longitude: -98.5795,
        latitude: 39.8283,
        zoom: 4.3,
        pitch: 30,
        bearing: 0
    });
    const [ currentShapeName, setCurrentShapeName ] = useState('Colorado');
    const [ stateOrCounty, setStateOrCounty ] = useState('COUNTY');
    const [ spatialScope, setSpatialScope ] = useState('G0800690');
    const [ requestStatus, setRequestStatus ] = useState('NO REQUEST');

    const Sparsity = UseSiteSparsity();
    const Request = UseRequest(Sparsity.functions.setSparsityData, Sparsity.functions.setSparsityStats, spatialScope, setRequestStatus, Sparsity.functions.incrementNumberOfResponses);
    const Map = UseDeckMap(Sparsity.state.sparsityData, setCurrentShapeName, setSpatialScope, stateOrCounty);

    return (
        <>
            <Button className={classes.root} variant='outlined' onClick={Request.functions.sendSparsityScoreRequest}>Test Request</Button>
            <DeckMap
                stateLayer={Map.state.stateLayer}
                countyLayer={Map.state.countyLayer}
                iconLayer={Map.state.iconLayer}
                mapViewState={mapViewState}
                setMapViewState={setMapViewState}
                getTooltip={Map.functions.getTooltip}
            />
            {/* <UsMap 
                mapViewState={mapViewState}
                setMapViewState={setMapViewState}
                data={sparsityData} 
                shapefileCollection={shapefileCollection}   
                setGisjoin={setGisjoin} 
                setCurrentShapeName={setCurrentShapeName}
            />
            <Dashbaord 
                setMapViewState={setMapViewState}
                gisjoin={gisjoin}
                currentShapeName={currentShapeName}
                shapefileCollection={shapefileCollection}
                setShapefileCollection={setShapefileCollection}
                sparsityData={sparsityData} 
                setSparsityData={setSparsityData}
                selectedIndex={selectedIndex} 
                setSelectedIndex={setSelectedIndex}
            /> */}
        </>
    );
}
