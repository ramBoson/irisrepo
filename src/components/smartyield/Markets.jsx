import { useEffect } from "react";
import { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import {
  Badge,
  Card,
  Col,
  Container,
  Progress,
  Row,
  Table,
  Button,
  ButtonGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import icon from "../../assets/img/checkicon.PNG";
import icon1 from "../../assets/img/checkicon1.PNG";
import icon2 from "../../assets/img/checkicon2.PNG";
import aave from "../../assets/img/aavelogo.PNG";
import compound from "../../assets/img/compoundlogo.PNG";
import finance from "../../assets/img/financelogo.PNG";
import icon4 from "../../assets/img/icon4.PNG";
import icon9 from "../../assets/img/icon2.PNG";
import icon3 from "../../assets/img/icon3.PNG";
import icon5 from "../../assets/img/icon5.PNG";
import icon6 from "../../assets/img/icon6.PNG";
import icon7 from "../../assets/img/icon7.PNG";
import icon8 from "../../assets/img/icon8.PNG";
import busd from "../../views/busdAbi";
import web3 from "../../web3";
import valutadapter from"../../views/vaultAdapterAbi";
import carbonfi from "../../views/carbonFinanceAbi";
import axios from 'axios';

const Markets = (props) => {
  const [getresponse, setresponse] = useState([]);
  //console.log("Markets",item)
  let [activeTab, setActiveTab] = useState("Finance");
  const[totalvaluelocked,setTotalvalueLocked]=useState([]);
  const [totalreward,setTotalrewards]=useState([]);  
  useEffect(() => {
    const fetchPosts = async () => {
      
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/`)
      setresponse(res.data)
      
    };

    fetchPosts();
  }, []);
  const makeAPICall = async () => {          
    //alert("makecall")
    //axios.get(`http://18.220.0.247:42101/irisapi/v1/users/`).then((result)=>{      
  axios.get(`https://jsonplaceholder.typicode.com/posts/`).then((result)=>{
    console.log("resultphoto",result.data);
    setresponse(result.data)

  }).catch((error)=>{
    console.log("Error",error);
  });            
}
  return (
    <>
      <section className="p-0">                              
      <button type="button" onClick={()=>makeAPICall()}>Retrive</button>      
        {activeTab === "Finance" ? (          
          <>
          {getresponse.map((e)=>{
            <Card className="custom-card mt-4">
            <Table className="custom-table market-table" responsive>
              <thead>
                <tr>
                  <th>Token Name </th>
                  <th>Liquidity</th>
                  <th>Rewards</th>       
                  {/* <th>Token conversion rate</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex">                    
                      <div className="pl-2 pr-2" >
                        <h6 style={{ fontWeight: "600",marginTop:"20px" }}>
                          BUSD
                          </h6>                        
                        <div
                          className="mb-0 text-muted"
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >                         
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-left">
                      <div className=" align-items-baseline">
                        <h6 style={{ verticalAlign: "middle",fontWeight: "600" ,marginTop:"20px" }}> {(e.id).toFixed(5)} &nbsp;{"BUSD"}</h6>
                        <div
                          className="mb-0 text-muted"
                          style={{ fontSize: "12px", fontWeight: "600" }}
                        >                         
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ verticalAlign: "middle" }}>
                    {/* <Link to="https://app.barnbridge.com/"> */}
                    <h6 style={{ fontWeight: "600", color: "#00d395",marginTop:"20px"  }}>
                      {parseFloat(totalreward/1000000000000000000).toFixed(5)}
                    </h6>
                  </td>                 
                  <td>                    
                  </td>                  
                </tr>                             
              </tbody>
            </Table>
          </Card>

          })}
          
          </>
        ) : (
          ""
        )}
      </section>
    </>
  );
};

export default Markets;
