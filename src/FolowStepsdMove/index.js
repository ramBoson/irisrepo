import React from "react";
import cn from "classnames";
import styles from "./FolowSteps.module.sass";
//import Icon from "../../../components/Icon";
//import Loader from "../../../components/Loader";
//import LoaderCircle from "../../../components/LoaderCircle";
import history from '../views/history';
import { Link } from "react-router-dom";
//import { createBrowserHistory as history} from 'history';


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
            <h4 style={{color:'#f5584b'}}>Please wait Your Files has been Uploading ...</h4>
            <div className={styles.details}>
              <div className={styles.info}>{viewhistory}</div>
            </div>
          </div>
          {/* <button type="submit" className={cn("button-small", styles.button)} onClick={onClo()}>Done</button> */}
          {/* onClick={()=>history.push('/vault')} */}
          <center>
          <Link className={styles.card} to={"/vault"}>
          <button type="submit" className={cn("button-small", styles.title)} >
            ok
          </button>
          </Link>
          </center>
        </div>

        
            
          
      </div>
    </div>
  );
};

export default FolowStepsdConnect;
