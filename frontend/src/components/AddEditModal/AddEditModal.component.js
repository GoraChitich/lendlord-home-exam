import React from 'react';
import { useEffect } from "react";
import { useState } from "react";
import {  Col, Row, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { USER_ROLES } from '../../roles';
import moment from 'moment';
import './AddEditModal.component.css'

export default function AddEditModal({ person, showDialogF, showDialog, arrManagers, setNeedUpdate }) {
  const handleClose = () => showDialogF(false);
  const [firstName, updateFirstName] = useState(person?.firstName);
  const [lastName, updateLastName] = useState(person?.lastName);
  const [email, updateEmail] = useState(person?.email);
  const [dateStarted, updateDateStarted] = useState(person? Date.parse(person.dateStarted): new Date());
  const [role, updateRole] = useState(person?.role);
  const [salary, updateSalary] = useState(person?.salary);
  const [manager, updateManager] = useState(person?.manager);
  const [roleDisabled, setRoleDisabled] = useState(false);
  useEffect(()=>{
    if(!person){//clean variables in the case reopening the dialog
      updateFirstName("");
      updateLastName("");
      updateEmail("");
      updateDateStarted(new Date());
      updateRole("");
      updateSalary("");
      updateManager("");
    }else{
      const url = process.env.REACT_APP_API_URL+'/getManagerAndEmployees/'+person._id;
            axios({
                method: 'get',
                url: url
              }).then(response => {
                setRoleDisabled(!!response.data.employees.length);
              } ).catch(error => {
                    console.error(error);
                });
    }
  }
  , [showDialog]);

  if(!showDialog) return null;

  

  const handleSubmit = (event)=>{
    console.log("handle submit");
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()  === false) {
      console.log("Form is not valid")

    }else{
      console.log("Form is valid. Saving...");
      const personJson = {
        firstName,
        lastName,
        email,
        dateStarted: moment(dateStarted).format("YYYY-MM-DD"),
        salary: salary,
        role: role
      }

      if(manager)
        personJson.manager = manager;
      
        console.log(JSON.stringify(personJson));
      let url = "";
      if(person){
        url = process.env.REACT_APP_API_URL+'/update/'+person._id;
        
      }else{
        url = process.env.REACT_APP_API_URL+'/create/'
      }
      axios.post(url,personJson)
        .then(response => {
          handleClose()
          setNeedUpdate(new Date());
        } )
        .catch(error => {
            console.log(error);
            alert("Saving error. See log.")  
          });
      // handleClose();


    }

    // setValidated(true);
  }


  
  console.log("arrManagers",arrManagers);
  const optionsManagers = arrManagers?.length? arrManagers.map(el => <option key={el._id} value={el._id}>{el.firstName + " " + el.lastName}</option>): null;

  if (showDialog)
    return (
      <>
      
        <Modal show={showDialog} onHide={handleClose} animation={false}>
                      <Form onSubmit={handleSubmit}>

          <Modal.Header closeButton>
            <Modal.Title>{person ? "Edit: " + person.firstName + " " + person.lastName : "Add new person"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} >First name</Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="First name" value={firstName} onChange={(e)=>updateFirstName(e.target.value)} required minLength={3}/>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} >Last name</Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e)=>updateLastName(e.target.value)} required minLength={3}/>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} >Email</Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>updateEmail(e.target.value)}  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} >Date started</Form.Label>
                <Col sm={9}>
                  <DatePicker selected={dateStarted} onChange={(date) => updateDateStarted(date)} dateFormat='dd/MM/yyyy' required pattern='' />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} >Role</Form.Label>
                <Col sm={9}>
                  <Form.Select defaultValue={role} onChange={(e)=>updateRole(e.target.value)}  required disabled={roleDisabled} >
                    <option value={""} >No selected</option>
                    <option key={USER_ROLES.MANAGER} value={USER_ROLES.MANAGER}>{USER_ROLES.MANAGER}</option>
                    <option key={USER_ROLES.DRIVER} value={USER_ROLES.DRIVER}>{USER_ROLES.DRIVER}</option>
                    <option key={USER_ROLES.WORKER} value={USER_ROLES.WORKER}>{USER_ROLES.WORKER}</option>
                  </Form.Select>
                </Col>
              </Form.Group>
              { roleDisabled && <p class='explanation'>This element has connections as manager with other employees. You can't change his role</p> }
              <Form.Group className="mb-3" as={Row}>
                <Form.Label column sm={3} >Salary</Form.Label>
                <Col sm={9}>
                  <Form.Control type="text" placeholder="Salary" value={salary} onChange={(e)=>updateSalary(e.target.value)}  required pattern="\d+"/>
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} required>
                <Form.Label column sm={3} >Manager</Form.Label>
                <Col sm={9}>
                  <Form.Select defaultValue={manager} onChange={(e)=>updateManager(e.target.value)} required={role !== USER_ROLES.MANAGER} disabled={role === USER_ROLES.MANAGER}> 
                    <option value={""} >No selected</option>
                    {optionsManagers}
                  </Form.Select>

                </Col>
              </Form.Group>
              { role === USER_ROLES.MANAGER && <p class='explanation'>Manager can't have his own manager</p> }

          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type='submit' >
              {!person?"Save new person":"Save Changes"}
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
          </Form>

        </Modal>
      </>
    );
  else return "";
}

