import { Container, Stack } from '@mui/material';
import RequestForm from './request/RequestForm';
import DashboardCurator from './dataDashboard/DashboardCurator';
import MapLegend from './MapLegend';


export default function DashbaordControl(props) {

    const RenderLegend = () => {
        if(props.status === "VALID" && props.sparsityData.length > 0) {
            return (
                <MapLegend 
                    min={props.sparsityData[0].sparsityScore} 
                    max={props.sparsityData[props.sparsityData.length-1].sparsityScore}
                />
            );
        }
        else return null;
    }

    return (
        <>
            <Container maxWidth='auto'>
                <Stack direction='row' justifyContent='flex-end' alignItems='stretch'>
                    <RequestForm 
                        inDashboard={props.request}
                        status={props.status}
                        shapefileCollection={props.shapefileCollection}
                        gisjoin={props.gisjoin}
                        currentShapeName={props.currentShapeName}
                        setShapefileCollection={props.setShapefileCollection}
                        setStatus={props.setStatus}
                        setStats={props.setStats}
                        setCollectionProperties={props.setCollectionProperties} 
                        setRequest={props.setRequest}
                        setSparsityData={props.setSparsityData} 
                        setSelectedIndex={props.setSelectedIndex} 
                    />
                    <RenderLegend/>
                    <DashboardCurator 
                        dashboardStatus={props.dashboardStatus} 
                        status={props.status} 
                    />
                </Stack>
            </Container>
        </>
    )

}
