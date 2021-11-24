import React,{ useState } from 'react'
import { useEffect } from "react";
import axios from 'axios';
import { Container } from 'reactstrap';
import Bar from '../smartyield/Bar';
import Markets from '../smartyield/Markets';
import Portfolio from '../smartyield/Portfolio';
import Pools from '../smartyield/Pools';

const Adminviewdb=()=> {  
  const [getactiveTab, activeTab] = useState("markets");
  const [getresponse, setresponse] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {      
      const res = await axios.get(`http://18.189.143.113:42101/irisapi/v1/users`)
      setresponse(res.data)
      
    };

    fetchPosts();
  }, []);
  
    // const makeAPICall = async () => {          
    //     //alert("makecall")
    //     //axios.get(`http://18.220.0.247:42101/irisapi/v1/users/`).then((result)=>{      
    //   axios.get(`https://jsonplaceholder.typicode.com/posts/`).then((result)=>{
    //     console.log("resultphoto",result.data);
    //     setresponse(result.data)

    //   }).catch((error)=>{
    //     console.log("Error",error);
    //   });            
    // }
    const dbupdatecall=(userkey,algoAddress,creationTime,twitterName,profileName,profileURL,accountType)=>{
      console.log("a",userkey)
      console.log("b",algoAddress)
      console.log("c",creationTime)
      console.log("d",accountType)
      console.log("e",profileName)
      console.log("f",twitterName)
      console.log("g",profileURL)
      const posts= {
        "userKey": userkey,
        "algoAddress": algoAddress,
        "creationTime": creationTime,
        "accountType": accountType,
        "profileName": profileName,
        "twitterName": twitterName,
        "profileURL": "approved"
    }
    
    console.log("postsjson",posts)
      //alert("dbupdatecall")
      // const posts = {
      //   "ipAddress": this.state.setimagename,
      //   "algoAddress": localStorage.getItem("wallet"),
      //   "networkType": document.getElementById("dob").value,
      //   "walletType": document.getElementById("address").value,
      //   "twitterName": document.getElementById("email").value,
      //   "profileURL": this.state.setIpfsHash,
      //   "profileName" :document.getElementById("name").value,                
      //   "accountType" :"pending"
      // }
     
  
     
    axios.post(`http://18.116.51.140:42101/irisapi/v1/users`,posts)
    .then(res => {
      console.log(res.data)
      window.location.reload();
    });        
    
    }
    return (
      <div className="Home">
        <div className="lander">
          <h1>Admin Db page</h1>          
          {/* <button type="button" onClick={()=>makeAPICall()}>Retrive</button>       */}
          <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                      <th>USERKEY</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>ADDRESS</th>
                        <th>PHONENUMBER</th>
                        <th>IMAGE</th>
                        <th>TYPE</th>
                        <th>STATUS</th>
                        <th>APPROVE</th>
                    </tr>
                </thead>
                <tbody>
                
                    {getresponse && getresponse.map(user =>
                        <tr key={user.userKey}>
                            <td>{user.userKey}</td>
                            <td>{user.profileName}</td>
                            <td>{user.creationTime}</td>
                            <td>{user.algoAddress.slice(0,10)}....</td>                            
                            <td>{user.twitterName}</td>
                            <td>{user.accountType}</td>
                            <td>{user.profileURL}</td>
                            <td style={{cursor:"pointer"}} onClick={()=>dbupdatecall(user.userkey,user.algoAddress,user.creationTime,user.twitterName,user.profileName,user.profileURL,user.accountType)}>Approve</td>
                        </tr>
                    )}
                </tbody>
            </table>
          
          {/* {getresponse.map((x, index) => (              
<>
<h6>{x.userId}</h6>              
<h6>{x.id}</h6>              
<h6>{x.title.slice(0,10)}....</h6>
</>              
            ))} */}
        </div>
        {/* <Bar activeTab={getactiveTab} /> */}
            {/* <Container fluid className="py-4 px-md-5">
              
                {getactiveTab === "markets" ? <Markets /> : ""}
                
            </Container> */}
      </div>
      
    );
}
export default Adminviewdb;