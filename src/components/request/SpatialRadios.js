import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';

export default function SpatialRadios({stateOrCounty, setStateOrCounty, currentShapeName}) {


    const updateSpatialScope = (event) => {
        setStateOrCounty(event.target.value);
    }


    return (
        <FormControl>
            <FormLabel>{currentShapeName}</FormLabel>
            <RadioGroup
                row
                value={stateOrCounty}
                onChange={updateSpatialScope}
            >
                <FormControlLabel value="STATE" control={<Radio />} label="State" />
                <FormControlLabel value="COUNTY" control={<Radio />} label="County" />
            </RadioGroup>
        </FormControl>
    );
    
}