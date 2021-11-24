import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Container } from "reactstrap";
import logo from "../../assets/img/logo.PNG";
import logonew from "../../assets/img/logonew.PNG";
const Sidebar = (props) => {
    let history = useHistory();
    const toggleSidebar = () => {
        let sidebar = document.getElementsByClassName("sidebar")[0];
        let mainContent = document.getElementsByClassName("main-content")[0];
        sidebar.classList.toggle("hide");
        mainContent.classList.toggle("hide");
    }
    const monitorNavbar = () => {
        let sidebar = document.getElementsByClassName("sidebar")[0];
        let mainContent = document.getElementsByClassName("main-content")[0];
        if (window.innerWidth < 991.98) {
            sidebar.classList.remove("hide");
            sidebar.classList.add("collapse");
            mainContent.classList.remove("hide");
        }
        else {
            
            sidebar.classList.remove("collapse");
        }
    }
    useEffect(() => {
        window.addEventListener("resize", monitorNavbar)
        return () => {
            window.removeEventListener("resize", monitorNavbar)
        }
    })
    useEffect(()=>{
        monitorNavbar();
    },[])
    return (<>        
        <div className="sidebar bg-site-secondary">
        <center>        
            <img src={'/irispic.png'} style={{width:100,height:100,position:"relative"}} alt="Logo" />
            </center>
            <div className="theme-nav-items">            
            <Link to="/dashboardd" className={`theme-nav-item ${history.location.pathname === "/dashboardd" ? "active" : ""}`}>
                    <i className="fa fa-tachometer-alt "></i>
                    <span className="ml-3">DASHBOARD</span>
                </Link>
               
                <Link to="/createkyc" className={`theme-nav-item ${history.location.pathname === "/createkyc" ? "active" : ""}`}>
                    <i className="fa fa-wallet"></i>
                    <span className="ml-3">CREATE KYC</span>
                </Link>
                <Link to="/createdid" className={`theme-nav-item ${history.location.pathname === "/createdid" ? "active" : ""}`}>
                    <i className="fa fa-wallet"></i>
                    <span className="ml-3">CREATE D-ID</span>
                </Link>
                <Link to="/viewdid" className={`theme-nav-item ${history.location.pathname === "/viewdid" ? "active" : ""}`}>
                    <i className="fa fa-retweet"></i>
                    <span className="ml-3">VIEW D-ID</span>
                </Link>
                {/* <Link to="/yield-farming" className={`theme-nav-item ${history.location.pathname == "/yield-farming" ? "active" : ""}`}>
                    <i className="fa fa-tractor"></i>
                    <span className="ml-3">Yield Farming</span>
                </Link> */}
                {/* <Link to="/carbon-yield" className={`theme-nav-item ${history.location.pathname == "/carbon-yield" ? "active" : ""}`}>
                    <i className="fa fa-fire-alt"></i>
                    <span className="ml-3">Carbon Yield</span>
                </Link>
                <Link to="/governance" className={`theme-nav-item ${history.location.pathname == "/governance" ? "active" : ""}`}>
                    <i className="fa fa-university"></i>
                    <span className="ml-3">Governance</span>
                </Link>
                <Link to="/burn-vault" className={`theme-nav-item ${history.location.pathname == "/burn-vault" ? "active" : ""}`}>
                    <i className="fa fa-wallet"></i>
                    <span className="ml-3">Burn Vault</span>
                </Link> */}
                <hr/>
                {/* <Link to="/docs" className={`theme-nav-item ${history.location.pathname == "/docs" ? "active" : ""}`}>
                    <i className="fa fa-file"></i>
                    <span className="ml-3">Docs</span>
                </Link>
                <Link to="#" className={`theme-nav-item`}>
                    <i className="fa fa-moon"></i>
                    <span className="ml-3">Dark</span>
                </Link> */}
                {/* <Link to="#" className="theme-nav-item custom-navbar-toggler" onClick={e => toggleSidebar()}>
                    <i className="fa show-icon fa-arrow-left"></i>
                    <i className="fa hide-icon fa-arrow-right"></i>
                    <span className="ml-3">Hide Menu</span>
                </Link> */}
                <div className="d-sm-flex d-lg-none">
                    <Button block color="outline-site-primary">Ethereum Mainnet</Button>
                    <Button block color="site-primary" className="ml-0 ml-sm-4 mt-3 mt-sm-0">Connect Wallet</Button>
                </div>
            </div>
        </div>
    </>);
}

export default Sidebar;