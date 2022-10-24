import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button } from '@mui/material';
import { Api } from '../../helpers/api';

export default function BaselineRadios(props) {

    const updateBaseline = (event) => {
        props.setBaseline(Number(event.target.value));
    }

    const sendRequest = () => {
        const params = {
            'baseline': props.baseline
        };
        Api.sendBaselineRequest(params, props.setStatus, props.setSparsityData);
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