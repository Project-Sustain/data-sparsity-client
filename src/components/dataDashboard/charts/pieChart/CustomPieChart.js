import { memo } from 'react';
import { makeStyles } from "@material-ui/core";
import { ResponsiveContainer, PieChart, Pie } from 'recharts';
import { Paper, Typography } from '@mui/material';
import PieChartIcon from '@mui/icons-material/PieChart';

const useStyles = makeStyles({
    root: {
        margin: "10px",
        padding: "10px",
        width: "50%"
    }
});

export default memo(function CustomPieChart({pieData, setSelectedIndex}) {
    const classes = useStyles();

    const pieClick = (event, index) => {
        setSelectedIndex(index);
    }

    
    if(pieData.length < 100) {
        return (
            <ResponsiveContainer width='100%' height={500}>
                <PieChart>
                    <Pie
                        data={pieData}
                        dataKey="sites"
                        nameKey="score"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        onClick={pieClick}
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    }

    else return (
        <Paper elevation={2} className={classes.root}>
            <Typography variant='h4' align='center'><PieChartIcon/> Too many slices to render pie</Typography>
        </Paper>
    );
});