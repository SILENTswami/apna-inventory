import React from "react";
import { Alert, Button, Input, InputGroup, InputGroupText } from "reactstrap";
import axios from "axios";
import { baseUrl } from "..";
import { Navigate } from "react-router-dom";

class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            passwordType: "password",
            messageColor: "success",
            message: "",
            isLoading: false
        }
    }
    render() {
        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }
        const changePasswordType = () => {
            if (this.state.passwordType === "password")
                this.setState({ passwordType: "text" })
            else
                this.setState({ passwordType: "password" })
        }

        const onSubmit = () => {
            const { password, email } = this.state
            const data = { password, email }
            this.setState ({isLoading: true})
            axios.post(`${baseUrl}/auth/login`, data).then(result => {
                this.setState({ messageColor: "success", isLoading: false, message: "Login Successful. Redirecting.." })
                setTimeout(() => {
                    this.setState({ message: "" })
                }, 3000)
                localStorage.setItem ("token", result.data.token)
                window.location.reload ()
            }).catch(err => {
                console.log(err.message)
                this.setState({ messageColor: "danger", isLoading: false, message: err.message })
                setTimeout(() => {
                    this.setState({ message: "" })
                }, 3000)
            })
        }

        const isDisabled = !(this.state.email && this.state.password) || this.state.isLoading
        
        if (localStorage.getItem("token"))
            return <Navigate to="/inventory" />
        return (
            <div className="row row-cols-md-2 row-cols-1 g-0">
                <div className="col-md-5">
                    <div className="p-5 bg-primary-o" style={{ height: "100vh" }}>
                        <img src={require("../Assets/Logo.png")} alt="zostel" />
                        <div className="text-center" style={{ marginTop: "10rem" }}>
                            <div className="text-text h1 fw-bold">Zostel Business</div>
                            <div className="text-text h5">One stop solution to all your staycation needs</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div style={{ height: "100vh", width: "50%", margin: "auto" }} className="d-flex flex-column align-items-center justify-content-center gap-3">
                        <div className="text-dark-o h1 mb-5">Login</div>
                        <Input placeholder="Email" onChange={onChange} value={this.state.email} name="email" />
                        <InputGroup className="border rounded">
                            <Input className="border-0" placeholder="Password" onChange={onChange} value={this.state.password} name="password" type={this.state.passwordType} />
                            <InputGroupText style={{ cursor: "pointer" }} onClick={changePasswordType} className="bg-transparent border-0">
                                {this.state.passwordType === "password" ? <i class="bi bi-eye-fill"></i> : <i class="bi bi-eye-slash-fill"></i>}
                            </InputGroupText>
                        </InputGroup>
                        <Button disabled={isDisabled} onClick={onSubmit} className="px-5 bg-primary-o">
                            {this.state.isLoading ? "Loading.." : "Login"}
                        </Button>
                        {this.state.message &&
                            <Alert color={this.state.messageColor}>
                                {this.state.message}
                            </Alert>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage

// Account Credentials: test@gmail.com and Test1234