import {useState} from 'react'
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { IconLayer } from '@deck.gl/layers';
import {GeoJsonLayer} from '@deck.gl/layers';
import { Button } from '@mui/material';
import { makeStyles } from '@material-ui/core';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -105.086559,
    latitude: 40.573733,
    zoom: 13,
    pitch: 0,
    bearing: 0
};

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

  const useStyles = makeStyles({
    root: {
        zIndex: 5001
    }
});

export default function UsMap({data, shapefileCollection}) {
    const classes = useStyles();

    /*
    - Get all state shapefiles from mongodb, push into stateLayer
    - When a state is clicked, get all counties for that state into countyLayer
    - Selecting State or County from radios changes GISJOIN state in RequestForm.js,
        which is coming from the picked shapefile
    */

    const [stateLayer, setStateLayer] = useState([]);
    const [countyLayer, setCountyLayer] = useState([]);

    async function createIterator(reader){
        const myAsyncIterable = {
            async *[Symbol.asyncIterator]() {
                let incompleteResponse = ""
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        console.log('The stream is done.');
                        break;
                    }
                    let response = new TextDecoder().decode(value);
                    response = incompleteResponse + response;

                    while(response.indexOf('\n') !== -1) {
                        const parsedResponse = response.substring(0, response.indexOf('\n'));
                        const obj = JSON.parse(parsedResponse);
                        response = response.substring(response.indexOf('\n') + 1, response.length);
                        const geometry = {type: "Feature", geometry: JSON.parse(obj.geometry)};
                        yield geometry;
                    }
                    if(response.indexOf('\n') === -1 && response.length !== 0){
                        incompleteResponse = response;
                    }
                    else{
                        incompleteResponse = "";
                    }
                }
            }
        };

        return myAsyncIterable;
    }

    let myAsyncIteratorState;
    let myAsyncIteratorCounty;

    const sendShapefileRequest = async() => {
        setStateLayer([]);
        // setCountyLayer([]);

        const paramsState = {
            'collection': 'state_geo',
            'stateFP': '00',
        };

        const bodyState = {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(paramsState)
        };

        const url = "http://127.0.0.1:5000/shapefiles";

        let readerState;

        await fetch(url, bodyState).then(response => {
            readerState = response.body.getReader();
        });

        myAsyncIteratorState = await createIterator(readerState);
        setStateLayer([
            new GeoJsonLayer({
                id: 'statelayer', 
                data: myAsyncIteratorState, 
                filled: false,
                getLineColor: [0, 0, 0],
                truelineWidthScale: 15,
                lineWidthMinPixels: 2,
                getLineWidth: 1,
            })
        ]);

        const paramsCounty = {
            'collection': 'county_geo',
            'stateFP': '00',
        };

        const bodyCounty = {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(paramsCounty)
        };

        let readerCounty;
        
        await fetch(url, bodyCounty).then(response => {
            readerCounty = response.body.getReader();
        });

        myAsyncIteratorCounty = await createIterator(readerCounty);
        setCountyLayer([
            new GeoJsonLayer({
                id: 'countylayer', 
                data: myAsyncIteratorCounty, 
                filled: true, 
                opacity: 0.01, 
                getFillColor: [76, 201, 240],
                getLineColor: [0, 0, 0],
                truelineWidthScale: 10,
                lineWidthMinPixels: 1,
                getLineWidth: 1,
            })
        ]);

    }

    const iconLayer = new IconLayer({
        id: 'icon-layer',
        pickable: true,
        data,
        iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        sizeScale: 15,
        getIcon: d => 'marker',
        getPosition: d => d.coordinates,
        getSize: d => 2,
        getColor: d => d.color,
        getFillColor: d => d.color
    });

    return (
        <>
            <Button className={classes.root} onClick={sendShapefileRequest} variant='outlined'>Stream Shapefiles</Button>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[iconLayer, stateLayer, countyLayer]}
                getTooltip={({object}) => object && `${object.monitorId}\nAbsolute Sparsity Score: ${object.sparsityScore}`}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}