import React,{ useState } from 'react'
import { useEffect } from "react";
import axios from 'axios';
import { Link,useLocation } from "react-router-dom";
import styles from "./FolowStepList/FolowSteps.module.sass";
import ModalDLoading from '../../ModalDLoading';
import FolowStepsApprove from '../../FolowStepsApprove';



const ApprovePage=()=> {  
  const location =useLocation();  
//   const {userKey}=location.state['userKey']
//   const {algoAddress}=location.state
//   const {creationTime}=location.state
//   const {accountType}=location.state
//   const {profileName}=location.state
//   const {twitterName}=location.state
//   const {profileURL}=location.state
  console.log("userKey",location.state['userKey'])
  console.log("algoAddress",location.state['algoAddress'])
  console.log("creationTime",location.state['creationTime'])
  console.log("accountType",location.state['accountType'])
  console.log("profileName",location.state['profileName'])
  console.log("twitterName",location.state['twitterName'])
  console.log("profileURL",location.state['profileURL'])  

  const [getdone, setdone] = useState(false);
  const [getresponse, setresponse] = useState([]);
  console.log("getr",getresponse)
  const [getresponse2, setresponse2] = useState([]);
  console.log("getr2",getresponse2)
  useEffect(() => {
    const fetchPosts = async () => {      
      const res = await axios.get(`http://3.15.6.43:42101/irisapi/v1/users/${location.state['algoAddress']}`)
      setresponse2(res.data)      
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {            
      const kycplainget= await axios.get(`http://3.15.6.43:42101/irisapi/v1/kyc/${location.state['profileURL']}`)
      //const res = await axios.get(`http://18.191.6.217:42101/irisapi/v1/users/${location.state['algoAddress']}`)                              
      setresponse((kycplainget.data['base64Image']))      
    };
    fetchPosts();
  }, []);
  
//   useEffect(() => {
//     const fetchPosts = async () => {      
//       //const res = await axios.post('http://18.191.6.217:42101/irisapi/v1/kycPlain?')                      
//       //setresponse((res.data))      
//     };
//     fetchPosts();
//   }, []);

  
    
    const dbupdatecall=()=>{            
    const posts= {      
        "algoAddress": location.state['algoAddress'],
        "creationTime": location.state['creationTime'],
        "accountType": location.state['accountType'],
        "profileName": location.state['profileName'],
        "twitterName": "Approved",
        "profileURL": location.state['profileURL']
    }
    
    console.log("postsjson",posts)             
    axios.post(`http://3.15.6.43:42101/irisapi/v1/users`,posts)
    .then(res => {
      console.log(res.data)
      //setdone(true)
     alert("KYC Approved Successfully !")
     //confirm("Press a button!");
     window.location.reload(false)

    //   axios.post('http://18.191.6.217:42101/irisapi/v1/kycPlain?',kycplainjson)
    //         .then(async(response) => {
    //             window.location.reload();
    //         })
    //         .catch(function (response) {
    //           //handle error
    //           console.log(response);
    //         });      
      
    });        
    
    }
    return (
      <div className="Home">
        <div className="lander">
          <h3>Approve Kyc</h3>          
    <ModalDLoading visible={getdone} onClose={() => setdone(false)}>
        <FolowStepsApprove />
    </ModalDLoading>
          <div className={styles.avatar}>
          <img src={getresponse} alt="Avatar" />                      
          </div>
          {/* <h6>{getresponse}</h6> */}
          {/* <img src={location.state['profileURL'].} alt="new" /> */}
          {/* <button type="button" onClick={()=>makeAPICall()}>Retrive</button>       */}
          <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                      <th>USERKEY</th><td>{location.state['userKey']}</td>                            
                      </tr>
                      <tr>
                        <th>Name</th><td>{location.state['profileName']}</td>
                        </tr>
                          <tr>
                        <th>CREATION TIME&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th><td>{location.state['creationTime']}</td>
                        </tr>
                        <tr>
                        <th>ADDRESS</th><td>{location.state['accountType']}</td>
                        </tr>
                        {/* <th>IMAGE</th> */}
                        <tr>
                        <th>ACCOUNT TYPE</th><td>{location.state['profileURL']}</td>   
                        </tr>
                        <tr>
                        <th>STATUS</th><td>{getresponse2['twitterName']}</td> 
                        </tr>
                        <tr>                        
                        <th>APPROVE</th><td style={{cursor:"pointer",styles:"bold",color:"#4a54f1"}} onClick={()=>dbupdatecall()}>Approve</td>                            
                    </tr>
                </thead>
                <tbody>                                    
                        <tr key={location.state['userKey']}>
                            
                            
                            

                            {/* <td>{location.state['profileName'].slice(0,20)}....</td>                             */}
                            
                            
                            
                        </tr>                    
                </tbody>
            </table>                    
        </div>        
      </div>
      
    );
}
export default ApprovePage;


//const res = await axios.get(`http://18.191.6.217:42101/irisapi/v1/getSelfieImage/${location.state['profileURL']}`)              
