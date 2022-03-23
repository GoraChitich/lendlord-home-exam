import React, { Component } from 'react';
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";

export default function List(props) {
    const [arrPersons, setArrPersons] = useState(false);

    const url = 'http://localhost:3000/getAllUsers'
    axios({
        method: 'get',
        url: url
        // responseType: 'stream'
      }).then(response => {
          const arr = [];
          response.data.forEach((el) => {
              
                 arr.push(
                    <tr>
                        <th>{el.firstName}</th>
                        <th>{el.lastName}</th>
                        <th>{el.email}</th>
                        <th>{el.dateStarted}</th>
                        <th>{el.role}</th>
                        <th>{el.salary}</th>
                        <th>{el.manager}</th>
                        <th>Actions</th>  
                    </tr>
                    );
              });
              setArrPersons(arr);
      } ).catch(error => {
            console.log(error);
            // alert("Server error!")
        });

return (<Table responsive>
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
</Table>)

  }
