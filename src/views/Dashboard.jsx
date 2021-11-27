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
import ModaldConnect from "../ModalDConnect";
import FolowStepsEnterAll from '../FolowStepsEnterAll';
import FolowStepsMovedid from '../FolowStepsMovedid';
import ModalDLoading from '../ModalDLoading';
import FolowStepsLoading from '../FolowStepsLoading';
import FolowStepsLoadingFirst from '../FolowStepsLoadingFirst';
import config from '../configurl'

class Dashboard extends Component {
    state={
        activeTab: "ViewPool",
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
      Buttonopen:(false),
      selectedFile: undefined,
      fileInfos: [],
      currentFile: undefined,
      setFiles:[],
      formDatafinal:"",
      setIsOpen:(false),
      setisOpenmkyc:(false),
      setLoading:(false),
      setCurrent:false,
      //updateFormData : (initialFormData)
  }
    setActiveTab = (tab) => {
        console.log(tab)
        this.setState({ activeTab: tab })
    }
    componentDidMount() {
        document.getElementById("header-title").innerText = "CREATE KYC";              
              if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined){  
                  alert("please connect your wallet")
              }
              else{                  
                  axios.get(`${config}/users/${localStorage.getItem('wallet')}`).then((e)=>{
                    if(e.data['algoAddress'] === localStorage.getItem('wallet'))
                    this.setState({ setCurrent:true});
                    else
                    this.setState({ setCurrent:false});
                  });                  
              }                      
    }        
                    
    render()
    {      
      
    let filesvalues= [];
    const captureFile =(event) => {
      this.setState({
        selectedFiles: event.target.files[0],
      });
      let filess=event.target.files;      
      // const formDataprint={files:event.target.files[0]}
      // this.setState({formDatafinal:formDataprint})      
      let reader = new FileReader();
      reader.readAsDataURL(filess[0])
      reader.onload=(e)=>{
        //console.log("imgdata",e.target.result)
        const formDataprint={file:e.target.result}
        this.setState({formDatafinal:formDataprint})                      
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
        // const CID = require('cids')
        // var cid = new CID(ipfsHash[0].hash)        
        // console.log("cid",cid.toV1().toBaseEncodedString('base32'));
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
                //alert("please fill all details..")                                
                this.setState({setisOpen:true})
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
                this.setState({setisOpen:true})
                }    
                else if(this.state.setCurrent === true){
                  alert("Your Profile Already Created")
                }                
            else{
            //let address="\""+ localStorage.getItem("wallet") +"\"";
            this.setState({setisOpen:false})
            this.setState({setLoading:true})
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
        let bodyFormData = new FormData();
        bodyFormData.append('files',this.state.selectedFiles);          
                

        const kycplainjson={	          
        "createdDate": today,
        "firstName": document.getElementById("name").value,
        "lastName": document.getElementById("dob").value,
        "selfiePath": document.getElementById("fileid").value,
        "proofType": document.getElementById("top").value,
        "algoAddress": localStorage.getItem("wallet"),
        "kycStatus": "create",
          "reviewedBy": "pending",
          "approvedBy": "approved",
          "submittedDate": today,
          "reviewedDate": "no",
          "approvedDate": "no",
          "identity":this.state.setIpfsHash,
          "countryOfResidence":document.getElementById("cor").value,
          "citizenship":document.getElementById("citizenship").value,
          "base64Image":this.state.setImg,
          "assetId":"null",
          "address":document.getElementById("address").value,
          "dob":document.getElementById("dob").value,
          "email":document.getElementById("email").value,
          "phoneNumber":document.getElementById("phonenumber").value,
      }
        
        console.log("formDatafinal2",bodyFormData)
        console.log("formDatafinal3",kycplainjson)
        let userurl="";
        axios.post(`${config}/kycPlain?`,kycplainjson)
            .then(async(response) => {
              //console.log("uploadedinitial",response.data)
              console.log("uploadedinitial",response.data['kycId'])  
              userurl=response.data['kycId'];
              //console.log("imageref",this.state.selectedFile)
              //console.log(response);
            await axios.post(`${config}/kycImage/${response.data['kycId']}`,bodyFormData)
            .then(async(responseimage) => {
              console.log("uploadedimageonly",responseimage)   
              const userjsonkey= {            
                "algoAddress": localStorage.getItem("wallet"),
                "creationTime":today,
                "accountType": this.state.setIpfsHash,
                "profileName": document.getElementById("name").value,
                "twitterName": "pending",
                "profileURL": userurl,
              }   
              console.log("formDatafinal1",userjsonkey)
              await axios.post(`${config}/users`,userjsonkey)
            .then(async(responseuser) => {
              console.log("uploadeduser",responseuser)                        
              this.setState({setLoading:false})   
              this.setState({setisOpenmkyc:true})                                          
            })
            .catch((e) => {
              console.log(e);  
            })                                          
            })
            .catch((e) => {
              console.log(e);  
            })        
              //handle success              
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });        
            }                        
        }                
        const onClo=()=>{
          this.setState({setisOpen:false})      
        }
            
        return (<>
        <InputGroup className="mt-4" >
        <form onSubmit={this.handleSubmit} style={{marginLeft:"400px"}}>          
        <label>Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="Name" type="text" value={this.state.value} id="name"/>                
        <br></br><br></br>                
        <label>DOB:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="DD/MM/YYYY" type="date" value={this.state.value} id="dob" />           
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
        <label>Type of Proof:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="type of proof" type="text" value={this.state.value} id="top"/>   
        <br></br><br></br>  
        <label>Enter Proof Number:&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input placeholder="proof number" type="text" value={this.state.value} id="cor"/>   
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
               <FolowStepsdMove  />
             </ModaldMove>           
    <ModaldConnect visible={this.state.setisOpen} onClose={() => this.setState({setMove:false})}>
        <FolowStepsEnterAll onClo={()=>onClo}/>
    </ModaldConnect>
    <ModaldConnect visible={this.state.setisOpenmkyc} onClose={() => this.setState({setisOpenmkyc:false})}>
        <FolowStepsMovedid />
    </ModaldConnect>
    <ModalDLoading visible={this.state.setLoading} onClose={() => this.setState({setLoading:false})}>
    <FolowStepsLoadingFirst/>
    </ModalDLoading>
        </>        
        );        
    }
}
export default Dashboard;


