import React from "react";

class Inventory extends React.Component {
    constructor () {
        super ();
        this.state = {

        }
    }

    componentDidMount () {
        const token  = localStorage.getItem("token")
        const headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
        console.log(headers)
    }
    render () {
        return (
            <div>

            </div>
        )
    }
}

export default Inventory