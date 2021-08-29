import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import { useState } from "react";
import SubmittedTable from "./SubmittedTable";
import 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "../style.css";


//localStorage.removeItem('rows');
localStorage.removeItem('submittedata');
let rows = localStorage.getItem('rows');
let submittedata = localStorage.getItem('submittedata');

rows = !rows ? [] : JSON.parse(rows);
submittedata = !submittedata ? [] : JSON.parse(submittedata);

const Formlist = () => {
    let [rowDefs, setRowDefs] = useState(rows);
    let [selected, setSelected] = useState([]);
    let [submitted, setSubmitted] = useState(submittedata);
    let [isSubmit, setIsSubmit] = useState(false);

    const useStyles = makeStyles((theme) => ({
        container: {
          display: 'flex',
          flexWrap: 'wrap',
        },
        textField: {
          marginLeft: theme.spacing(1),
          marginRight: theme.spacing(1),
          width: 200,
        },
        formControl: {
            minWidth: 120,
          },
          
      }));
      const classes = useStyles();
    

    let columns = [
        {headerName : 'Id', field:"Id", checkboxSelection:true},
        {headerName : 'Name', field:"Name"},
        {headerName : 'Email', field:"Email"},
        {headerName : 'Gender', field:"Gender",

        cellRendererFramework : (params)=>{
            return<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Gender"
              value = {rowDefs[params.rowIndex] ? rowDefs[params.rowIndex].Gender : 'Gender'}
              onChange={(e)=>{
                if(rowDefs[params.rowIndex]){
                    let newR = rowDefs;
                    newR[params.rowIndex].Gender = e.target.value;
                    setRowDefs(newR);
                }
              }}
            >
              
              <MenuItem value={'Gender'}>Gender</MenuItem>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </FormControl>
        }
    },
        {headerName : 'DOB', field:"DOB",
         cellRendererFramework : (params)=>{
             //console.log(rowDefs);
            return <form className={classes.container} noValidate>
                        <TextField
                        id="datetime-local"
                        type="date"
                        
                        className={classes.textField}
                        value = {rowDefs[params.rowIndex] ? rowDefs[params.rowIndex].DOB : 'DOB'}

                        onChange={(e)=>{
                            
                            if(rowDefs[params.rowIndex]){
                                let newR = rowDefs;
                                newR[params.rowIndex].DOB = e.target.value;
                                setRowDefs(newR);
                            }
                        }}
                        
                        />
                    </form>
         }
        },
        {headerName : 'Country', field:"Country",
        cellRendererFramework : (params)=>{
            return<FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Gender"
              value = {rowDefs[params.rowIndex] ? rowDefs[params.rowIndex].Country : 'Country'}
              onChange={(e)=>{
                if(rowDefs[params.rowIndex]){
                    let newR = rowDefs;
                    newR[params.rowIndex].Country = e.target.value;
                    setRowDefs(newR);
                }
              }}
            >
              <MenuItem value={'Country'}>Country</MenuItem>
              <MenuItem value={'Indonesia'}>Indonesia</MenuItem>
              <MenuItem value={'Russia'}>Russia</MenuItem>
              <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
            </Select>
          </FormControl>
        }
    },
        {headerName : 'City', field:"City"},
        {headerName: "Action",field:"Id",
            cellRendererFramework:(params)=><div>
                <img src = "https://icon-library.com/images/delete-icon/delete-icon-13.jpg" style={{width:'20px', height:'20px'}} onClick={()=>{
                    //console.log(params);
                    setRowDefs(rowDefs.filter((row)=>{
                        return row.Id !== params.value;
                    }));
                }} alt="delete"/>
            </div>}
    ];
    let defaultColDef = {
        editable : true,
        cellStyle : (params)=>{

            let val = rowDefs.filter((row)=>{
                return params.data.Id === row.Id;
            })
            if(isSubmit)
            console.log(selected);
            
            console.log()
            if(isSubmit && JSON.stringify(params.data) === JSON.stringify(val[0]) && selected.includes(params.data.Id)){
                

                if(params.value.length === 0 || ['Id','Name','Email','City','Country','DOB','Gender'].includes(params.value)){
                    return {backgroundColor:'red'}
                }
                else if(params.value.length < 3 && !selected.includes(params.value)){
                    return {backgroundColor:'yellow'}
                }
            }
        }

    }
    

   return (<>
        {localStorage.setItem('rows', JSON.stringify(rowDefs))}
        {localStorage.setItem('submittedata', JSON.stringify(submitted))}

        <div className = "btns">
           
            <button onClick = {()=>{
                localStorage.setItem('rows', JSON.stringify([...rowDefs, { Id :'Id', Name: 'Name', Email: 'Email', Gender: 'Gender', DOB:'DOB', Country:'Country', City:'City', img:""}]));
                //console.log(localStorage.getItem('rows'))
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
                    //console.log(selected);
                    let rowSubmission = rowDefs.filter((row)=>{
                        return(selected.includes(row.Id));
                    })
                    rowSubmission.map((row)=>{
                        for(let i in row){
                            
                            if(row[i].length < 3 ){
                                
                                 setIsSubmit(true);

                            }
                        }
                        return null;
                    })
                    if(isSubmit){
                        setSubmitted([...submitted,...rowSubmission]);
                        setSelected([]);
                        setIsSubmit(false);
                    }
                    
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
