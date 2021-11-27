/* global AlgoSigner */
import { useEffect } from "react";
import { useState,useStyles } from "react";
//import busd from "./busdAbi";
//import cbusd from "./cbusdAbi";
import { Link, useHistory } from "react-router-dom";
import { Button, Dropdown, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Row } from "reactstrap";
//import CFI from "./carbonFinanceAbi";
import Modald from "../ModalD";
import FolowStepsd from "../FolowStepsd";
import FolowStepsdcopy from "../FolowStepsdcopy";
import axios from 'axios';
import ModaldWaiting from "../ModalDWaiting";
import FolowStepsdWaiting from "../FolowStepsdWaiting";
import RefreshIcon from '@material-ui/icons/Refresh';
import FolowStepsAsset from "../FolowStepsAsset";
import ModaldConnect from "../ModalDConnect";
import ModalDLoading from '../ModalDLoading';
import FolowStepsLoading from '../FolowStepsLoading';
import config from '../configurl'

const Vault = () => {
  const [getcurrents, setcurrents] = useState(""); 
  console.log("Currents",getcurrents) 
  const [getdob, setdob] = useState(""); 
  console.log("dob",getdob) 
  const [getemail, setemail] = useState(""); 
  console.log("getemail",getemail) 
  const [getphonenumber, setphonenumber] = useState(""); 
  console.log("getphonenumber",getphonenumber)   
  const [getaddress, setaddress] = useState(""); 
  console.log("getaddress",getaddress) 
  const [getcitizenship, setcitizenship] = useState(""); 
  console.log("getcitizenship",getcitizenship) 
  const [getprooftype, setprooftype] = useState(""); 
  console.log("getprooftype",getprooftype) 
  const [getproofnumber, setproofnumber] = useState(""); 
  console.log("getproofnumber",getproofnumber) 
  console.log("config",config)
  const [getmetadata,setmetadata] = useState(""); 
  console.log("getmetadata",getmetadata)
  const [getcurrent, setcurrent] = useState(false); 
  console.log("Current",getcurrent) 
  const [getLoading, setLoading] = useState(false);  
  const [user, setUser] = useState(null);
  console.log("userprint",user)
  const [getresponse, setresponse] = useState([]);  
  console.log("getr",getresponse)
  const [getassetid, setassetid] = useState('');
  console.log("getassetid",getassetid)
  // useEffect(() => {
  //   const fetchPosts = async () => {            
  //     const kycplainget= await axios.get(`http://18.191.6.217:42101/irisapi/v1/kyc/${location.state['profileURL']}`)
  //     //const res = await axios.get(`http://18.191.6.217:42101/irisapi/v1/users/${location.state['algoAddress']}`)                              
  //     setresponse((kycplainget.data['base64Image']))      
  //   };
  //   fetchPosts();
  // }, []);
  useEffect(() => {
    axios.get(`${config}/users/${localStorage.getItem('wallet')}`).then(async(u) => {
      setUser(u.data)
      await axios.get(`${config}/kyc/${u.data['profileURL']}`).then((response)=>{
      setresponse(response.data)      
      })            
    })    
  }, []);
  
    const pinataApiKey = "221cfff25de18e88d3d0";
    const pinataApiSecret = "ddffffed103d82a6296a378c80ddd2b4280b0d8a51e6922122fd3817accb45ba";
    const pinataSDK = require('@pinata/sdk');
    const pinata = pinataSDK(pinataApiKey, pinataApiSecret);
    const nftWorkspacePath = __dirname + '/workspace';
    const bs58 = require("bs58");
    const [posts, setPosts] = useState([]);
    console.log("posts",posts)
    useEffect(() => {
        const fetchPosts = async () => {          
            if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined){

                alert("please connect your wallet")
            }
            else{                
                await axios.get(`${config}/users/${localStorage.getItem('wallet')}`).then(async(res)=>{
                  setPosts(res.data); 
                  console.log("Nullres",res)
                  await axios.get(`${config}/kyc/${res.data['profileURL']}`).then((response)=>{
                    console.log("ResponseCon",response.data['assetId'])
                    console.log("ResponseCoR",response.data['countryOfResidence'])
                    setcurrents(response.data['countryOfResidence'])
                    setdob(response.data['dob'])
                    setaddress(response.data['address'])
                    setphonenumber(response.data['phoneNumber'])
                    setemail(response.data['email'])
                    setcitizenship(response.data['citizenship'])
                    setprooftype(response.data['proofType'])
                    //setproofnumber(response.data['citizenship'])                    
                    if(response.data['assetId'] === null || response.data['assetId'] === " " || response.data['assetId'] === undefined || response.data['assetId'] === "null"){
                      setcurrent(false)
                    }                    
                    else{                      
                      setcurrent(true)                                        
                    }                    
                });
                });
                
            }          
        };    
        fetchPosts();
      }, []);

    let arc3MetadataJSON={
        "name": "",
        "dob": "",
        "address":"",
        "email":"",      
        "phonenumber":"",
        "citizenship":"",
        "prooftype":"",
        "proofnumber":"",
        "algoaddress":"",
        "image": "ipfs://",
        "image_integrity": "sha256-",
        "image_mimetype": "image/png",
        "external_url": "https://github.com/emg110/arc3ipfs",
        "animation_url": "",
        "animation_url_integrity": "sha256-",
        "animation_url_mimetype": "",
        "properties": {
            "file_url": "",
            "file_url_integrity": "",
            "file_url_mimetype": "",
        }}
    
    
    // window.onbeforeunload = () => {
	// 	sessionStorage.removeItem('wallet');
	//   }
    let [activeTab, setActiveTab] = useState("Deposit");    
    const [isOpen, setIsOpen] = useState(false);
    const [isOpens, setIsOpens] = useState(false);
    const [isOpenWait, setIsOpenWait] = useState(false);
    const [isOpenAsset, setIsOpenAsset] = useState(false);
    
    var[dis,setDis] = useState("");  
    let history = useHistory();
    const walletsession=async()=>{
        const display =sessionStorage.getItem("wallet");
        console.log("check1session",display)
    }
    useEffect(()=>{walletsession()},[])
    useEffect(() => {
        document.getElementById("header-title").innerText = "CREATE D-ID";
    })

    
      const approve = async() => {
          //alert("upload pinata and create asset here ")                    
          setIsOpenWait(false)
        if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined)
        {
          alert("please conenct your wallet")
        }
        else if(getcurrent === true){
          alert("you are already created D-ID")          
        }
        else{
          CreateAsset();                    
        }
          
      }      

      const convertIpfsCidV0ToByte32 = (cid) => {
        let hex = `${bs58.decode(cid).slice(2).toString('hex')}`
        let base64 = `${bs58.decode(cid).slice(2).toString('base64')}`
        //third console
        console.log('CID Hash Converted to hex: ', hex)      
        const buffer = Buffer.from(bs58.decode(cid).slice(2).toString('base64'), 'base64');
        //fourth console
        console.log('CID Hash Converted to Base64: ', base64)
        const volBytes = buffer.length;
        //fifth console
        console.log('CID Hash Bytes volume is: ', `${volBytes} bytes, OK for ASA MetaDataHash field!`)      
        return { base64, hex, buffer };
      };

      const waitForConfirmation = async function (algodclient, txId) {
        let status = (await algodclient.status().do());
        let lastRound = status["last-round"];
          while (true) {
            const pendingInfo = await algodclient.pendingTransactionInformation(txId).do();
            if (pendingInfo["confirmed-round"] !== null && pendingInfo["confirmed-round"] > 0) {
              //Got the completed Transaction
              console.log("Transaction " + txId + " confirmed in round " + pendingInfo["confirmed-round"]);
              break;
            }
            lastRound++;
            await algodclient.statusAfterBlock(lastRound).do();
          }
        };

        function sleep(time){
          return new Promise((resolve)=>setTimeout(resolve,time)
        )
    }

    const updatedb=async(today,assetid)=>{
      sleep(2000).then(async()=>{
        let kycplainjsonupdate={	
          "kycKey":user['profileURL'],
          "createdDate": today,
          "firstName": getresponse['firstName'],
          "lastName": getresponse['lastName'],
          "selfiePath": getresponse['selfiePath'],
          "proofType": getresponse['proofType'],
          "algoAddress":getresponse['algoAddress'],
          "kycStatus": "created",
          "reviewedBy": "approved",
          "approvedBy": "approved",
          "submittedDate": today,
          "reviewedDate": "no",
          "approvedDate": "no",
          "identity":getresponse['identity'],
          "countryOfResidence":getresponse['countryOfResidence'],
          "citizenship":getresponse['citizenship'],
          "base64Image":getresponse['base64Image'],
          "assetId": localStorage.getItem('Assetid'),
          "address":getresponse['address'],
          "dob":getresponse['dob'],
          "email":getresponse['email'],
          "phoneNumber":getresponse['phoneNumber'],
        };
        console.log("afterjsonchange",kycplainjsonupdate)
        sleep(1000).then(async()=>{
        await axios.post(`${config}/kycPlain?`,kycplainjsonupdate)
        .then(async(response) => {
          console.log("configjson",response)          
          setLoading(false)
          setIsOpenAsset(true)          
        })
        .catch(function (response) {
          //handle error
          console.log(response);
        });        
       })        
     })
    }
      const algosdk = require('algosdk');
      const tokenapp = {
          'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
        }
      const server = "https://testnet-algorand.api.purestake.io/ps2";
      let algodPort = "";
      let client = new algosdk.Algodv2(tokenapp, server, algodPort);
      const CreateAsset=async()=>{
        if(localStorage.getItem('wallet') === null || localStorage.getItem('wallet') === "" || localStorage.getItem('wallet') === undefined)
        {
          alert("please conenct your wallet")
        }
        else if(getcurrent === true){
          alert("you are already created D-ID")          
        }
        else{
        setLoading(true)
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;                                                                 
        let pinataApiKey='221cfff25de18e88d3d0';
        let pinataSecretApiKey='ddffffed103d82a6296a378c80ddd2b4280b0d8a51e6922122fd3817accb45ba';
        const pinataSDK = require('@pinata/sdk');
        const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);
            pinata.testAuthentication().then((result) => {            
            console.log(result);  
            let ge=posts['accountType'];
            console.log("ipfsHash",posts['accountType']);
            console.log("ipfsname",posts['profileName']);            
                    const body = {
                        ipfshashurl : ge
                    };
                    const options = {
                        pinataMetadata: {
                            name: posts['profileName'],
                            keyvalues: {
                                customKey: 'customValue',
                                customKey2: 'customValue2'
                            }
                        },
                        pinataOptions: {
                            cidVersion: 0
                        }
                    };
                    pinata.pinJSONToIPFS(body, options).then(async(result) => {                        
                        console.log("pinatajsonresult",result);
                        console.log("jsonresult")                   
        let fileCat = 'image'      
        let nftFileNameSplit = posts['profileName'].split('.')
        let fileExt = nftFileNameSplit[1];      
        let kvProperties = {
          "url": nftFileNameSplit[0],
          "mimetype": `image/${fileExt}`,
        };
        let properties = {
          "file_url": nftFileNameSplit[0],
          "file_url_integrity": "",
          "file_url_mimetype": `image/${fileExt}`,
        };
                        let metadata = arc3MetadataJSON;      
                        let integrity = convertIpfsCidV0ToByte32(posts['accountType'])
                        metadata.properties = properties;
                        metadata.properties.file_url = `https://ipfs.io/ipfs/${posts['accountType']}`;
                        metadata.properties.file_url_integrity = `${integrity.base64}`;
                        metadata.name = `${posts['profileName']}@arc3`;
                        metadata.dob = getdob;
                        metadata.address = getaddress;
                        metadata.email = getemail;
                        metadata.phonenumber = getphonenumber;
                        metadata.citizenship = getcitizenship;
                        metadata.prooftype = getprooftype;
                        metadata.proofnumber = getcurrents;
                        metadata.algoaddress = localStorage.getItem('wallet');                        
                        metadata.image = `ipfs://${posts['accountType']}`;
                        metadata.image_integrity = `${integrity.base64}`;;
                        metadata.image_mimetype = `${fileCat}/${fileExt}`;
      setmetadata(metadata)
        //sixth console      
        console.log('Algorand NFT::ARC3::IPFS scenario 1: The NFT prepared metadata: ', metadata);      
        await pinata.pinJSONToIPFS(metadata, options).then(async(result) => {
        console.log("pinataresponse",result)
        let jsonIntegrity = convertIpfsCidV0ToByte32(posts['twitterName'])
        //console.log('Algorand NFT::ARC3::IPFS scenario 1: The NFT metadata JSON file pinned to IPFS via Pinata: ', resultMeta);        
                        //create asset here
                        const algosdk = require('algosdk');  
                        const CryptoJS = require("crypto-js");  
                        let accounts;
                        let tx;
                        const server = "https://testnet-algorand.api.purestake.io/ps2";
                        const port = "";  
                        const token = {
                              'X-API-key' : 'SVsJKi8vBM1RwK1HEuwhU20hYmwFJelk8bagKPin',
                        }    
                        let algodClient = new algosdk.Algodv2(token, server, port);
                        //setmetadata(`https://gateway.pinata.cloud/ipfs/"+${result['IpfsHash']}`)
                        console.log("aftermetadata",getmetadata)
                        let encrypted = CryptoJS.AES.encrypt(`https://gateway.pinata.cloud/ipfs/"+${result['IpfsHash']}`,getcurrents);
                        console.log("encry",encrypted)
                        //U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=                      
                    AlgoSigner.connect()//connect algosigner
                      .then((d) => {
                      console.log("tested1")
                      algodClient.healthCheck().do()//sdk setup
                      .then(d => {     
                        AlgoSigner.accounts({//get account
                          ledger: 'TestNet'
                        })
                        .then((d) => {
                          console.log("tested2",d)
                          accounts = d;
                          console.log("algoacc",localStorage.getItem("wallet"))
                          algodClient.getTransactionParams().do()//params purestake genesis hash / genesis id like chain acc 
                      .then((d) => {
                        let txParamsJS = d;
                        console.log("txparamsJS",txParamsJS)
                          const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    //asset create 
                          from: localStorage.getItem("wallet"),
                          assetName: posts['profileName'],
                          unitName: "DId",
                          total: 1,
                          decimals: 0,
                          note: AlgoSigner.encoding.stringToByteArray(encrypted.toString()),
                          // assetURL:"https://cifi-mvp-iris.vercel.app/",
                          manager:localStorage.getItem("wallet"),
                          reserve:localStorage.getItem("wallet"),
                          freeze: localStorage.getItem("wallet"),
                          clawback:localStorage.getItem("wallet"),
                          //AlgoSigner.encoding.stringToByteArray(document.getElementById('note').value),
                          suggestedParams: txParamsJS
                        });
                      
                        console.log("txnprint",txn)
                        // Use the AlgoSigner encoding library to make the transactions base64
                        const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());    //converted
                        AlgoSigner.signTxn([{txn: txn_b64}]) //sign -txid and blob
                        .then((d) => {
                          console.log("signTx",d)
                          let signedTxs = d;
                          let signCodeElem = JSON.stringify(d, null, 2);
                          console.log("signcoderElem",signCodeElem)                      
                          AlgoSigner.send({ //send blob verify and get tranfer id
                            ledger: 'TestNet',
                            tx: signedTxs[0].blob
                          })
                          .then((d) => {
                            tx = d;
                            console.log("txidprint",tx.txId)                            
                            AlgoSigner.algod({ // round confirmation ?
                              ledger: 'TestNet',
                              path: '/v2/transactions/pending/' + tx.txId
                            })
                            .then(async(d) => {
                              console.log(d);        
                              console.log("beforesuccess",tx.txId)      
                              await waitForConfirmation(client, tx.txId);
                              let ptx = await algodClient.pendingTransactionInformation(tx.txId).do();                              
                              setassetid(ptx["asset-index"])
                              localStorage.setItem("Assetid",(ptx["asset-index"]).toString())
                              console.log("AssetId",ptx["asset-index"])                              
                              await updatedb(today,ptx["asset-index"])
                              //add db asset here
                              //alert("Create Decentralized ID ")                                
                              
                            })
                            .catch((e) => {
                              console.error(e);
                            });
                          })
                          .catch((e) => {
                            console.error(e);
                          });
                      
                        })
                        .catch((e) => {
                          console.error(e);
                        });
                      })
                      .catch((e) => {
                        console.error(e);
                      });
                        })
                        .catch((e) => {
                          console.error(e);
                        });
                      
                      })
                      .catch(e => { 
                        console.error(e); 
                      });
                      
                      
                      })
                      .catch((e) => {
                        console.error(e);
                      });

      }).catch((err) => {
        //handle error here
        console.log(err);
        console.log("you are already uploaded catch 1..")
        setLoading(false)
        alert("please try again")
    });  
        
                      }).catch((err) => {
                          //handle error here
                          console.log(err);
                          console.log("you are already uploaded catch 1..")
                          setLoading(false)
                          alert("please try again")
                      });    
                    }).catch((err) => {
                        //handle error here
                        console.log(err);
                        console.log("you are already uploaded..")
                        setLoading(false)
                        alert("please try again")
                    });        
        }

    }

      const pending=()=>{
        //setIsOpenAsset(true)
        setIsOpenWait(true)
        //alert("please wait your profile Not Approved ... ")
      }
      const togglePopup = () => {
        setIsOpen(false);
      }

      
    return (
       
    <section className="p-0 my-5">            
    <ModalDLoading visible={getLoading} onClose={() => setLoading(false)}>
        <FolowStepsLoading viewhistory={dis}/>
    </ModalDLoading>
    <ModaldConnect visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsAsset viewhistory={dis}/>
    </ModaldConnect>
    <ModaldWaiting visible={isOpenAsset} onClose={() => setIsOpenAsset(false)}>
        <FolowStepsAsset viewhistory={dis}  />
    </ModaldWaiting>
    <ModaldConnect visible={isOpens} onClose={() => setIsOpens(false)}>
        <FolowStepsdcopy viewhistory={dis}  />
    </ModaldConnect>
    <ModaldWaiting visible={isOpenWait} onClose={() => setIsOpenWait(false)}>
        <FolowStepsdWaiting viewhistory={dis}  />
    </ModaldWaiting>
            <Container fluid>
            {
            localStorage.getItem("wallet")===null || localStorage.getItem("wallet")==="" || localStorage.getItem("wallet")=== undefined ?(
            <>
                   <Row className="justify-content-center">
                    <Col xl="7" lg="9" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="bar-items-wrapper">
                                <div
                                    className="bar-items bg-site-secondary pl-3"
                                    style={{ minWidth: "470px" }}
                                >
                                    <Link
                                        to="#"
                                        className={`bar-item text-uppercase ml-0 ${activeTab == "Deposit" ? "active" : ""
                                            }`}
                                        >
                                        <span>CREATE</span>
                                    </Link>      
                                </div>
                            </div>
{  activeTab == "Deposit" && (
   <div className="p-3">                                    
   <div>         
   <div>
   <h6>CREATE D-ID</h6>
   <InputGroup className="mt-3" style={{marginLeft:"250px"}}>       
       <Button color="site-primary">CREATE</Button>
   </InputGroup>                                    
   </div>
   </div>                                 
   <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
   </div>
    )}                            
    </Card>
                    </Col>
                </Row>                  
            </>
            ):
            (
            <>
                <Row className="justify-content-center">
                    <Col xl="7" lg="9" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="bar-items-wrapper">
                                <div
                                    className="bar-items bg-site-secondary pl-3"
                                    style={{ minWidth: "470px" }}>
                                    <Link
                                        to="#"
                                        className={`bar-item text-uppercase ml-0 ${activeTab == "Deposit" ? "active" : ""
                                            }`}
                                        onClick={(e) => setActiveTab("Deposit")}>
                                        <span>CREATE</span>
                                    </Link>                                    
                                </div>
                            </div>
{activeTab == "Deposit" && (
<div className="p-3">                                    
<div>         
<div>
{/* {posts.map(k => (
        <h2>{k.algoAddress}</h2>
      ))} */}
{/* {posts.map((x,index)=>{   
<h1>{x.algoAddress}</h1>;
    })} */}
<h6>CREATE D-ID</h6>
<InputGroup className="mt-3" style={{marginLeft:"250px"}}>    
{posts['twitterName'] === "Approved"  ? (
  <>

<Button color="site-primary" onClick={()=>approve()}>CREATE</Button> 
{/* <RefreshIcon style={{fontSize:"40px",color:"#2a7cda"}} onClick={()=>{window.location.reload(false)}}/> */}
</>
):(
  <>
  {/* {setIsOpenWait(true)} */}
  
<Button color="site-primary" onClick={()=>pending()}>CREATE</Button>
{/* <RefreshIcon style={{fontSize:"40px",color:"#2a7cda"}} onClick={()=>{window.location.reload(false)}}/> */}

</>
)}
   
</InputGroup>                                    
</div>
</div>                                 
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
</div>
)}                            
</Card>
</Col>
</Row>                                  
</>
)}
</Container>
<br></br><br></br><br></br><br></br>
</section>
);
}

export default Vault;