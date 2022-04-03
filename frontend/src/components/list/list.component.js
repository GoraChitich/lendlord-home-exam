import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import ListRow from '../ListRow/ListRow.component';
import AddEditModal from '../AddEditModal/AddEditModal.component';
import { USER_ROLES } from '../../roles';
import imgAdd from '../../assets/circle-plus-solid.svg'

export default function List(props) {
    const [arrPersons, setArrPersons] = useState(false);
    const [needUpdate, setNeedUpdate] = useState(new Date());
    const [showDialog, setShowDialog] = useState(false);
    const [arrManagers, setArrManagers] = useState(false);
    
    const openDialog = () =>{
        setShowDialog(true);
    }
    const closeDialog = () =>{
        setShowDialog(false);
    }

    useEffect(()=>{
        console.log("useEffect needUpdate");
        reloadList();
        
    },[needUpdate]
    );

    useEffect(()=>console.log("arrPersons.length",arrPersons.length), [arrPersons]);
    const reloadList = () =>{
        const url = process.env.REACT_APP_API_URL+'/getAllUsers'
            axios({
                method: 'get',
                url: url
                // responseType: 'stream'
              }).then(response => {
                  const arrM = response.data.filter(el => el.role === USER_ROLES.MANAGER);
                  const arr = response.data.map(el =>  <ListRow element = {el} key={el._id} arrManagers={arrM} setNeedUpdate={setNeedUpdate}></ListRow>);
                    setArrPersons(arr);
                    setArrManagers(arrM);
              } ).catch(error => {
                    console.log(error);
                });
    }

return (
<>
    <div>
        <a href="#" onClick={openDialog}> <img src={imgAdd} alt="add" width={20}></img> Add</a>
        <AddEditModal person={null} showDialogF={closeDialog} showDialog={showDialog} arrManagers={arrManagers} setNeedUpdate={setNeedUpdate}></AddEditModal>

    </div>
    <Table responsive>
        <thead>
            <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Date started</th>
                <th>Role</th>
                <th>Salary</th>
                <th>Manager</th>
                <th>Actions</th>  
            </tr>
        </thead>
        <tbody>
            <>{arrPersons}</>
        </tbody>
    </Table>
    {/* <AddEditModal></AddEditModal> */}
</>)

  }
