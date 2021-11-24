/* global AlgoSigner */
import { Container, Button } from "reactstrap"
import web3 from '../../web3';
import React, { useState,useEffect } from "react";
import Popup from "../../Popup";
import Modald from "../../ModalD";
import FolowStepsd from "../../FolowStepsd";
import ModalList from "../../ModalList";
import FolowStepsList from "./FolowStepList";
import styles from "./ConnectWallet.module.sass";
import ModaldConnect from "../../ModalDConnect";
import FolowStepsdConnect from "../../FolowStepsdConnect";

//window.wallet="";
const Header = (props) => {
    const [isListtry, setisListtry] = useState([]);
    const [isOpenlisttry, setIsOpenlisttry] = useState(false);    
    const [isListtrys, setisListtrys] = useState();
    const[walletconnect,setwalletconnect]=useState();
    const [isOpen, setIsOpen] = useState(false);
    var[dis,setDis] = useState("");
    console.log("checkwalletconnect",walletconnect);
    var s = localStorage.getItem("wallet");
    if(s === 'undefined'){
        localStorage.setItem("wallet","");
    }
    console.log("storage",s)
    const toggleNav = () => {        
        let sidebar = document.getElementsByClassName("sidebar")[0];
        sidebar.classList.toggle("collapse");         
    }

const Connectwallet=async()=>{                          
AlgoSigner.connect()
.then((d) => {
AlgoSigner.accounts({
  ledger: 'TestNet'
})
.then((d) => {    
  console.log("listaccount",d)
 localStorage.setItem("wallet",d[0].address)
 //window.location.reload();
  setisListtry(d)
  setIsOpenlisttry(true)  
})
.catch((e) => {
  console.error(e);
}); 
})
.catch((e) => {
console.error(e);
});

        
        
    //     const networkid=await web3.eth.getChainId();
    //     console.log("network id",networkid);
    //     if(networkid!=56){
    //     setIsOpen(true);
    //     setDis("Connected to Wrong Network,Please connect to Binance Mainnet");
    //     }else{        
    //     window.ethereum.enable();          
    //     let accounts=await web3.eth.getAccounts();
    //    // web3.eth.getChainId().then(console.log);
    //    // const networkid=await web3.eth.getChainId();
    //    // console.log("network id",networkid);
    //     await web3.eth.getAccounts().then(()=>{          
    //         console.log("acc Binance",accounts[0])
    //         setwalletconnect(accounts[0])
    //         window.wallet=accounts[0];
           
    //        localStorage.setItem("wallet",accounts[0])
    //        //sessionStorage.setItem("wallet", accounts[0]);
    //       }).then(()=>{
    //           window.location.reload()
    //       })
    //     console.log(accounts);
    //     }  
    }

    const Disconnect=()=>{            
        
        
       localStorage.setItem("wallet","")
       window.location.reload()
        
        
    }
    


    return (<>
       {/* <Modald visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsd viewhistory={dis}  />
      </Modald> */}

      <ModaldConnect visible={isOpen} onClose={() => setIsOpen(false)}>
        <FolowStepsdConnect viewhistory={dis}  />
      </ModaldConnect>
        <div className="header bg-site-secondary ">
            <Container fluid className="px-md-5">
                <div className="d-flex align-items-center font-semi-bold">
                    <span className="mr-3 toggler-btn" onClick={e=>toggleNav()}><i className="fa fa-bars"></i></span>                   
                    {/* <h5 className="m-0" id="header-title"></h5> */}
                    <h5 className="m-0" id="header-title"></h5>
                    <div className="ml-auto topbar-btns">
                        <Button color="outline-site-primary">ALGORAND</Button>
                        {
                            localStorage.getItem("wallet")===null || localStorage.getItem("wallet")==="" ||localStorage.getItem("wallet")==='undefined' ||localStorage.getItem("wallet")===undefined ?  
                            (<Button color="site-primary" className="ml-4"onClick={Connectwallet}>CONNECT WALLET</Button>):(
                              < ><Button color="site-primary" className="ml-4" onClick={Connectwallet}>{localStorage.getItem("wallet").slice(0,10)}......{localStorage.getItem("wallet").slice(39,42)}</Button>
                                &nbsp; &nbsp;
                                <Button color="outline-site-primary" onClick={Disconnect}>DISCONNECT</Button>
                                </>    
                            )
                        }
                      
                    </div>
                </div>
        <ModalList visible={isOpenlisttry} >
        <FolowStepsList className={styles.steps} data={isListtry} datas={(a)=>
        {
          setisListtrys(a)
          setIsOpenlisttry(false)          
          setIsOpen(true)
          localStorage.setItem("net","testnet")
        }
        }/>          
    </ModalList>  
            </Container>
        </div>
    </>);
}

export default Header;