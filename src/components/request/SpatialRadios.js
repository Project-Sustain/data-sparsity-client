import { TextField, Stack } from '@mui/material';
import { FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@mui/material';

export default function SpatialRadios(props) {

    const updateSpatialScope = (event) => {
        props.setShapefileCollection(event.target.value);
    }

    return (
        <Stack 
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <FormControl fullWidth>
                <FormLabel id="spatial-scope">Spatial Scope</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="spatial-scope"
                    value={props.shapefileCollection}
                    onChange={updateSpatialScope}
                >
                    <FormControlLabel value="STATE" control={<Radio />} label="State" />
                    <FormControlLabel value="COUNTY" control={<Radio />} label="County" />
                </RadioGroup>
            </FormControl>
            <TextField
                fullWidth
                id='current'
                // label='Current Scope'
                variant='standard'
                value={props.currentShapeName}
            />
        </Stack>
    );
    
}