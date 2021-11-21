import React,{ useState } from 'react'
import { Link } from 'react-router-dom';
//import { Admin} from 'react-admin'
//import restProvider from 'ra-data-simple-rest'

//const dataProvider = restProvider('http://localhost:3000');
import { Card, Col, Container, Row, Table, Button } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText} from "reactstrap";
import ModaldMove from "../../ModalDWaiting";
import FolowStepsdMove from "../../FolowStepsdWaiting";



const Admin=()=> {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");    
    const [dis, setdis] = useState("");    
    const [move, setMove] = useState(false);    
    const adminlogin=()=>{
        //alert("admin approve here")
        if(username === null || username === undefined || username === "" )
        {

            alert("please enter username")
        }
        else{
            if(password === null || password === undefined || password === ""){
                alert("please enter password")
            }
            else{
                if(username === "admin" && password === "admin@123"){
                    setMove(true)
                    //alert("username and password correct ")                    
                }
                else{
                    alert("please enter valid username and password ")
                }

            }
        }
    }
  return (
      <div>
              <ModaldMove visible={move} onClose={() => setMove(false)}>
               <FolowStepsdMove viewhistory={dis}  />
             </ModaldMove>
      <h1>Admin</h1>
      <form style={{marginLeft:"450px"}}>          
        <input placeholder="Name" type="text" onChange={event => setusername(event.target.value)} id="name"/>        
        <br></br><br></br>                
        <input placeholder="Address" type="password" onChange={event => setpassword(event.target.value)} id="address"/>   
        <br></br><br></br>                        
        <Button color="outline-site-primary" style={{marginLeft:'50px'}} onClick={e=>adminlogin()}>Admin Login</Button>             
      </form>
      </div>
    );
  }
export default Admin;