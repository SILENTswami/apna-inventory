import React from "react";
import { Button, Input } from "reactstrap";

class LoginPage extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-5">
                    <div className="p-5 bg-primary-o" style={{ height: "100vh" }}>
                        <img src={require("../Assets/Logo.png")} alt="zostel" />
                        <div className="text-center" style={{ marginTop: "10rem" }}>
                            <div className="text-text h1 fw-bold">Zostel Business</div>
                            <div className="text-text h5">One stop solution to all your staycation needs</div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-7">
                    <div style={{ height: "100vh", width: "50%", margin: "auto" }} className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <div className="text-dark-o h1 mb-5">Login</div>
                        <Input placeholder="Email" />
                        <Input placeholder="Password" />
                        <Button className="px-5cd ..
                        cd  bg-primary-o">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage