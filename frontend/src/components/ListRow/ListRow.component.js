import React from 'react';
import { useState } from "react";
import AddEditModal from '../AddEditModal/AddEditModal.component';
import moment from "moment";
import axios from 'axios';
import imgEdit from '../../assets/pen-to-square-solid.svg';
import imgDelete from '../../assets/trash-can-solid.svg';
import './ListRow.component.css'

export default function ListRow({element, arrManagers, setNeedUpdate}){
    const [showDialog, setShowDialog] = useState(false);

    const openDialog = () =>{
        setShowDialog(true);
    }
    const closeDialog = () =>{
        setShowDialog(false);
    }

    const deleteElement =(element) =>{
        //checking ability for deleting of record
        const url = process.env.REACT_APP_API_URL+'/getManagerAndEmployees/'+element._id
            axios({
                method: 'get',
                url: url
              }).then(response => {
                if(response.data.employees.length){
                    alert("This element have some relations as manager with other elements. Can't delete it!")
                }else{
                    if(window.confirm("Do you want to delete "+element.firstName+" "+element.lastName+"?")){
                        const url = process.env.REACT_APP_API_URL+'/delete/'+element._id
                        axios({
                            method: 'get',
                            url: url
                            // responseType: 'stream'
                          }).then(response => {
                              setNeedUpdate(new Date());
                              alert("The element was deleted succefully!");
                          } ).catch(error => {
                                console.log(error);
                            });
                    }
                }

              } ).catch(error => {
                    console.error(error);
                });


        
    }

        let textManager = "";
        if(element.manager ){
            console.log("element.manager", element.manager);
            let resManager = arrManagers.find(el => el._id === element.manager);
            if(resManager) 
                textManager = resManager.firstName+" "+resManager.lastName;
        }
        return (
            <>
                <tr>
                    <th>{element.firstName}</th>
                    <th>{element.lastName}</th>
                    <th>{element.email}</th>
                    <th>{moment(element.dateStarted).format("DD/MM/YYYY")}</th>
                    <th>{element.role}</th>
                    <th>{element.salary}</th>
                    <th>{textManager}</th>
                    <th>
                        <a href='#' onClick={()=>openDialog()}><img src={imgEdit} alt="edit" width={20} /> </a>
                        <a href='#' ><img src={imgDelete} alt="delete" width={20} onClick={()=>deleteElement(element)} /> </a>
                    </th>  
                </tr>
                    <AddEditModal person={element} showDialogF={closeDialog} showDialog={showDialog} arrManagers={arrManagers} setNeedUpdate={setNeedUpdate}></AddEditModal>
            </>
    
        );
    
 }