import { Container, Grid, Button, LinearProgress } from '@mui/material';
import DashboardComponent from '../DashboardComponent';
import CollectionSelector from '../../components/request/CollectionSelecter';
import BaselineRadios from '../../components/request/BaselineRadios';
import SpatialRadios from '../../components/request/SpatialRadios';
import TemporalSlider from '../../components/request/TemporalSlider';


export default function RequestForm({Request, currentShapeName}) {


    const renderButtonOrLoading = () => {
        if(Request.state.requestStatus === 'PENDING') {
            return (
                <LinearProgress
                    color='tertiary'
                />
            );
        }
        else {
            return (
                <Button
                    fullWidth
                    variant='outlined'
                    onClick={Request.functions.sendSparsityScoreRequest}
                >
                    Submit Request
                </Button>
            );
        }
    }


    return (
        <Container maxWidth='sm'>
            <DashboardComponent>
                <Grid 
                    container
                    spacing={2}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Grid item xs={12}>
                        <CollectionSelector
                            collection={Request.state.collection}
                            setCollection={Request.functions.setCollection}
                            setBaseline={Request.functions.setBaseline}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BaselineRadios
                            sendUpdateBaselineRequest={Request.functions.sendUpdateBaselineRequest}
                            baseline={Request.state.baseline}
                            setBaseline={Request.functions.setBaseline}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SpatialRadios
                            stateOrCounty={Request.state.stateOrCounty}
                            setStateOrCounty={Request.functions.setStateOrCounty}
                            currentShapeName={currentShapeName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TemporalSlider
                            temporalRange={Request.state.temporalRange}
                            setTemporalRange={Request.functions.setTemporalRange}
                            min={Request.state.startTime}
                            max={Request.state.endTime}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {renderButtonOrLoading()}
                    </Grid>
                </Grid>
            </DashboardComponent>
        </Container>
    );


}