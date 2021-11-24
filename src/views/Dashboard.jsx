import React, { Component } from 'react';
import { Card, Col, Container, Row, Table, Button } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText} from "reactstrap";
import FormData from 'form-data';
import "react-datepicker/dist/react-datepicker.css";
import axios,{post} from 'axios';
import ModaldMove from "../ModalDMove";
import FolowStepsdMove from "../FolowStepsdMove";
import Compress from "react-image-file-resizer";
import ipfs from "./ipfs";
import fs from 'fs'
class Dashboard extends Component {
    state={
        activeTab: "ViewPool",
    }    
    setActiveTab = (tab) => {
        console.log(tab)
        this.setState({ activeTab: tab })
    }
    componentDidMount() {
        document.getElementById("header-title").innerText = "CREATE KYC";
    }        
    state={    
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
        selectedFile: undefined,
        fileInfos: [],
        currentFile: undefined,
        setFiles:[],
        formDatafinal:"",
        //updateFormData : (initialFormData)
    }                
    render()
     {      
    let filesvalues= [];
    const captureFile =(event) => {
      this.setState({
        selectedFiles: event.target.files,
      });
      let filess=event.target.files;      

      const formDataprint={files:event.target.files[0]}
      this.setState({formDatafinal:formDataprint})      

      let reader = new FileReader();
      reader.readAsDataURL(filess[0])
      reader.onload=(e)=>{
        console.log("img data",e.target.result)
        //const formDataprint={files:e.target.result}
        //this.setState({formDatafinal:formDataprint})      
      }        
        this.setState({setimagename:event.target.files[0].name})                
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        console.log("filep",file)
        filesvalues.push(event.target.files[0])
        this.setState({selectedFile: file})        
        this.setState({setFiles:event.target.files[0]})
        let readers = new window.FileReader()
        Compress.imageFileResizer(file, 300, 300, 'JPEG', 10, 0,
        uri => {
          console.log("iuri",uri)
          this.setState({setImg:uri})
        },
        'base64'
        );
        readers.readAsArrayBuffer(file)
        readers.onloadend = () => convertToBuffer(readers);    
        console.log(readers)            
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
        this.setState({Buttonopen:true}) 
    })        
    };
         
        console.log("Move",this.state.setMove)
        const UploadDbWait=async()=>{
          console.log("name",document.getElementById("name").value)      
            console.log("dob",document.getElementById("dob").value)      
            console.log("address",document.getElementById("address").value)      
            console.log("email",document.getElementById("email").value)      
            console.log("phonenumber",document.getElementById("phonenumber").value)      
            console.log("filename",document.getElementById("fileid").value)      
            console.log("addresswallet",document.getElementById("citizenship").value)            
            console.log("addresswallet",document.getElementById("cor").value)            
            console.log("addresswallet",document.getElementById("top").value)            
            console.log("addresswallet",localStorage.getItem("wallet"))            
            if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ""){
                alert("please connect your wallet...")
            }
            else if(document.getElementById("name").value === null || document.getElementById("name").value === undefined || document.getElementById("name").value === "" || document.getElementById("dob").value === null || document.getElementById("dob").value === undefined || document.getElementById("dob").value === "" || document.getElementById("address").value === null || document.getElementById("address").value === undefined || document.getElementById("address").value === "" || document.getElementById("email").value === null || document.getElementById("email").value === undefined || document.getElementById("email").value === "" || document.getElementById("fileid").value === null || document.getElementById("fileid").value === undefined || document.getElementById("fileid").value === ""){
                alert("please fill all details..")                                
                }                    
            else{
              //this.setState({setMove:true})
            }
          //this.setState({setMove:true})
        }
        const UploadDb=()=>{                        
            console.log("name",document.getElementById("name").value)      
            console.log("dob",document.getElementById("dob").value)      
            console.log("address",document.getElementById("address").value)      
            console.log("email",document.getElementById("email").value)      
            console.log("phonenumber",document.getElementById("phonenumber").value)      
            console.log("filename",document.getElementById("fileid").value)      
            console.log("addresswallet",document.getElementById("citizenship").value)            
            console.log("addresswallet",document.getElementById("cor").value)            
            console.log("addresswallet",document.getElementById("top").value)            
            console.log("addresswallet",localStorage.getItem("wallet"))            
            if(localStorage.getItem("wallet") === null || localStorage.getItem("wallet") === undefined || localStorage.getItem("wallet") === ""){
                alert("please connect your wallet...")
            }
            else if(document.getElementById("name").value === null || document.getElementById("name").value === undefined || document.getElementById("name").value === "" || document.getElementById("dob").value === null || document.getElementById("dob").value === undefined || document.getElementById("dob").value === "" || document.getElementById("address").value === null || document.getElementById("address").value === undefined || document.getElementById("address").value === "" || document.getElementById("email").value === null || document.getElementById("email").value === undefined || document.getElementById("email").value === "" || document.getElementById("fileid").value === null || document.getElementById("fileid").value === undefined || document.getElementById("fileid").value === ""){              
                //alert("please fill all details..")                                
                }                    
            else{
            //let address="\""+ localStorage.getItem("wallet") +"\"";
            console.log("dass",localStorage.getItem("wallet"))
            //document.write()
            console.log(this.state.setIpfsHash)
            console.log(this.state.setImg)
            console.log("imagename",this.state.setimagename)
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            // const kycjson={	
            //   "createdDate": document.getElementById("dob").value,
            //   "firstName": document.getElementById("name").value,
            //   "lastName": document.getElementById("fileid").value,
            //   "selfiePath": this.state.setIpfsHash,
            //   "proofType": document.getElementById("top").value,
            //   "algoAddress": localStorage.getItem("wallet"),
            //   "kycStatus": "pending",
            //   "reviewedBy": "reviewedBy1",
            //   "approvedBy": "approvedBy1",
            //   "submittedDate": today,
            //   "reviewedDate": "reviewedDate1",
            //   "approvedDate": "approvedDate1",
            //   "identity":this.state.setIpfsHash,
            //   "countryOfResidence":document.getElementById("cor").value,
            //   "citizenship":document.getElementById("citizenship").value
            // }
            
            // console.log(this.state.selectedFile);
            // console.log("formdata",formData)        

          // let body = {
          //     files:this.state.selectedFile,
          //     kycInfo:kycjson,
          // }

          const kycjson={	
            "createdDate": "test",
            "firstName": "test",
            "lastName": "test",
            "selfiePath": "test",
            "proofType": "test",
            "algoAddress": "test",
            "kycStatus": "pending",
            "reviewedBy": "reviewedBy1",
            "approvedBy": "approvedBy1",
            "submittedDate": "today",
            "reviewedDate": "reviewedDate1",
            "approvedDate": "approvedDate1",
            "identity":"test",
            "countryOfResidence":"test",
            "citizenship":"test"
          }
        

          console.log("location",this.state.selectedFile)
                
          // const initialFormData = Object.freeze({
          //   files : (this.state.selectedFile,this.state.setimagename),
          //   kycInfo: kycjson.toString()
          // });

          // console.log("initial",initialFormData)
          // let bodyFormData = new FormData();
          // bodyFormData.append('files',this.state.selectedFile,this.state.s);
          // bodyFormData.append('kycInfo',kycjson);

         const userjsonkey= {
            "userKey": "1",
            "algoAddress": localStorage.getItem("wallet"),
            "creationTime": today,
            "accountType": "accountType1",
            "profileName": document.getElementById("name").value,
            "twitterName": "twitterName1",
            "profileURL": "profile"
         }

         const kycplainjson={	
          "createdDate": "createddate1",
          "firstName": "fname1 updated",
          "lastName": "lname1",
          "selfiePath": "selfie1",
          "proofType": "proofType1",
          "algoAddress": "algoAddress1",
          "kycStatus": "kycStatus1",
          "reviewedBy": "reviewedBy1",
          "approvedBy": "approvedBy1",
          "submittedDate": "submittedDate1",
          "reviewedDate": "reviewedDate1",
          "approvedDate": "approvedDate1",
          "identity":"identity123",
          "countryOfResidence":"countryOfResidence123",
          "citizenship":"citizenship123"
        };

        // let currentFile = this.state.selectedFiles[0];
        
        //  this.setState({        
        //   currentFile: currentFile,
        // });         
         
        // let formData = new FormData();
        // formData.append("file", currentFile);

        //formDatafinal

        console.log("formDatafinal",this.state.formDatafinal)
        axios.post('http://18.191.6.217:42101/irisapi/v1/kycPlain?',kycplainjson)
            .then(async(response) => {
              console.log("uploadedinitial",response.data)
              console.log("uploadedinitial",response.data['kycId'])
              //655cdc33-3088-4185-a956-9620ce15f135
              console.log("imageref",this.state.selectedFile)
              console.log(response);
            await axios.post(`http://18.191.6.217:42101/irisapi/v1/kycImage/${response.data['kycId']}`,this.state.formDatafinal)
            .then((response) => {
              console.log("uploadedinitial",response)                
            })
            .catch((e) => {
              console.log(response);  
            })        
              //handle success              
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });


        
        // let formDatafinal = new FormData();
        // formDatafinal.append("image",this.state.selectedFile,this.state.selectedFile.name);

        //  axios.post('http://18.189.143.113:42101/irisapi/v1/kycPlain?',kycplainjson)
        //     .then(async(response) => {
        //       console.log("uploadedinitial",response.data)
        //       console.log("uploadedinitial",response.data['kycId'])
        //       //655cdc33-3088-4185-a956-9620ce15f135
        //       console.log("imageref",this.state.selectedFile)
        //   await axios.post(`http://18.189.143.113:42101/irisapi/v1/kycImage/${response.data['kycId']}`,formDatafinal)
        //   .then((response) => {            
        //       console.log("uploadedinitial",response.data)
        //       //655cdc33-3088-4185-a956-9620ce15f135            
        //     //handle success
        //     //console.log(response);
        //   })
        //   .catch(function (response) {
        //     //handle error
        //     console.log(response);
        //   });

        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });


        //  axios.post('http://18.189.143.113:42101/irisapi/v1/users/',userjsonkey)
        //   .then(response => {
        //     if(response.data.status === 200){
        //       console.log("uploaded",response.data)
        //     }
        //     //handle success
        //     console.log(response);
        //   })
        //   .catch(function (response) {
        //     //handle error
        //     console.log(response);
        //   });

          //console.log("beforeaxi",filesvalues)
        //  axios.post('http://18.189.143.113:42101/irisapi/v1/kyc/',initialFormData)
        //     .then(response => {
        //       if(response.data.status === 200){
        //         console.log("uploadedinitial",response.data)
        //       }
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });

          //setimagename - file name 
          //selectedFile - file

        // axios.post('http://18.189.143.113:42101/irisapi/v1/kyc/',{
        //     files:this.state.selectedFile,
        //     kycInfo:kycjson.toString(),
        // })
        // .then(function (response) {
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });         
        // //   console.log("Bodytag",bodyFormData)
        //   axios({
        //     method: "post",
        //     url: "http://18.189.143.113:42101/irisapi/v1/kyc/",
        //     data: {              
        //       kycInfo: kycjson
        //     }
        //   })
        //     .then(function (response) {
        //       //handle success
        //       console.log(response);
        //     })
        //     .catch(function (response) {
        //       //handle error
        //       console.log(response);
        //     });

            
            // axios.post('http://18.189.143.113:42101/irisapi/v1/kyc/',kycjson)
            //   .then(res =>{
            //     console.log(res.data)
            //       // if(res.data['result'] === 'User Create / Update Failed !'){
            //       //   console.log(res.data)
            //       // }else{
            //       //   console.log(res.data['result'])
            //       //   //this.setState({setMove:true});
            //       //   //alert("upload db")            
            //       // }                                 
            //   }).catch((err)=>{
            //     console.log(err)
            //   });                                
            }            
        }                
        return (<>
        <InputGroup className="mt-4" >
        <form onSubmit={this.handleSubmit} style={{marginLeft:"400px"}}>          
        <label>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="Name" type="text" value={this.state.value} id="name"/>                
        <br></br><br></br>        
        
        <label>DOB:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="DD/MM/YYYY" type="date" value={this.state.value} id="dob" />   
        {/* <DatePicker                 
        id="dob"
         placeholderText="Please select a dob"
         selected={ this.state.startDate}
         onChange= { date => this.setState({
            startDate: date
            })
         }
         dateFormat="MMMM d, yyyy"
         shouldCloseOnSelect={true}         
        />      */}             
        <br></br><br></br>                
        <label>Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="Address" type="text" value={this.state.value} id="address"/>   
        <br></br><br></br>        
        <label>Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>        
        <input placeholder="Email" type="email" value={this.state.value} id="email"/>        
        <br></br><br></br>        
        <label>Phone Number:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>        
        <input placeholder="Phone Number" type="tel" value={this.state.value} id="phonenumber" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"/>        
        <br></br><br></br>                              
        <label>Citizenship:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="citizenship" type="text" value={this.state.value} id="citizenship"/>   
        <br></br><br></br>                
        <label>Country of Residence:&nbsp;&nbsp;</label>
        <input placeholder="country of residence" type="text" value={this.state.value} id="cor"/>   
        <br></br><br></br>                
        <label>Type of Proof:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="type of proof" type="text" value={this.state.value} id="top"/>   
        <br></br><br></br>  
        <label>Select Image:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="file" name="tfile" id="fileid" onChange = {captureFile}/>
        <br></br><br></br>                        <br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {this.state.Buttonopen ? (                   
                   <Button color="outline-site-primary" style={{marginLeft:'50px'}} onClick={e=>UploadDb()}>Upload</Button>          
                 ):(
                  <Button color="outline-site-primary" style={{marginLeft:'50px'}} onClick={e=>UploadDbWait()}>Upload</Button>                      
                 )}        
      </form>        
        </InputGroup>                             
                    <br></br><br></br>
               <ModaldMove visible={this.state.setMove} onClose={() => this.setState({setMove:false})}>
               <FolowStepsdMove viewhistory={this.state.dis}  />
             </ModaldMove>           
        </>
        );        
    }
}
export default Dashboard;