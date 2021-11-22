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
class Dashboard extends Component {
    state={
        activeTab: "ViewPool",
    }    
    setActiveTab = (tab) => {
        console.log(tab)
        this.setState({ activeTab: tab })
    }
    componentDidMount() {
        document.getElementById("header-title").innerText = "Dashboard";
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
    }
                
    render()
     {   

    const pinataApiKey = "88348e7ce84879e143e1";
    const pinataApiSecret = "e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f";
    const pinataSDK = require('@pinata/sdk');
    const pinata = pinataSDK(pinataApiKey, pinataApiSecret);
    const nftWorkspacePath = __dirname + '/workspace';
    const bs58 = require("bs58");
    const captureFile =(event) => {
        this.setState({setimagename:event.target.files[0].name})
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        Compress.imageFileResizer(file, 300, 300, 'JPEG', 10, 0,
        uri => {
          console.log("iuri",uri)
          this.setState({setImg:uri})
        },
        'base64'
        );
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => convertToBuffer(reader);    
        console.log(reader)    
      };      
    const convertToBuffer = async(reader) => {      
        const buffer = await Buffer.from(reader.result);      
        this.setState({setBuffer:buffer});        
        await ipfs.add(buffer, (err, ipfsHash) => {
        //console.log(err,ipfsHash);
        console.log("buff",buffer);
        this.setState({setIpfsHash:ipfsHash[0].hash});
        console.log(ipfsHash[0].hash)
        const CID = require('cids')
        var cid = new CID(ipfsHash[0].hash)        
        console.log("cid",cid.toV1().toBaseEncodedString('base32'));
        this.setState({setButtonopen:true}) 
    })        
    };

         
        console.log("Move",this.state.setMove)
        const UploadDb=()=>{                        
            console.log("name",document.getElementById("name").value)      
            console.log("dob",document.getElementById("dob").value)      
            console.log("address",document.getElementById("address").value)      
            console.log("email",document.getElementById("email").value)      
            console.log("phonenumber",document.getElementById("phonenumber").value)      
            console.log("filename",document.getElementById("fileid").value)      
            console.log("addresswallet",localStorage.getItem("wallet"))            
            if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ""){
                alert("please connect your wallet...")
            }
            else if(document.getElementById("name").value === null || document.getElementById("name").value === undefined || document.getElementById("name").value === "" || document.getElementById("dob").value === null || document.getElementById("dob").value === undefined || document.getElementById("dob").value === "" || document.getElementById("address").value === null || document.getElementById("address").value === undefined || document.getElementById("address").value === "" || document.getElementById("email").value === null || document.getElementById("email").value === undefined || document.getElementById("email").value === "" || document.getElementById("fileid").value === null || document.getElementById("fileid").value === undefined || document.getElementById("fileid").value === ""){
                alert("please fill all details..")                                
                }                    
            else{
            let address="\""+ localStorage.getItem("wallet") +"\"";
            console.log("dass",localStorage.getItem("wallet"))
            //document.write()
            console.log(this.state.setIpfsHash)
            console.log(this.state.setImg)
            console.log(this.state.setimagename)

          //   {
          //     "userKey": "1",
          //     "algoAddress": "address11234567891011address11234567891011address11234567891011address11234567891011",
          //     "creationTime": "2021-11-21 03:38:04",
          //     "accountType": "accountType1",
          //     "profileName": "profileName1",
          //     "twitterName": "twitterName1",
          //     "profileURL": "ipfsHexUrl1 Updated"
          // }
          // "profileName" :document.getElementById("name").value,                
          //document.getElementById("address").value
            const posts = {
                "userKey": this.state.setimagename,
                "algoAddress": localStorage.getItem("wallet"),
                "creationTime": document.getElementById("dob").value,
                "accountType": document.getElementById("name").value,
                "profileName": this.state.setimagename,
                "twitterName": this.state.setIpfsHash,                
                "profileURL" :"pending"
              }
              //document.getElementById("phonenumber").value
              
            // const posts = {
            //     "ipAddress": "hello",
            //     "algoAddress": "webhello",
            //     "networkType": "hello",
            //     "walletType": "hello",
            //     "twitterName": "hello",
            //     "profileURL": "hello",
            //     "profileName" :"hello",
            //     "accountType" :"hello",
            //   }
              axios.post('http://18.116.51.140:42101/irisapi/v1/users', posts)
              .then(res =>{
                  if(res.data['result'] === 'User Create / Update Failed !'){
                    console.log(res.data)
                  }else{
                    console.log(res.data['result'])
                    this.setState({setMove:true});
                    //alert("upload db")            
                  }                                 
              }).catch((err)=>{
                console.log(err)
              });
            }            
        }        
        // let { cart, input } = this.state;        
        //let c=0;
        let pagesCount = Math.ceil(this.state.setfiltdata.length / this.state.pageSize);
       console.log("page",pagesCount,this.state.setfiltdata.length);
        return (<>
        <InputGroup className="mt-3" >
        <form onSubmit={this.handleSubmit} style={{marginLeft:"450px"}}>          
        <input placeholder="Name" type="text" value={this.state.value} id="name"/>        
        <br></br><br></br>                
        <DatePicker          
        id="dob"
         placeholderText="Please select a dob"
         selected={ this.state.startDate}
         onChange= { date => this.setState({
            startDate: date
            })
         }
         dateFormat="MMMM d, yyyy"
         shouldCloseOnSelect={true}         
        />     
        <br></br><br></br>                
        <input placeholder="Address" type="text" value={this.state.value} id="address"/>   
        <br></br><br></br>                
        <input placeholder="Email" type="text" value={this.state.value} id="email"/>        
        <br></br><br></br>                
        <input placeholder="Phone Number" type="text" value={this.state.value} id="phonenumber"/>        
        <br></br><br></br>        
        <input type="file" name="tfile" id="fileid" onChange = {captureFile}/>
        <br></br><br></br>                        
        <Button color="outline-site-primary" style={{marginLeft:'50px'}} onClick={e=>UploadDb()}>Upload</Button>                      
      </form>        
        </InputGroup>                             
                    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>           
               <ModaldMove visible={this.state.setMove} onClose={() => this.setState({setMove:false})}>
               <FolowStepsdMove viewhistory={this.state.dis}  />
             </ModaldMove>           
        </>
        );        
    }
}
export default Dashboard;