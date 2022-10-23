import {useState, useEffect} from 'react';
import {GeoJsonLayer} from '@deck.gl/layers';
import chroma from 'chroma-js';
import {colors} from '../helpers/colors';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { BASEMAP } from '@deck.gl/carto';
import { IconLayer } from '@deck.gl/layers';
// import UseShapefileLoader from '../hooks/UseShapefileLoader';

// Viewport settings
const INITIAL_VIEW_STATE = {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4.3,
    pitch: 30,
    bearing: 0
};

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

export default function UsMap({data, shapefileCollection, setGisjoin}) {

    const [selectedState, setSelectedState] = useState('');
    const [selectedShape, setSelectedShape] = useState({});
    const [stateLayer, setStateLayer] = useState([]);
    const [countyLayer, setCountyLayer] = useState([]);

    const countyColors = chroma.scale([colors.countyLight, colors.countyDark]).colors(15);
    const stateColors = chroma.scale([colors.state, colors.state]).colors(15);

    useEffect(() => {
      console.log({selectedShape});
      setGisjoin(selectedShape.gisjoin);
    }, [selectedShape]);

    useEffect(() => {
      if(shapefileCollection === 'COUNTY') {
          sendCountyShapefileRequest(selectedState);
      }
      else {
        setCountyLayer([]);
      }
    }, [shapefileCollection, selectedState]);

    useEffect(() => {
        sendShapefileRequest();
    }, []);

    function getColor(scale) {
         
        const num =  Math.floor(Math.random() * 10) + 1;

        // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0 ,0];
        }
        return hexToRgb(scale[num]);
    }

    async function createIterator(reader, scale){
        const myAsyncIterable = {
            async *[Symbol.asyncIterator]() {
                let incompleteResponse = ""
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) {
                        break;
                    }
                    let response = new TextDecoder().decode(value);
                    response = incompleteResponse + response;

                    while(response.indexOf('\n') !== -1) {
                        const parsedResponse = response.substring(0, response.indexOf('\n'));
                        const obj = JSON.parse(parsedResponse);
                        response = response.substring(response.indexOf('\n') + 1, response.length);
                        const geometry = {type: "Feature", color: getColor(scale), name: obj.name, gisjoin: obj.gisjoin, geometry: JSON.parse(obj.geometry)};
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

    let myAsyncIteratorCounty;
    let myAsyncIteratorState;

    const sendShapefileRequest = async() => {
        setStateLayer([]);
        setCountyLayer([]);

        const paramsState = {
            'collection': 'state_geo',
            'state': ''
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

        const handleStateClick = (info, event) => {
            setSelectedState(info.object.name);
            setSelectedShape(info.object);
        }

        myAsyncIteratorState = await createIterator(readerState, stateColors);
        setStateLayer([
            new GeoJsonLayer({
                id: 'statelayer', 
                data: myAsyncIteratorState, 
                pickable: true,
                filled: true, 
                opacity: 0.01, 
                getFillColor: d => d.color,
                getLineColor: [0, 0, 0],
                truelineWidthScale: 15,
                lineWidthMinPixels: 2,
                getLineWidth: 1,
                onClick: handleStateClick
            })
        ]);
    }


    const sendCountyShapefileRequest = async(stateName) => {
      console.log("Sending request for " + stateName)
        setCountyLayer([]);

        const url = "http://127.0.0.1:5000/shapefiles";

        const paramsCounty = {
            'collection': 'county_geo',
            'state': stateName
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

        const handleCountyClick = (info, event) => {
          setSelectedShape(info.object);
        }

        myAsyncIteratorCounty = await createIterator(readerCounty, countyColors);
        setCountyLayer([
            new GeoJsonLayer({
                id: 'countylayer', 
                data: myAsyncIteratorCounty, 
                pickable: true,
                filled: true, 
                opacity: 0.01, 
                getFillColor: d => d.color,
                getLineColor: [0, 0, 0],
                truelineWidthScale: 15,
                lineWidthMinPixels: 1,
                getLineWidth: 1,
                onClick: handleCountyClick
            })
        ]);

    }



  
  // const {stateLayer, countyLayer} = UseShapefileLoader(shapefileCollection);


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

    function getTooltip({object}) {
        return object && `${object.name}`;
    }

    return (
        <>
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                layers={[iconLayer, stateLayer, countyLayer]}
                getTooltip={getTooltip}
              >
                <StaticMap mapStyle={BASEMAP.POSITRON} />
            </DeckGL>
        </>
    );
}