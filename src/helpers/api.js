import chroma from 'chroma-js';
import { colors } from './colors';

export class Api {

    static url = "http://127.0.0.1:5000/";

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

    static sendBaselineRequest = async(baseline, setStatus, setSparsityData) => {

        setStatus("PENDING");
        setSparsityData([]);

        const params = {
            'baseline': baseline
        };

        const body = Api.getRequestBody(params);

        let reader;

        await fetch(this.url + 'updateBaseline', body).then(response => {
            reader = response.body.getReader();
        });

        let streamedResults = [];
        let incompleteResponse = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                const formattedResults = formatResults(streamedResults);
                setSparsityData(formattedResults);
                setStatus("VALID");
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
        
        function formatResults(streamedResults) {
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
}


export async function sendRequest(endpoint) {
    const url = "http://127.0.0.1:5000/";
    const promise = await fetch(url + endpoint);
    if(promise) {
        return promise.json();
    }
    else return null;
}

export async function sendJsonRequest(endpoint, params) {
    const url = "http://127.0.0.1:5000/";
    const body = {
        'method':'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(params)
    }
    const promise = await fetch(url + endpoint, body);
    if(promise) {
        return promise.json();
    }
    else return null;
}

