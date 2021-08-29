import React from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "../style.css";

function SubmittedTable(props) {
    let { submitted } = props;
    return (
        <div className="ag-theme-alpine" style={{height: 300, width: '90vw'}}>
        <AgGridReact
           
               rowData={submitted}
               
               >
               <AgGridColumn field="Id" sortable={true}></AgGridColumn>
               <AgGridColumn field="Name" ></AgGridColumn>
               <AgGridColumn field="Email" ></AgGridColumn>
               <AgGridColumn field="Gender"></AgGridColumn>
               <AgGridColumn field="DOB" ></AgGridColumn>
               <AgGridColumn field="Country"></AgGridColumn>
               <AgGridColumn field="City" ></AgGridColumn>
           </AgGridReact>
           </div>

    );
}
export default SubmittedTable;