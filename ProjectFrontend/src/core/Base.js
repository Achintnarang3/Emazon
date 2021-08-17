import React from "react"

const Base=({
    title="My title",
    description="My description",
    className="bg-dark text-white p-4",
    children
})=>{
    return(
        <div>
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2>{title}</h2>
                    <h3>{description}</h3>
                </div>
                <p>This is main Content</p>
                <div className={className}>
                {children}
            </div>
            </div>
           
            <footer className="footer bg-dark mt-auto py-5">

                <div className="container">
                    <h3>If you got any question reach out</h3>
                    <button className="btn btn-warning btn-large">Contact Us</button>
                </div>

                <div className="container">
                    <h3>An amazing site</h3>
                    
                </div>

            </footer>

        </div>
    )
}

export default Base