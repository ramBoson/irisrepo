import { useEffect } from "react";
import { useState } from "react";
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Container, Row, Table, Button } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText} from "reactstrap";
import icon from "../assets/img/icon.PNG";
import icon1 from "../assets/img/icon1.PNG";
import icon3 from "../assets/img/icon3.PNG";
import Pools from '../components/farming/Pools';
//import cbusd from "./cbusdAbi";
import CustomCard from '../components/global/CustomCard';
//import black from "./blackAbi";
//import CFI from "./carbonFinanceAbi";
import web3 from "../web3";
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';
import FormData from 'form-data';
//import valutadapter from"./vaultAdapterAbi";
//import carbonoracle from "./carbonOracleAbi";
//import carbonStake from "./carbonStakeAbi";
//import busd from "./busdAbi";
//import cbusdtoken from "./cbusdAbi";
//import cbusdpair from "./lptokenAbi";
//import black from "./blackabi";

import { contracts } from './contractAddress';
import {blackabi, cbusd,busd ,cbusdbusdpair,carbonfinance} from './abi';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import ModaldMove from "../ModalDMove";
import FolowStepsdMove from "../FolowStepsdMove";
import Compress from "react-image-file-resizer";
import ipfs from "./ipfs";
import fs from 'fs'
import Action1 from '../assets/img/action-1-white.png';
import Action2 from '../assets/img/action-2-white.png';
import Action3 from '../assets/img/action-3-white.png';
import Action4 from '../assets/img/action-4-white.png';
import Action5 from '../assets/img/action-5-white.png';
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
        document.getElementById("header-title").innerText = "DASHBOARD";        
              if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined){  
                  alert("please connect your wallet")
              }
              else{                  
                  axios.get(`http://3.15.6.43:42101/irisapi/v1/users/${localStorage.getItem('wallet')}`).then(async(e)=>{
                    if(e.data['algoAddress'] === localStorage.getItem('wallet'))            
                    {
                        this.setState({ setCurrent:"first"});
                        if(e.data['twitterName'] === "Approved"){
                            this.setState({ setApprove:"Approved"});
                            await axios.get(`http://3.15.6.43:42101/irisapi/v1/kyc/${e.data['profileURL']}`).then((response)=>{
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
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
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
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
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
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
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
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
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
                              <p class="date">Nov 2nd 2021</p>
                              <p class="time">20:30 </p>
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
                                 <p class="date">Nov 2nd 2021</p>
                                 <p class="time">20:30 </p>
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
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
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
                                <p class="date">Nov 2nd 2021</p>
                                <p class="time">20:30 </p>
                            </div>
                        </div>
                        </>
                            )}
                            
                            {/* <div className="step">
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action3} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">Create </h4>
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
                                </div>
                            </div> */}
                            {/* <div className="step">
                                <div className="step-icon-wrapper">
                                    <div className="highlight">
                                        <img src={Action4} alt="icon" />
                                    </div>
                                </div>
                                <div className="step-text">
                                    <h4 class="title">Public Round</h4>
                                    <p class="date">Nov 2nd 2021</p>
                                    <p class="time">20:30 </p>
                                </div>
                            </div> */}                        
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