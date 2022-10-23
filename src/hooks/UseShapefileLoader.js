import {useEffect, useState} from 'react'
import {GeoJsonLayer} from '@deck.gl/layers';
import chroma from 'chroma-js';
import {colors} from '../helpers/colors';

export default function UseShapefileLoader(props){

    const [selectedState, setSelectedState] = useState('');
    const [selectedCounty, setSelectedCounty] = useState('');
    const [stateLayer, setStateLayer] = useState([]);
    const [countyLayer, setCountyLayer] = useState([]);

    const countyColors = chroma.scale([colors.countyLight, colors.countyDark]).colors(15);
    const stateColors = chroma.scale([colors.state, colors.state]).colors(15);

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
                        const geometry = {type: "Feature", color: getColor(scale), name: obj.name, geometry: JSON.parse(obj.geometry)};
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
            sendCountyShapefileRequest(info.object.name);
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
            setSelectedCounty(info.object.name);
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

    return {stateLayer, countyLayer};
}