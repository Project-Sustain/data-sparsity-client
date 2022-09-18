
import { React } from 'react'
import { Typography, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function SparsityTable(props) {

    return (
      <Stack direction='column' justifyContent='center' alignItems='center'>
        <Typography align='center' variant='h5'>Sparsity Score Table</Typography>
        {returnDataGrid()}
      </Stack>
    );

    function returnDataGrid() {
      const columns = [
        {field: 'id', headerName: '', width: 50},
        {field: 'monitorId', headerName: 'Monitor ID', width: 300},
        {field: 'sparsityScore', headerName: 'Sparsity Score', width: 125}
      ]
      const rows = props.sparsityData.map((site, index) => {
        return {id: index, monitorId: site.monitorId, sparsityScore: site.sparsityScore};
      });
      return (
        <div style={{ height: 400, width: 500 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[100]}
            onCellClick={params => {props.setSelectedIndex(params.id)}}
          />
        </div>
      );
    }

}
