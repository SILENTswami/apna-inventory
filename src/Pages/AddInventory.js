import React from "react";
import { Input, Label, Alert, Button, InputGroup, InputGroupText } from "reactstrap";

class AddInventory extends React.Component {
    constructor() {
        super()
        this.state = {
            roomType: "",
            date: "",
            roomsAvailable: 0,
            cost: 0,
            isVisible: "true",
            message: "",
            messageColor: "",
            isLoading: false
        }
    }
    render() {

        const onChange = (e) => {
            const { name, value } = e.target
            this.setState({ [name]: value })
        }

        const onSubmit = () => {
            this.setState({ isLoading: true })
            const token = localStorage.getItem("token")
            const { roomType, roomsAvailable, date, cost, isVisible } = this.state
            const data = { token, roomType, roomsAvailable, date, cost, isVisible }
        }

        const isDisabled = !(this.state.cost && this.state.date && this.state.roomType && this.state.roomsAvailable) || this.state.isLoading

        return (
            <div className="mx-3">
                <div className="col-md-3 col-12 m-auto mt-5">
                    <div>
                        <div className="text-dark-o h1 mb-5">Add Inventory</div>
                        <Input placeholder="Room Type" onChange={onChange} value={this.state.roomType} name="roomType" className="mb-4" />
                        <Label className="mb-0">Date</Label>
                        <Input placeholder="Date" onChange={onChange} value={this.state.roomType} name="roomType" type="date" className="mb-4" />
                        <Label className="mb-0">Total Available Rooms</Label>
                        <Input placeholder="Total available rooms" onChange={onChange} value={this.state.roomsAvailable} name="roomAvailable" className="mb-4" />
                        <Label className="mb-0">Cost</Label>
                        <InputGroup className="border rounded mb-4">
                            <InputGroupText className="border-0">
                                <i class="bi bi-currency-rupee"></i>
                            </InputGroupText>
                            <Input className="border-0" placeholder="Cost" onChange={onChange} value={this.state.cost} name="cost" />
                        </InputGroup>
                        <Label className="mb-0">Should the room be visible to customers?</Label>
                        <Input onChange={onChange} name="isVisible" value={this.state.isVisible} type="select" className="mb-5">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </Input>
                        <Button disabled={isDisabled} onClick={onSubmit} className="px-3 bg-primary-o">
                            {this.state.isLoading ? "Loading.." : "Create Inventory"}
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

export default AddInventory