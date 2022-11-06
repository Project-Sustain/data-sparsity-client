import { ButtonGroup, Button } from "@mui/material";


export default function TabSystem({currentTab, setCurrentTab}) {


    const tabs = [
        'Request Form', 'Statistics', 'Pie & Bar Chart', 'Time Series', 'Site Data'
    ];


    const getVariant = (index) => {
        if(index === currentTab) return 'filled';
        else return '';
    };


    return (
        <ButtonGroup variant='outlined'>
            {
                tabs.map((title, index) => {
                    return (
                            <Button 
                                key={index} 
                                onClick={() => setCurrentTab(index)}
                                variant={getVariant(index)}
                            >
                                {title}
                            </Button>
                    );
                })
            }
        </ButtonGroup>
    );


}