import React from "react";
import cn from "classnames";
import styles from "./FolowSteps.module.sass";
//import Icon from "../../../components/Icon";
//import Loader from "../../../components/Loader";
//import LoaderCircle from "../../../components/LoaderCircle";
import { Link } from "react-router-dom";

const FolowStepsdConnect = ({ className,viewhistory}) => {
  return (
    <div className={cn(className, styles.steps)}>
      {/* <h1>{test}</h1> */}      
      <div className={cn("h4", styles.title)}></div>
      <div className={styles.list}>

      <div className={cn(styles.item, styles.done)}>
          <div className={styles.head}>
            <div className={styles.icon}>            
              {/* <Icon name="upload-file" size="24" /> */}
            </div>
            <h4 style={{color:'#2a7cda'}}>Your D-Id Created Successfully...</h4>
            <div className={styles.details}>
              <div className={styles.info}>{viewhistory}</div>
            </div>
          </div>
          {/* <button type="submit" className={cn("button-small", styles.button)} onClick={onClo()}>Done</button> */}
          <center>
          <Link className={styles.card} to={"/viewdid"}>
          <button type="submit" className={cn("button-small", styles.title)} onClick={()=>window.location.reload()}>
            OK
          </button>
          </Link>
          {/* <Link className={styles.card} to={"/adminviewdb"}>
          
          </Link> */}
            </center>
        </div>

        
            
          
      </div>
    </div>
  );
};

export default FolowStepsdConnect;
