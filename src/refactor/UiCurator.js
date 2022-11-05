import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import DashboardComponent from "./utilityComponents/DashboardComponent";


export default function UiCurator({Curator}) {

    return (
        <DashboardComponent>
            <FormGroup>
                {
                    Curator.state.map((element, index) => {
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
    );

}