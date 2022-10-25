import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button } from '@mui/material';
import { Api } from '../../helpers/api';

export default function BaselineRadios(props) {

    const updateBaseline = (event) => {
        props.setBaseline(Number(event.target.value));
    }

    const sendRequest = async() => {
        Api.sendBaselineRequest(props.baseline, props.setStatus, props.setSparsityData);
        const response = await Api.sendJsonRequest("sparsityStats");
        if(response) {
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
            <Button onClick={sendRequest} variant='outlined'>Update Baseline</Button>
        </FormControl>
    );
    
}