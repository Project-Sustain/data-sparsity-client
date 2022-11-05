import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import DashboardComponent from "../utilityComponents/DashboardComponent";


const useStyles = makeStyles({
    root: {
        width: '15vw'
    },
});


export default function UiCurator({Curator, requestStatus}) {
    const classes = useStyles();

    /**
     * Only display Request Form & Map Legend until data returns, then display all
     * @returns Array of Curator.stateMap items
     */
    const getOptionsList = () => {
        if(requestStatus === 'VALID') {
            return Curator.stateMap;
        }
        else {
            return [Curator.stateMap[0], Curator.stateMap[1]];
        }
    }


    return (
        <div className={classes.root}>
            <DashboardComponent>
                <FormGroup>
                    {
                        getOptionsList().map((element, index) => {
                            return (
                                <FormControlLabel
                                    key={index}
                                    control={
                                        <Checkbox
                                            checked={element.state}
                                            onChange={element.function}
                                        />
                                    }
                                    label={element.name}
                                />
                            );
                        })
                    }
                </FormGroup>
            </DashboardComponent>
        </div>
    );

}