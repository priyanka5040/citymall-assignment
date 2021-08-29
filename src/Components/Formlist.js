import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { useState } from "react";
import SubmittedTable from "./SubmittedTable";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "../style.css";
//localStorage.removeItem('rows');
//localStorage.removeItem('submittedata');
let rows = localStorage.getItem('rows');
let submittedata = localStorage.getItem('submittedata');
rows = !rows ? [] : JSON.parse(rows);
submittedata = !submittedata ? [] : JSON.parse(submittedata);
const Formlist = () => {
    let columns = [
        {headerName : 'Id', field:"Id", checkboxSelection:true},
        {headerName : 'Name', field:"Name"},
        {headerName : 'Email', field:"Email"},
        {headerName : 'Gender', field:"Gender"},
        {headerName : 'DOB', field:"DOB"},
        {headerName : 'Country', field:"Country"},
        {headerName : 'City', field:"City"}
    ];
    let defaultColDef = {
        editable : true
    }
    let [rowDefs, setRowDefs] = useState(rows);
    let [selected, setSelected] = useState([]);
    let [submitted, setSubmitted] = useState(submittedata);
   return (<>
        {localStorage.setItem('rows', JSON.stringify(rowDefs))}
        {localStorage.setItem('submittedata', JSON.stringify(submitted))}
        <div className = "btns">
            {console.log(rowDefs)}
            <button onClick = {()=>{
                localStorage.setItem('rows', JSON.stringify([...rowDefs, { Id :'Id', Name: 'Name', Email: 'Email', Gender: 'Gender', DOB:'DOB', Country:'Country', City:'City', img:""}]));
                console.log(localStorage.getItem('rows'))
                setRowDefs([...rowDefs, { Id :'Id', Name: 'Name', Email: 'Email', Gender: 'Gender', DOB:'DOB', Country:'Country', City:'City', img:"" }])
            }}>Add Row</button>
            <button onClick = {()=>{
                setRowDefs(rowDefs.filter((row)=>{
                    return !selected.includes(row.Id);
                }));
                setSelected([]);
            }}> Delete Selected Rows</button>
            <button onClick={()=>{
                setRowDefs(rowDefs.filter((row)=>{
                    return selected.includes(row.Id);
                }));
                setSelected([]);
            }}>Delete Non Selected Rows</button>
            <button onClick={()=>{
                if(selected.length > 0){
                    console.log(selected);
                    let rowSubmission = rowDefs.filter((row)=>{
                        return(selected.includes(row.Id));
                    })
                    rowSubmission.map((row)=>{
                        for(let i in row){
                            console.log(row[i]);
                            if(row[i].length === 0){
                            }
                            else if(row[i].length <= 2){
                            }
                        }
                        return null;
                    })
                    setSubmitted([...submitted,...rowSubmission])
                    setSelected([]);
                }
            }}>
                Submit
            </button>
        </div>
       <div className="ag-theme-alpine" style={{height: 300, width: '100vw'}}>
           <AgGridReact
               rowData={rowDefs}
               columnDefs = {columns}
               defaultColDef = {defaultColDef}
               rowSelection="multiple"
               onSelectionChanged={(event)=>{
                //console.log(event.api.getSelectedRows())
                setSelected(event.api.getSelectedRows().map((e)=>{
                    return e.Id;
                }));
                //console.log(event.api.getSelectedRows());
               }}
               >
            
           </AgGridReact>
       </div>
       <h3>Submitted data</h3>
       <div>
           <SubmittedTable submitted = {submitted}/>
       </div>
   </>);
};
export default Formlist;