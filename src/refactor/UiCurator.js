import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import DashboardComponent from "./utilityComponents/DashboardComponent";


export default function UiCurator({CuratorMap}) {

    return (
        <DashboardComponent>
            <FormGroup>
                {
                    CuratorMap.map((element, index) => {
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