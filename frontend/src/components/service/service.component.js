import axios from "axios";
import dateFormat from 'dateformat';
import settings from './settings.json'

function getAllUsers(){
    return await axios.get(`${this.url}/idOrder/${idOrder}`);

}