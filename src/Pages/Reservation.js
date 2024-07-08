import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { InputGroup, InputGroupText, Input } from "reactstrap";

const column = [
    { field: 'roomType', headerName: 'Room Type' },
    { field: 'customer', headerName: 'Customer' },
    { field: 'checkIn', headerName: 'CheckIn Date' },
    { field: 'checkOut', headerName: 'CheckOut Date', width: 150 },
    { field: 'bookingDate', headerName: 'Booking Date', width: 150 },
    { field: 'noOfRooms', headerName: 'No. of Rooms' },
    { field: 'cost', headerName: 'Cost' },
    { field: 'status', headerName: 'Status' },
    { field: 'id', headerName: 'Action' },
]

class Reservation extends React.Component {
    constructor() {
        super()
        this.state = {
            pageSize: 10,
            currentPage: 0,
            searchInput: "",
            allTableData: []
        }
    }

    componentDidMount() {

    }

    render() {

        const onChange = (e) => {
            const { name, value } = e.target
            if (name === "pageSize") {
                this.setState({ currentPage: 0 })
            }
            this.setState({ [name]: value })
        }

        return (
            <Box sx={{ height: 400, margin: "4rem" }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <InputGroup className="border rounded w-25">
                        <InputGroupText className="bg-transparent border-0">
                            <i class="bi bi-search"></i>
                        </InputGroupText>
                        <Input className="border-0" placeholder="Search..." onChange={onChange} value={this.state.searchInput} name="searchInput" />
                    </InputGroup>
                    <FormControl variant="outlined">
                        <InputLabel>Rows per page</InputLabel>
                        <Select
                            value={this.state.pageSize}
                            onChange={onChange}
                            name="pageSize"
                            label="Rows per page"
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <DataGrid
                    rows={this.state.allTableData}
                    columns={column}
                    pageSize={this.state.pageSize}
                    rowsPerPageOptions={[1, 2, 4]}
                    pagination
                    onPageChange={(params) => this.setState({ currentPage: params.page })}
                    onPageSizeChange={(params) => this.setState({ pageSize: params.pageSize })}
                />
            </Box>
        )
    }
}

export default Reservation