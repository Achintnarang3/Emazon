import React, { Fragment } from "react"
import { Link,withRouter } from "react-router-dom"
import { isAuthenticated, signout } from "../auth/helper"

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

const help = () => {
    console.log(isAuthenticated())
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
            {
                isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link style={currentTab(history,"/UserDashboard")} className="nav-link" to="/UserDashboard">
                            User.Dashboard
                        </Link> 
                   </li>
                    
                 )
            }

                     



            {
                isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link style={currentTab(history,"/AdminDashboard")} className="nav-link" to="/AdminDashboard">
                        Admin.Dashboard
                        </Link> 
                    </li>
                )
            }
            
            

            {
                (!isAuthenticated() && (
                    <Fragment>
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
                 </Fragment>
                ))
           } 
            
            {
                isAuthenticated() && (
                     <li className="nav-item">
                        <span className="nav-link" onClick={() => {
                                signout(() => {
                                history.push("/signin")
                                })}}
                        >
                            SignOut
                        </span>
                    </li>
                    
               )     
            }
             
        </ul>
    </div>



)

export default withRouter(Menu)