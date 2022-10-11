import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button } from '@mui/material';
import { sendJsonRequest } from '../../helpers/api';

export default function BaselineRadios(props) {

    const updateBaseline = (event) => {
        props.setBaseline(Number(event.target.value));
    }

    const sendBaselineRequest = async() => {

        // props.setStatus("PENDING");
        // props.setSparsityData([]);

        const params = {
            'baseline': props.baseline
        };

        const response = await sendJsonRequest("updateBaseline", params);
        
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
            <Button onClick={sendBaselineRequest} variant='outlined'>Update Baseline</Button>
        </FormControl>
    );
    
}