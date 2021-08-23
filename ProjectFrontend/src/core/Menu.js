import React from "react"
import { Link,withRouter } from "react-router-dom"

const currentTab=(history,path)=>{
     
    if(history.location.pathname===path)
    {
        return {
            color:"#EFF54D #00AC61" 
        }
    }
    else
    {
        return {
            color:"#d1d1d1" 
        }

    }
}

const Menu=({history})=>(
    <div>
        <ul className="nav nav-tabs bg-light">
            <li className="nav-item">
                <Link style={currentTab(history,"/")} className="nav-link" to="/">
                    Home
                </Link> 
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/Card")} className="nav-link" to="/Card">
                    Card
                </Link> 
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/Dashboard")} className="nav-link" to="/Dashboard">
                    Dashboard
                </Link> 
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/SignIn")} className="nav-link" to="/SignIn">
                    SignIn
                </Link> 
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/SignUp")} className="nav-link" to="/SignUp">
                    SignUp
                </Link> 
            </li>
        </ul>
    </div>



)

export default withRouter(Menu)