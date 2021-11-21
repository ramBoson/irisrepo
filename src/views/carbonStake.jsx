import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Dropdown, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Row, Table } from "reactstrap";
import web3 from "../web3";
//import swap from "./swapAbi";
//import cbusd from "./cbusdAbi";
//import cbusdstake from "./carbonStakeAbi";
//import black from "./blackAbi";
import Popup from "../Popup";
import Modald from "../ModalD";
import FolowStepsd from "../FolowStepsd";
import BigNumber from "bignumber.js";
import FolowStepsdcopy from "../FolowStepsdcopy";
import { contracts } from './contractAddress';
import {blackabi, cbusdstake,cbusd, carbonstake } from './abi';
const Cbusdstake = () => {
    let [activeTab, setActiveTab] = useState("Deposit");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [multiple, setMultiple] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState("cbUSD");
    const [selectedDropdown1, setSelectedDropdown1] = useState("No Yield");
    const[tid,setId] = useState("");
    const[tid1,setId1] = useState("");
    const[ap1,setAP] = useState("");
    const [totaldep,setTotaldeposit] = useState("");
    var[cbusdbalance,setcbusdbalance] = useState("");
    const[depositpercent,setdepositpercent] = useState("");
    const[values,setValues] = useState([]);
    const[staked,setStaked] = useState([]);
    const[reward,setReward] = useState([]);
    const [lock ,setlock]=useState("");
    const[blackbal,setBlackBalance] =useState([]);
    const[t11,setTim11 ] = useState("");
    const[t21,setTim21] = useState("");
    const[t31,setTim31 ] = useState("");
    const[t41,setTime41] = useState("");
    var[datestake,setDatestake]=useState([]);
    var [time2, settime2]=useState("");
    var [date1, setdate1]=useState("");
    var [time1, settime1]=useState("");
    const [discal ,setdistance]=useState("");
    const [lock1 ,setlock1]=useState("");
    const[stakelock,setStakeLock]=useState("");
    const [Remainingamount ,setRemainingamount]=useState(""); 
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    var[dis,setDis] = useState("");
    const[stakeenddate,setStakeendDate]=useState('');
    const cbusdcontract = new web3.eth.Contract(cbusd, contracts.cbusd.address);
    const cbusdstakecontract = new web3.eth.Contract(carbonstake, contracts.carbonstake.address);
    const blackcontract = new web3.eth.Contract(blackabi, contracts.black.address);

    useEffect(() => {
        const fetchPosts = async () => {
            var  currentdate=(new Date().getTime())/1000;
            var enddatediff = 1635156735-currentdate;
            if(enddatediff>0){
                setStakeendDate(1);
        
            }
            else{
                setStakeendDate(0);
                console.log("enddate",stakeenddate);
            }
        
        };
    
        fetchPosts();
      }, []);
 const first = async () => {
    
       if(localStorage.getItem("wallet")>0){
    const accounts =  await web3.eth.getAccounts();
 
    setcbusdbalance(await cbusdcontract.methods.balanceOf(accounts[0]).call());  

    
    let b= await cbusdcontract.methods.allowance(accounts[0],contracts.carbonstake.address).call();
 
    if(b>0){
      setAP(true);
    }
    else{
      setAP(false);
    }
   // setValues(await swap.methods.userInfo(accounts[0]).call());
    setStaked(await cbusdstakecontract.methods.userInfo(accounts[0]).call());
    setBlackBalance(await blackcontract.methods.balanceOf(accounts[0]).call());
    // var poolinfo=[];
    // poolinfo=await cbusdstake.methods.poolInfo().call();
    // var reward1=((staked[0] * poolinfo[3])/1000000000000000000);
    // var reward2=reward1-staked[1];
    // console.log("reward1",reward1);
    // console.log("reward2",reward2);
    setReward(await cbusdstakecontract.methods.pendingBlack(accounts[0]).call());
    var stakedamount=await cbusdstakecontract.methods.getHoldersRunningStakeBalance().call({from:accounts[0]});
    console.log("stakedamount",stakedamount);
    var Remainingamount=1000000000000000000000000-stakedamount;
    setRemainingamount(Remainingamount);
    setStakeLock(await cbusdstakecontract.methods.lock(accounts[0]).call());
    var secondsleft =await cbusdstakecontract.methods.secondsLeft(accounts[0]).call();
    var us =await cbusdstakecontract.methods.holderUnstakeRemainingTime(accounts[0]).call();
    var now = new Date().getTime();
    if(us<=now){
    setlock(true);
    }
    else{
      setlock(false);
    }
    
    var us=await cbusdstakecontract.methods.holderUnstakeRemainingTime(accounts[0]).call();
    var sl=(secondsleft *1000);
    var lockedtime=sl+now;
    console.log("secondsleft",lockedtime);
    var lockedonstake =[];
     lockedonstake =new Date(lockedtime);
    setDatestake(new Date(lockedtime).toDateString());
    //console.log("stakelimitlock",lockedonstake);
    var hours1 = lockedonstake.getHours();
    var minutes1 = lockedonstake.getMinutes();
    var ampm1 = hours1 >= 12 ? 'PM' : 'AM';
    hours1 = hours1 % 12;
    hours1 = hours1 ? hours1 : 12; // the hour '0' should be '12'
    minutes1 = minutes1 < 10 ? '0'+minutes1 : minutes1;
    settime2( hours1 + ':' + minutes1 + ' ' + ampm1);

    var ff=new Date(us*1000);
    setdate1(ff.toDateString());
    var hours = ff.getHours();
    var minutes = ff.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    settime1( hours + ':' + minutes + ' ' + ampm);
    //settime(lock);
    var countDowndate   =us*1000;
    //console.log(countDowndate);
    // var countDownDate = new Date().getTime() + (lock * 1000) ;
    //alert(time);
    var x = setInterval(function() {
       var now = new Date().getTime();
     
      
      var distance = countDowndate - now ;
      setdistance(distance);
     // console.log(now);
      // Time calculations for days, hours, minutes and seconds
     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
      // Output the result in an element with id="demo"
     // document.getElementById("demo").innerHTML = hours + "h "
     // + minutes + "m " + seconds + "s ";
    setTime41(days);
    setTim11(hours);
    setTim21(minutes);
    setTim31(seconds);
    
    
    
    
      // If the count down is over, write some text 
      
    
      
    }, 1000);
    
    if (discal < 0 ) {
        clearInterval(x);
        setlock1(true);

       // console.log('CountDown Finished');
    }
    else if(staked[0]==0){
        setlock1(true);
    }
    else{
     setlock1(false);
    }

    }   
}      
 
    useEffect(() => {
        document.getElementById("header-title").innerText = "Staking";
    } )
    useEffect(() => {first()},[cbusdbalance,reward,ap1,staked[0],blackbal,discal])
    useEffect(() =>{first()},[date1,lock1,time1])
    
   
    const deposit = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts();
        var valu = document.getElementById("tid1").value;
        // let x = new BigNumber(valu).times(1000000000000000000);
        // console.log("value",x.toNumber());
        // var value = x.toNumber();
        var val = valu * 1000000000;
         var value = val * 1000000000;
         //var stakelimitamount=1000000000000000-staked[0];
        

        if(parseInt(value)<=parseInt(cbusdbalance)){
            if(parseInt(value)<(Remainingamount)){
                await cbusdstakecontract.methods.deposit(web3.utils.toBN(value)).send({from:accounts[0]});
                setIsOpen(true);
                setDis("Staked Succesfully")
                first();
            }
            else{
                setIsOpens(true);
                setDis("you are trying to stake morethan your stake limit")
                first();
            }
        
    }
    else{
        setIsOpens(true);
        setDis("You Are Trying To Stake More Than Your Wallet Balance")
    }
      }

    const withdraw = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts();
        var valu = document.getElementById("tid2").value;
        // let x = new BigNumber(valu).times(1000000000000000000);
        // console.log("value",x.toNumber());
        // var value = x.toNumber();
        var val = valu * 1000000000;
         var value = val * 1000000000;
        if(parseInt(value)<=parseInt(staked[0])){
            await cbusdstakecontract.methods.withdraw(web3.utils.toBN(value)).send({from:accounts[0]});
            setIsOpen(true);
            setDis("Unstaked Succesfully")
            first()
        }
        else{
            setIsOpens(true);
            setDis("You Are Trying To UnStake More Than You Staked")
        }
      }  

      const claimreward = async(event) => {
        event.preventDefault();
        if(parseInt(reward) >parseInt(100000000000)){
            const accounts =  await web3.eth.getAccounts();
            await cbusdstakecontract.methods.claimReward().send({from:accounts[0]}); 
            setIsOpen(true);
            setDis("Rewards Claimed Successfully")   
        }
        else{
            setIsOpens(true);
            setDis("Your reward amount should be Greater then 100 to Claim ")
        }
           
        first()
        
      }
      const emergencywithdraw = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts();
        await cbusdstakecontract.methods.emergencyWithdraw().send({from:accounts[0]});
        setIsOpen(true);
        setDis("Withdrawn Successfully")        
        first()
      }
    
      const balancepercent = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;  
        var twentyfive=(cbusdbalance * 25)/100;
        setdepositpercent( web3.utils.fromWei((twentyfive.toString()), "ether" ) );
       
        document.getElementById("tid1").value = (web3.utils.fromWei((twentyfive.toString()), "ether" ));        
        
      }
       const balancepercent1 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;    
        var fifty=(cbusdbalance * 50)/100;
        setdepositpercent(web3.utils.fromWei((fifty.toString()), "ether" ));
        document.getElementById("tid1").value = (web3.utils.fromWei((fifty.toString()), "ether" ));          
        
      } 


      const balancepercent2 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;    
        var seventyfive=(cbusdbalance * 75)/100;
        setdepositpercent(web3.utils.fromWei((seventyfive.toString()), "ether" )); 
        document.getElementById("tid1").value =(web3.utils.fromWei((seventyfive.toString()), "ether" )) ;         
        
      }
      const balancepercent3 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;    
       // var hundred=(cbusdbalance * 100)/100;
        setdepositpercent(web3.utils.fromWei((cbusdbalance), "ether" )); 
        document.getElementById("tid1").value = (web3.utils.fromWei((cbusdbalance), "ether" ));         
        
      }


      const withdrawbalancepercent = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;  
        var twentyfive=(staked[0] * 25)/100;
        setTotaldeposit(web3.utils.fromWei((twentyfive.toString()), "ether" ));
        document.getElementById("tid2").value =(web3.utils.fromWei((twentyfive.toString()), "ether" )) ;        
        
      }
       const withdrawbalancepercent1 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;    
        var fifty=(staked[0]  * 50)/100;
        setTotaldeposit(web3.utils.fromWei((fifty.toString()), "ether" ));
        document.getElementById("tid2").value = (web3.utils.fromWei((fifty.toString()), "ether" ));          
        
      } 


      const withdrawbalancepercent2 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;    
        var seventyfive=(staked[0]  * 75)/100;
        setTotaldeposit(web3.utils.fromWei((seventyfive.toString()), "ether" )); 
        document.getElementById("tid2").value =(web3.utils.fromWei((seventyfive.toString()), "ether" ));         
        
      }
      const withdrawbalancepercent3 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;    
        var hundred=(staked[0]  * 100)/100;
        setTotaldeposit(web3.utils.fromWei((hundred.toString()), "ether" )); 
        document.getElementById("tid2").value =(web3.utils.fromWei((hundred.toString()), "ether" ));         
        
      }
      const approve = async() => {
        let account = await web3.eth.getAccounts();
        let amount = 1000000000000000000 +"000000000000000000"; 
        await cbusdcontract.methods.approve(contracts.carbonstake.address,amount).send({from:account[0]});
        setIsOpen(true);
        setDis("Approved Succesfully")
        first()
    }
    const togglePopup = () => {
        setIsOpen(false);
      }


    return (
        <section className="p-0 my-5">
            {/* <div>
    {isOpen && <Popup
      content={<>
       <center> <b >{dis}</b><br/>
        <button onClick={togglePopup}>OK</button></center>
      </>}
      handleClose={togglePopup}
    />}
  </div>   */}
  <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsd viewhistory={dis}  />
      </Modald>

      <Modald visible={isOpens} onClose={() => setIsOpens(false)}>
        <FolowStepsdcopy viewhistory={dis}  />
      </Modald>
             {
            localStorage.getItem("wallet")===null || localStorage.getItem("wallet")===""?(<>
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xl="8" lg="8" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="p-3">
                                <h4>stake  cbUSD </h4>
                                <h6>The Stake cbUSD and get Black token as reward</h6>
                                <Table bordered responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Your cbUSD</th>
                                            <th>Staked cbUSD</th>
                                            <th>Remaining Amount to Stake </th>
                                            <th>Black reward</th>
                                            <th>Your Black</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                            <td>0.00</td>
                                        </tr>
                                    </tbody>
                                </Table>
                               
<div>
                                <Container fluid>
                                    <Row>
                                        <Col xl="6" md="12">
                                        {stakeenddate===1 ? (<> 
                                            <InputGroup className="mt-3">
                                                
                                            <Input placeholder={depositpercent} style={{ height: "auto" }}type = "number" id="tid1"  />
                                                <InputGroupAddon addonType="append"><Button color="site-primary" style={{ height: "auto" }}>stake</Button></InputGroupAddon>
                                            </InputGroup>
                                            <div className="percentage smaller">
                                                <div className="percentage-item" >25%</div>
                                                <div className="percentage-item" >50%</div>
                                                <div className="percentage-item">75%</div>
                                                <div className="percentage-item" >100%</div>
                                            </div>
                                        </>):(<> 
                                            <InputGroup className="mt-3">
                                                
                                                
                                                <InputGroupAddon addonType="append"><Button color="site-primary" >STAKING POOL IS ENDED</Button></InputGroupAddon>
                                            </InputGroup>

                                        </>)}
                                           
                                        </Col>
                                        <Col xl="6" md="12">
                                   
                                            <InputGroup className="mt-3">
                                                <Input placeholder={totaldep} style={{ height: "auto" }}type = "number"  id="tid2"  />
                                                <InputGroupAddon addonType="append"><Button color="site-primary" >unstake</Button></InputGroupAddon>
                                            </InputGroup>
                                            <div className="percentage smaller">
                                                <div className="percentage-item">25%</div>
                                                <div className="percentage-item">50%</div>
                                                <div className="percentage-item">75%</div>
                                                <div className="percentage-item">100%</div>
                                            </div>
                                           
    
                                        </Col>
                                    </Row>
                                </Container>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col xl="9">
                                            <Row className="mt-4">
                                                <Col xl="6" md="12">
                                                    <Button color="outline-site-primary" block >claim reward</Button>
                                                </Col>
                                                <Col xl="6" md="12" className='mt-3 mt-xl-0'>
                                                    <Button color="outline-site-primary" block   >Exit</Button>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Container>
                                </div>

                            </div>
                        </Card>
                    </Col>
                </Row>
 </Container>
        </>):
        (<>
              <Container fluid>
                <Row className="justify-content-center">
                    <Col xl="8" lg="8" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="p-3">
                                <h4>stake  cbUSD </h4>
                                <h6>The Stake cbUSD and get Black token as reward</h6>
                                <Table bordered responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <th>Your cbUSD</th>
                                            <th>Staked cbUSD</th>
                                            <th>Remaining Amount to Stake </th>
                                            <th>Black reward</th>
                                            <th>Your Black</th>
                                                
                                                
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>{((BigNumber((cbusdbalance/1000000000000000000)).decimalPlaces(3,1))).toNumber()}</td>
                                            <td>{((BigNumber((staked[0]/1000000000000000000)).decimalPlaces(3,1))).toNumber()}</td>
                                            <td>{((BigNumber((Remainingamount/1000000000000000000)).decimalPlaces(3,1))).toNumber()}</td>
                                            <td>{((BigNumber((reward/1000000000)).decimalPlaces(3,1))).toNumber()}</td>
                                            <td>{((BigNumber((blackbal/1000000000)).decimalPlaces(3,1))).toNumber()}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <div>         

{ ap1 === true ? 
(
(
<div>
                                <Container fluid>
                                    <Row>
                                        <Col xl="6" md="12">
                                        { stakelock === false ? ((
                                             <div>

                                      {stakeenddate===1 ?(<> 

                                        <InputGroup className="mt-3">
                                                <Input placeholder={depositpercent} style={{ height: "auto" }}type = "number" id="tid1"  />
                                                <InputGroupAddon addonType="append"><Button color="site-primary" onClick={deposit}>stake</Button></InputGroupAddon>
                                            </InputGroup>
                                            <div className="percentage smaller">
                                                <div className="percentage-item" onClick={balancepercent}>25%</div>
                                                <div className="percentage-item" onClick={balancepercent1}>50%</div>
                                                <div className="percentage-item" onClick={balancepercent2}>75%</div>
                                                <div className="percentage-item" onClick={balancepercent3}>100%</div>
                                            </div>
                                      </>):(<>

                                        <InputGroup className="mt-3">
                                              
                                                <InputGroupAddon addonType="append"><Button color="site-primary"  style={{marginLeft:"40px"}} >STAKING POOL IS ENDED</Button></InputGroupAddon>
                                            </InputGroup>
                                            
                                       </>)
                                      }
                                            
                                            </div>
                                             )) :((<>

                                                <text className="mt-3"  >You Need to wait for stake till this time </text> 
                                                <Button color="site-primary">{datestake} , {time2}</Button>
                                                
                                                                                   </>))}
                                        </Col>
                                        <Col xl="6" md="12">
                                        <div>
            {lock1==true?((
              <div>
                                            <InputGroup className="mt-3">
                                                <Input placeholder={totaldep} style={{ height: "auto" }}type = "number"  id="tid2"  />
                                                <InputGroupAddon addonType="append"><Button color="site-primary" onClick={withdraw}>unstake</Button></InputGroupAddon>
                                            </InputGroup>
                                            <div className="percentage smaller">
                                                <div className="percentage-item"onClick={withdrawbalancepercent}>25%</div>
                                                <div className="percentage-item"onClick={withdrawbalancepercent1}>50%</div>
                                                <div className="percentage-item"onClick={withdrawbalancepercent2}>75%</div>
                                                <div className="percentage-item"onClick={withdrawbalancepercent3}>100%</div>
                                            </div>
                                            </div>  
            )):
((
  <div>
     <text className="mt-3"  >You Need to wait for unstake till this time </text><Button color="site-primary">{date1} , {time1}</Button>
      </div>  
))
            }
            
        </div>
    
                                        </Col>
                                    </Row>
                                </Container>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col xl="9">
                                            <Row className="mt-4">
                                                <Col xl="6" md="12">
                                                    <Button color="outline-site-primary" block onClick={claimreward}>claim reward</Button>
                                                </Col>
                                                <Col xl="6" md="12" className='mt-3 mt-xl-0'>
                                                    <Button color="outline-site-primary" block  onClick={emergencywithdraw} >Exit</Button>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Container>
                                </div>
)
):
(
(
<div><center><Button color="site-primary" onClick={approve}>Approve</Button></center>

</div>
)
)}
  </div> 
                            </div>
                        </Card>
                    </Col>
                </Row>
 </Container>
       
          </>)
        }
       </section>
    );
}

export default Cbusdstake;