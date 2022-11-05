import { Stack } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';

export default function SpatialRadios({stateOrCounty, setStateOrCounty, currentShapeName}) {

    const updateSpatialScope = (event) => {
        setStateOrCounty(event.target.value);
    }

    return (
        <Stack 
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <FormControl fullWidth>
                <FormLabel id="spatial-scope">{currentShapeName}</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="spatial-scope"
                    value={stateOrCounty}
                    onChange={updateSpatialScope}
                >
                    <FormControlLabel value="STATE" control={<Radio />} label="State" />
                    <FormControlLabel value="COUNTY" control={<Radio />} label="County" />
                </RadioGroup>
            </FormControl>
        </Stack>
    );
    
}