import { FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        margin: "10px",
    },
    select: {
        zIndex: 5001
    }
  });


export default function CollectionSelector(props) {
    const classes = useStyles();

    const updateCollection = (event) => {
        props.setCollection(event.target.value);
    }

    if(props.sparsityMetadata.length > 0) {
        return (
            <FormControl fullWidth className={classes.root}>
                <InputLabel>Dataset</InputLabel>
                <Select
                    className={classes.select}
                    value={props.collection}
                    label="Dataset"
                    onChange={updateCollection}
                >
                    {
                        props.sparsityMetadata.map((dataset, index) => {
                            return (
                                <MenuItem key={index} value={dataset}>{dataset.label}</MenuItem>
                            );
                        })
                    }
                </Select>
            </FormControl>
        );
    }

    else return null;
    
}