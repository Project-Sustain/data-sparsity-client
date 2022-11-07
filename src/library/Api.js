import chroma from 'chroma-js';
import { colors } from './colors';

const flaskIp = '127.0.0.1';
const flaskPort = '5001';

export class Api {

    static url = `http://${flaskIp}:${flaskPort}/`;

    static getRequestBody = (params) => {
        const body = {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        }
        return body;
    }

    static sendStreamRequest = async(collectionName, spatialIdentifier, startTime, endTime, siteIdName, siteCollection, setSiteDataMap, setStatus) => {
        setStatus("PENDING");

        const params = {
            'collectionName': collectionName,
            'spatialIdentifier': spatialIdentifier,
            'startTime': startTime,
            'endTime': endTime,
            'siteIdName': siteIdName,
            'siteCollection': siteCollection
        }

        const body = Api.getRequestBody(params);

        let reader;

        await fetch(Api.url + 'timeSeries', body).then(response => {
            reader = response.body.getReader();
        });

        let streamedResults = [];
        let incompleteResponse = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                if(streamedResults.length > 0) {
                    setSiteDataMap(streamedResults);
                    setStatus("VALID");
                }
                else {
                    setStatus("INVALID");
                }
                break;
            }

            let response = new TextDecoder().decode(value);
            response = incompleteResponse + response;

            while(response.indexOf('\n') !== -1) {
                const parsedResponse = response.substring(0, response.indexOf('\n'));
                const obj = JSON.parse(parsedResponse);
                response = response.substring(response.indexOf('\n') + 1, response.length);
                streamedResults.push(obj);
            }
            if(response.indexOf('\n') === -1 && response.length !== 0){
                incompleteResponse = response;
            }
            else{
                incompleteResponse = "";
            }
        }

    }

    static sendBaselineRequest = async(baseline, setStatus, setSparsityData, incrementNumberOfResponses) => {

        setStatus("PENDING");
        setSparsityData([]);

        const params = {
            'baseline': baseline
        };

        const body = Api.getRequestBody(params);

        let reader;

        await fetch(Api.url + 'updateBaseline', body).then(response => {
            reader = response.body.getReader();
        });

        let stateHasNotBeenSet = true;
        let streamedResults = [];
        let incompleteResponse = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                if(streamedResults.length > 0) {
                    const formattedResults = formatResults(streamedResults);
                    setSparsityData(formattedResults);
                    setStatus("VALID");
                    incrementNumberOfResponses();
                }
                else {
                    setStatus("INVALID");
                }
                break;
            }
            let response = new TextDecoder().decode(value);
            response = incompleteResponse + response;

            while(response.indexOf('\n') !== -1) {
                const parsedResponse = response.substring(0, response.indexOf('\n'));
                const obj = JSON.parse(parsedResponse);
                response = response.substring(response.indexOf('\n') + 1, response.length);
                streamedResults.push(obj);
                if(streamedResults.length % 100 === 0) {
                    const formattedResults = formatResults(streamedResults);
                    setSparsityData(formattedResults);
                    if(stateHasNotBeenSet) {
                        setStatus("VALID");
                        stateHasNotBeenSet = false;
                    }
                }
            }
            if(response.indexOf('\n') === -1 && response.length !== 0){
                incompleteResponse = response;
            }
            else{
                incompleteResponse = "";
            }
        }
        
        function formatResults(streamedResults) {
            // FIXME All sites with same score should have same color. Number of colors should be number of UNIQUE scores
            const initialColorScale = chroma.scale([colors.tertiary, colors.primary]).colors(streamedResults.length);
            const formattedResults = streamedResults.map((result, index) => {
                result.sparsityScore = result.sparsityScore ? result.sparsityScore : 0;
                result.color = hexToRgb(initialColorScale[index]);
                return result;
            });
            return formattedResults;

            // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
            function hexToRgb(hex) {
                var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0 ,0];
            }
        }
    }

    static sendRequest = async(endpoint) => {
        const promise = await fetch(Api.url + endpoint);
        if(promise) {
            return promise.json();
        }
        else return null;
    }

    static sendJsonRequest = async(endpoint, params) => {
        const body = Api.getRequestBody(params);
        const promise = await fetch(Api.url + endpoint, body);

        if(promise) {
            return promise.json();
        }
        else return null;
    }

    static getStreamReader = async(collection, state, ) => {
        const params = {
            'collection': collection,
            'state': state
        };
        const body = Api.getRequestBody(params);
        let reader;
        await fetch(Api.url, body).then(response => {
            reader = response.body.getReader();
        });
        return reader;
    }

    static createIterator = async(reader, scale) => {
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
                        const geometry = {type: "Feature", color: Api.#getColor(scale), name: obj.name, gisjoin: obj.gisjoin, geometry: JSON.parse(obj.geometry)};
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

    static #getColor = (scale) => {
         
        const num =  Math.floor(Math.random() * 10) + 1;

        // Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0 ,0];
        }
        return hexToRgb(scale[num]);
    }
}

