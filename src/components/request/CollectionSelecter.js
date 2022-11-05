import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { makeStyles } from "@material-ui/core";
import { sparsityMetadata } from '../../library/metadata';

const useStyles = makeStyles({
    root: {
        margin: "10px",
    }
});


export default function CollectionSelector({collection, setCollection, setBaseline}) {
    const classes = useStyles();

    const updateCollection = (event) => {
        const newCollection = event.target.value;
        setCollection(newCollection);
        setBaseline(newCollection.initialBaseline);
    }

    if(sparsityMetadata.length > 0) {
        return (
            <FormControl className={classes.root}>
                <InputLabel>Dataset</InputLabel>
                <Select
                    MenuProps={{
                        style: {zIndex: 5001}
                    }}
                    value={collection}
                    label="Dataset"
                    onChange={updateCollection}
                >
                    {
                        sparsityMetadata.map((dataset, index) => {
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