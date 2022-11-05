import Slider from '@mui/material/Slider';
import moment from 'moment';
import { FormControl, FormLabel } from '@mui/material';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        width: "95%"
    }
});

export default function TemporalSlider({temporalRange, setTemporalRange, min, max}) {
    const classes = useStyles();


    const handleChange = (event, newValue) => {
        setTemporalRange(newValue);
    };

    function valueText(value) {
        return moment.unix(value/1000).format('MM/DD/YYYY');
    }


  if(temporalRange && min && max) {
    return (
        <FormControl className={classes.root}>
            <FormLabel id='temporalSlider' align='center'>{valueText(temporalRange[0])} - {valueText(temporalRange[1])}</FormLabel>
            <Slider
                aria-labelledby='temporalSlider'
                min={min}
                max={max}
                value={temporalRange}
                onChange={handleChange}
                valueLabelDisplay="auto"
                disableSwap
                getAriaValueText={valueText}
                valueLabelFormat={valueText}
                step={1000*60*24}
            />
        </FormControl>
    );
  }
  else return null;
}