import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button } from '@mui/material';
import { sendJsonRequest } from '../../helpers/api';
import chroma from 'chroma-js';
import { colors } from '../../helpers/colors';

export default function BaselineRadios(props) {

    const updateBaseline = (event) => {
        props.setBaseline(Number(event.target.value));
    }


    async function createIterator(reader){
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
                        console.log({obj})
                        yield obj;
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

    let myAsyncInterator;

    const sendBaselineRequest = async() => {

        props.setStatus("PENDING");
        props.setSparsityData([]);

        const params = {
            'baseline': props.baseline
        };

        const body = {
            'method':'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(params)
        };

        const url = "http://127.0.0.1:5000/updateBaseline";

        let reader;

        await fetch(url, body).then(response => {
            reader = response.body.getReader();
        });

        myAsyncInterator = await createIterator(reader);


        
        // FIXME do ALL this on the server...
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

    return (
        <FormControl>
            <FormLabel id="spatial-scope">Baseline</FormLabel>
            <RadioGroup
                row
                aria-labelledby="baseline"
                value={props.baseline}
                onChange={updateBaseline}
            >
                <FormControlLabel value="60000" control={<Radio />} label="Minute" />
                <FormControlLabel value="3600000" control={<Radio />} label="Hour" />
                <FormControlLabel value="86400000" control={<Radio />} label="Day" />
                <FormControlLabel value="604800000" control={<Radio />} label="Week" />
                <FormControlLabel value="2629800000" control={<Radio />} label="Month" />
            </RadioGroup>
            <Button disabled={props.disableButton} onClick={sendBaselineRequest} variant='outlined'>Update Baseline</Button>
        </FormControl>
    );
    
}