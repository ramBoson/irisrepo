import { useEffect } from "react";
import { useState } from "react";
import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Action1 from '../assets/img/action-1-white.png';
import Action2 from '../assets/img/action-2-white.png';
import Action5 from '../assets/img/action-5-white.png';
import config from '../configurl'
class Dashboardduplicate extends Component {
    state={
        activeTab: "ViewPool",
    }    
    setActiveTab = (tab) => {
        console.log(tab)
        this.setState({ activeTab: tab })
    }
    
    state={
       
        totalsupply: '',
        totaldeposited:'',
        totalvaluelocked:'',
        carbonprice:''
    }
    
    state={    
        setStartDate : (new Date()),
        datas:[],
        con:'',
        setcount:'',
        setad:'',
        setvalues:[],
        setPosts:[],
        setLoading:false,
        setCurrentPage:1,
        postsPerPage:10,
        pageSize:3,
        currentPage:0,
        setfiltdata:[],
        timestore:[],
        setfiltdata2:[],
        setfiltdata3:[],
        setSelect:'depo',
        setOption:'depo',        
        name: "",
        dob:"",
        address:"",
        email:"",
        phoneno:"",
        photo:"",
        setMove:false,
        dis:"",
        setimagename:"",
        setButtonopen:"",
        setIpfsHash:"",
        setBuffer:"",
        setImg:"",
        Buttonopen:false,
        selectedFile: null,
        setCurrent:"",
        setApprove:"",
        setAsset:"",
    }
    componentDidMount() {
        document.getElementById("header-title").innerText = "IRIS DASHBOARD";        
              if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined){  
                  alert("please connect your wallet")
              }
              else{                  
                  axios.get(`${config}/users/${localStorage.getItem('wallet')}`).then(async(e)=>{
                    if(e.data['algoAddress'] === localStorage.getItem('wallet'))            
                    {
                        this.setState({ setCurrent:"first"});
                        if(e.data['twitterName'] === "Approved"){
                            this.setState({ setApprove:"Approved"});
                            await axios.get(`${config}/kyc/${e.data['profileURL']}`).then((response)=>{
                                console.log("ResponseCond",response.data['assetId'])
                                if(response.data['assetId'] === null || response.data['assetId'] === " " || response.data['assetId'] === undefined || response.data['assetId'] === "null"){
                                    this.setState({setAsset:""})      
                                }                    
                                else{                                                          
                                    this.setState({setAsset:"third"})
                                }                    
                            });
                        }
                        else{
                            this.setState({ setApprove:""})                            
                        }
                    }                                                            
                    else {
                        this.setState({ setCurrent:""});                        
                    }                    
                  });                  
              }                      
    }
                
    render()

    {
    return(
        <>
        {/* <h4>status</h4> */}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <div className="py-50 mb-4">
                    <div className="steps_wrapper">
                        <div className="steps">
                        {this.state.setCurrent === "first" ? (
                            <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action1} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">CREATE USERS</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                        ):(
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action1} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">CREATE USERS</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                        )}                            
                            {this.state.setApprove === "Approved" ? (
                                <div className="step" style={{color:"#2a7cda"}}>
                                <div className="step-icon-wrapper" >
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">APPROVED</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                            ):(
                                <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">APPROVED</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                            )}
                            
                            {this.state.setAsset === "third" ? (
                                <>
                            <div className="step" style={{color:"#2a7cda"}}>
                            <div className="step-icon-wrapper">
                             <div className="highlight">
                                      <img src={Action2} alt="icon" />
                             </div>
                              </div>
                              <div className="step-text">
                              <h4 class="title">CREATE D-ID</h4>
                              {/* <p class="date">Nov 2nd 2021</p>
                              <p class="time">20:30 </p> */}
                              </div>
                             </div>
                             <div className="step" style={{color:"#2a7cda"}}>
                             <div className="step-icon-wrapper">
                                 <div className="highlight">
                                     <img src={Action5} alt="icon" />
                                 </div>
                             </div>
                             <div className="step-text">
                                 <h4 class="title">COMPLETED</h4>
                                 {/* <p class="date">Nov 2nd 2021</p>
                                 <p class="time">20:30 </p> */}
                             </div>
                         </div>
                         </>
                            ):(
                                <>
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action2} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">CREATE D-ID</h4>
                                    {/* <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p> */}
                                </div>
                            </div>
                            <div className="step" style={{color:"rgba(6, 10, 13, 0.5)"}}>
                            <div className="step-icon-wrapper">
                                <div className="highlight">
                                    <img src={Action5} alt="icon" />
                                </div>
                            </div>
                            <div className="step-text">
                                <h4 class="title">COMPLETED</h4>
                                {/* <p class="date">Nov 2nd 2021</p>
                                <p class="time">20:30 </p> */}
                            </div>
                        </div>
                        </>
                            )}
                            <div className="horizontal-line"></div>
                        </div>
                    </div>
                </div>            
                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        </>        
        
    )
        
    }
}
export default Dashboardduplicate;