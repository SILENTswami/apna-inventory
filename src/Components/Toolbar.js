import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import withRouter from "./withRouter";

class Toolbar extends React.Component {
    componentDidMount () {
        console.log (this.props)
    }
    render() {
        return (
            <div>
                <div>
                    <img src={require("../Assets/Logo.png")} alt="zostel" style={{ maxWidth: "50px" }} className="m-3" />
                </div>
                <div className="mx-3">
                    <div className="col-lg-3 col-12">
                        <Nav fill pills>
                            <NavItem>
                                <NavLink active={this.props.router.location.pathname === "/inventory"} href="/inventory">
                                    Inventory
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink active={this.props.router.location.pathname === "/reservation"} href="/reservation">
                                    Reservation
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Toolbar)