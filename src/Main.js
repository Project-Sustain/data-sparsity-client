import { useState } from 'react'

// Hooks
import { UseSiteSparsity } from './hooks/UseSiteSparsity';
import { UseRequest } from './hooks/UseRequest';
import { UseDeckMap } from './hooks/UseDeckMap';

// Components
import Dashbaord from './components/Dashboard';
import UsMap from './components/UsMap';
import { Button } from '@mui/material';


export default function App() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sparsityData, setSparsityData] = useState([]);
    const [shapefileCollection, setShapefileCollection] = useState('STATE');
    const [gisjoin, setGisjoin] = useState('G080');


    const [mapViewState, setMapViewState] = useState({
        longitude: -98.5795,
        latitude: 39.8283,
        zoom: 4.3,
        pitch: 30,
        bearing: 0
    });


    const [ currentShapeName, setCurrentShapeName ] = useState('Colorado');
    const [ stateOrCounty, setStateOrCounty ] = useState('STATE');
    const [ spatialScope, setSpatialScope ] = useState('G080');
    const [ requestStatus, setRequestStatus ] = useState('NO REQUEST');

    const { SparsityState, SparsityManagement } = UseSiteSparsity();
    /**
     * Currently SparsityState is null here, but good inside the hook
     * Need to get it here so we can pass it's members along to the other hooks
     */
    console.log({SparsityState});
    // const { RequestState, RequestManagement } = UseRequest(SparsityState.setSparsityData, SparsityState.setSparsityStats, spatialScope, setRequestStatus, SparsityState.incrementNumberOfResponses);
    // const { MapState, MapManagement } = UseDeckMap(SparsityState.sparsityData, setCurrentShapeName, setSpatialScope, stateOrCounty);


    return (
        <>
            <Button onClick={() => console.log({SparsityState})}>Test Request</Button>
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
