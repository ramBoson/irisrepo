/* global AlgoSigner */
import { useEffect } from "react";
import { useState } from "react";
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


const Vault = () => {
    const pinataApiKey = "88348e7ce84879e143e1";
    const pinataApiSecret = "e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f";
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
                //const res = await axios.get(`http://18.220.0.247:42101/irisapi/v1/users/${localStorage.getItem('wallet')}`);
                const res = await axios.get(`http://18.116.51.140:42101/irisapi/v1/users/${localStorage.getItem('wallet')}`);
                setPosts(res.data);          
            }          
        };    
        fetchPosts();
      }, []);

    let arc3MetadataJSON={
        "name": "",
        "description": "",
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
          CreateAsset();                    
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

      const CreateAsset=async()=>{
        let pinataApiKey='88348e7ce84879e143e1';
        let pinataSecretApiKey='e4e8071ff66386726f9fe1aebf2d3235a9f88ceb4468d4be069591eb78d4bf6f';
        const pinataSDK = require('@pinata/sdk');
        const pinata = pinataSDK(pinataApiKey, pinataSecretApiKey);
            pinata.testAuthentication().then((result) => {            
            console.log(result);  
            let ge=posts['twitterName'];
            console.log("ipfsHash",posts['twitterName']);
            console.log("ipfsname",posts['profileName']);            
                    const body = {
                        message: ge
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
                        console.log(result);
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
                        let integrity = convertIpfsCidV0ToByte32(posts['twitterName'])
                        metadata.properties = properties;
                        metadata.properties.file_url = `https://ipfs.io/ipfs/${posts['twitterName']}`;
                        metadata.properties.file_url_integrity = `${integrity.base64}`;
                        metadata.name = `${posts['accountType']}@arc3`;
                        metadata.description = posts['accountType'];
                        metadata.image = `ipfs://${posts['profileURL']}`;
                        metadata.image_integrity = `${integrity.base64}`;;
                        metadata.image_mimetype = `${fileCat}/${fileExt}`;
      
        //sixth console      
        console.log('Algorand NFT::ARC3::IPFS scenario 1: The NFT prepared metadata: ', metadata);      
        await pinata.pinJSONToIPFS(metadata, options).then(async(result) => {
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
                        var encrypted = CryptoJS.AES.encrypt("dbgethere", "password");
                        //U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=
                      
                    AlgoSigner.connect()
                      .then((d) => {
                      console.log("tested1")
                      algodClient.healthCheck().do()
                      .then(d => {     
                        AlgoSigner.accounts({
                          ledger: 'TestNet'
                        })
                        .then((d) => {
                          console.log("tested2",d)
                          accounts = d;
                          console.log("algoacc",localStorage.getItem("wallet"))
                          algodClient.getTransactionParams().do()
                      .then((d) => {
                        let txParamsJS = d;
                        console.log("txparamsJS",txParamsJS)
                        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({    
                          from: localStorage.getItem("wallet"),
                          assetName: posts['accountType'],
                          unitName: "DI",
                          total: 1,
                          decimals: 0,
                          note: AlgoSigner.encoding.stringToByteArray(encrypted.toString()),
                          assetURL:"https://cifi-mvp-iris.vercel.app/",
                          manager:localStorage.getItem("wallet"),
                          reserve:localStorage.getItem("wallet"),
                          freeze: localStorage.getItem("wallet"),
                          clawback:localStorage.getItem("wallet"),
                          //AlgoSigner.encoding.stringToByteArray(document.getElementById('note').value),
                          suggestedParams: txParamsJS
                        });
                      
                        console.log("txnprint",txn)
                        // Use the AlgoSigner encoding library to make the transactions base64
                        const txn_b64 = AlgoSigner.encoding.msgpackToBase64(txn.toByte());
                        
                        AlgoSigner.signTxn([{txn: txn_b64}])
                        .then((d) => {
                          console.log("signTx",d)
                          let signedTxs = d;
                          let signCodeElem = JSON.stringify(d, null, 2);
                          console.log("signcoderElem",signCodeElem)
                      
                          AlgoSigner.send({
                            ledger: 'TestNet',
                            tx: signedTxs[0].blob
                          })
                          .then((d) => {
                            tx = d;
                            console.log("txidprint",tx.txId)
                            AlgoSigner.algod({
                              ledger: 'TestNet',
                              path: '/v2/transactions/pending/' + tx.txId
                            })
                            .then((d) => {
                              console.log(d);        
                              console.log("beforesuccess",tx.txId)      
                              //add db asset here
                              alert("Create Decentralized ID ")                                
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
    });  
        
                      }).catch((err) => {
                          //handle error here
                          console.log(err);
                          console.log("you are already uploaded catch 1..")
                      });    
                    }).catch((err) => {
                        //handle error here
                        console.log(err);
                        console.log("you are already uploaded..")
                    });        

    }


      const pending=()=>{
        setIsOpenWait(true)
        alert("please wait your profile ")
      }
      const togglePopup = () => {
        setIsOpen(false);
      }

      
    return (
       
    <section className="p-0 my-5">            
    <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsd viewhistory={dis}  />
    </Modald>
    <Modald visible={isOpens} onClose={() => setIsOpens(false)}>
        <FolowStepsdcopy viewhistory={dis}  />
    </Modald>
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
{posts['profileURL'] === "approved"  ? (
<Button color="site-primary" onClick={()=>approve()}>CREATE</Button> 
):(
  <>
  {/* {setIsOpenWait(true)} */}
<Button color="site-primary" onClick={()=>pending()}>PENDING</Button>
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