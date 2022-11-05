import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel, Button } from '@mui/material';


export default function BaselineRadios({sendUpdateBaselineRequest, baseline, setBaseline}) {


    const updateBaseline = (event) => {
        setBaseline(Number(event.target.value));
    }


    return (
        <FormControl>
            <FormLabel id="spatial-scope">
                <Button onClick={sendUpdateBaselineRequest}>Update Baseline</Button>
                </FormLabel>
            <RadioGroup
                row
                aria-labelledby="baseline"
                value={baseline}
                onChange={updateBaseline}
            >
                <FormControlLabel value="60000" control={<Radio />} label="Minute" />
                <FormControlLabel value="3600000" control={<Radio />} label="Hour" />
                <FormControlLabel value="86400000" control={<Radio />} label="Day" />
                <FormControlLabel value="604800000" control={<Radio />} label="Week" />
                <FormControlLabel value="2629800000" control={<Radio />} label="Month" />
            </RadioGroup>
        </FormControl>
    );
    
    
}