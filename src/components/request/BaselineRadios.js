import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button } from '@mui/material';
import { sendJsonRequest } from '../../helpers/api';
import chroma from 'chroma-js';
import { colors } from '../../helpers/colors';

export default function BaselineRadios(props) {

    const updateBaseline = (event) => {
        props.setBaseline(Number(event.target.value));
    }

    const sendBaselineRequest = async() => {

        props.setStatus("PENDING");
        props.setSparsityData([]);

        const params = {
            'baseline': props.baseline
        };

        const response = await sendJsonRequest("updateBaseline", params);

        // FIXME This is duplication from SubmitButton - refactor into a hook
        if(response && Object.keys(response).length > 0) {
            console.log({response})
            props.setStats({
                'minTimeBetweenObservations': response.diffStats[0],
                'maxTimeBetweenObservations': response.diffStats[1],
                'meanTimeBetweenObservations': response.diffStats[2],
                'stdDevTimeBetweenObservations': response.diffStats[3],

                'minNumberOfObservations': response.obsStats[0],
                'maxNumberOfObservations': response.obsStats[1],
                'meanNumberOfObservations': response.obsStats[2],
                'stdDevNumberOfObservations': response.obsStats[3],

                'minSparsity': response.sparsityStats[0],
                'maxSparsity': response.sparsityStats[1],
                'meanSparsity': response.sparsityStats[2] ? response.sparsityStats[2] : 0.0,
                'stdDevSparsity': response.sparsityStats[3]
            });
            const data = response.siteData;
            const formattedResults = formatResults(data);
            props.setSparsityData(formattedResults);
            props.setSelectedIndex(0);
            props.setStatus(formattedResults.length > 0 ? "VALID" : "INVALID");
        }

        else {
            console.log("ERROR in response");
            props.setStatus("INVALID");
        }

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