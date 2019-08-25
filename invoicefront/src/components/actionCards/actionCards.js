import React from 'react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { withRouter } from 'react-router-dom'

import './actionCard.style.scss'




const ActionCard = (props) => {
  return (
    <div 
      onClick={()=> props.history.push(`${props.path}/${window.localStorage.getItem('companyId')}`)} 
      className="action-card"
      >
      <div className="content">
        
        <div className="icon">
          <AccountBoxIcon className="icon-img"/>
        </div>
        <div className="title">
          {props.routeDesciption}
        </div>
      </div>
    </div>
  );
}

export default withRouter(ActionCard)