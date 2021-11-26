import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Dropdown, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Row, Table } from "reactstrap";
import Modald from "../ModalD";
import FolowStepsd from "../FolowStepsd";
import FolowStepsdcopy from "../FolowStepsdcopy";
import axios from 'axios';
import config from '../configurl'

const Swap = () => {
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    var[dis,setDis] = useState("");
    const [user, setUser] = useState(null);
    console.log("userprint",user)
    const [getresponse, setresponse] = useState([]);
    console.log("getr",getresponse)
  useEffect(() => {
    const fetchPosts = async () => {      
        axios.get(`${config}/users/${localStorage.getItem('wallet')}`).then(async(u) => {
            setUser(u.data)
            await axios.get(`${config}/kyc/${u.data['profileURL']}`).then((response)=>{
            setresponse(response.data)      
            })            
          })    
    };
    fetchPosts();
  }, []);
  
    useEffect(() => {
        document.getElementById("header-title").innerText = "VIEW D-ID";
    } )       
    const togglePopup = () => {
        setIsOpen(false);
      }

    return (
        
  <section className="p-0 my-5">
  <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsd viewhistory={dis}  />
  </Modald>

  <Modald visible={isOpens} onClose={() => setIsOpens(false)}>
        <FolowStepsdcopy viewhistory={dis}  />
  </Modald>
             {             
            localStorage.getItem("wallet")===null || localStorage.getItem("wallet")==="" || localStorage.getItem("wallet")=== undefined ?(<>
            <Container fluid>           
                <Row className="justify-content-center">
                    <Col xl="8" lg="8" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="p-3">
                            <h4>YOUR D-ID</h4>                                                                
                                <Table bordered responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Your Id</th>
                                            <th>Your Name</th>
                                            <th>Your Number</th>
                                            <th>Your Email</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                            <td>null</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                </Row>
               <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </Container>
 
            </>):
                (<>
 <Container fluid>           
                <Row className="justify-content-center">
                    <Col xl="8" lg="8" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="p-3">
                            <h4>YOUR D-ID</h4>                                                                
                                <Table bordered responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Your Id</th>
                                            <td>{getresponse['assetId']}</td>
                                            </tr>
                                            <tr>
                                            <th>Your Name</th>
                                            <td>{getresponse['firstName']}</td>
                                            </tr>
                                            <tr>
                                            <th>Your Citizenship</th>
                                            <td>{getresponse['citizenship']}</td>
                                            {/* <th>Your Email</th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                           
                                            
                                            
                                            {/* <td>{getresponse['accountType']}</td> */}
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                </Row>
               <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            </Container>
            </>)
        }
        </section>
    );
}

export default Swap;