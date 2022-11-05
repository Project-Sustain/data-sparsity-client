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
import DeckMap from './refactor/map/DeckMap';
import RequestForm from './refactor/request/RequestForm';


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
    const Sparsity = UseSiteSparsity();
    const Request = UseRequest(Sparsity.functions);
    const Map = UseDeckMap(Sparsity.state, Request);

    /**
     * Saturday 11/5
     * Add request form to map
     * Get request form working with hooks
     * Get icons on map for any state/county
     * 
     * Sunday 11/6
     * Add dashboard components
     */

    return (
        <>
            <Button className={classes.root} variant='outlined' onClick={Request.functions.sendSparsityScoreRequest}>Test Request</Button>
            <DeckMap
                Map={Map}
            />
            <RequestForm
                Request={Request}
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
