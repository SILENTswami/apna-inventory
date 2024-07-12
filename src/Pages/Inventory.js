import React from 'react';
import '../Styles/Inventory.css';

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            daysInMonth: [],
            inventoryData: [
                {
                    name: 'Single Bed in 6 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                },
                {
                    name: 'Single Bed in 12 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                },
                {
                    name: 'Single Bed in 20 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                }
            ],
            entries: 10,
            searchTerm: '',
            currentPage: 1,
            columnsPerPage: 10
        };
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const headers = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        console.log(headers);

        this.initializeDaysAndInventory();
    }

    initializeDaysAndInventory = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysCount = new Date(year, month + 1, 0).getDate();
        const days = Array.from({ length: daysCount }, (_, i) => i + 1);
    
        const updatedInventoryData = this.state.inventoryData.map(room => {
            const newRoom = { ...room };
            ['available', 'bookings', 'totalSlot', 'roomCost'].forEach(field => {
                newRoom[field] = {};
                days.forEach(day => {
                    newRoom[field][day] = 1; // Initialize with 1 as per the image
                });
            });
            return newRoom;
        });
    
        this.setState({
            currentDate,
            daysInMonth: days,
            inventoryData: updatedInventoryData
        });
    }

    renderCalendarHeader = () => {
        const { currentDate, daysInMonth, entries, currentPage, columnsPerPage } = this.state;
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const today = new Date().getDate();
        const startIndex = (currentPage - 1) * columnsPerPage;
        const endIndex = Math.min(startIndex + columnsPerPage, entries);
        const daysToDisplay = daysInMonth.slice(startIndex, endIndex);
      
        return (
          <div className="calendar-header">
            <div className="month-name">{month}</div>
            {daysToDisplay.map(day => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
              const isToday = day === today;
              return (
                <div key={day} className={`calendar-day ${isToday ? 'today' : ''}`}>
                  <div className="weekday">{weekdays[date.getDay()]}</div>
                  <div className="date">{day}</div>
                </div>
              );
            })}
          </div>
        );
    }

    renderInventoryTable = () => {
        const { inventoryData, daysInMonth, entries, currentPage, columnsPerPage } = this.state;
        const startIndex = (currentPage - 1) * columnsPerPage;
        const endIndex = Math.min(startIndex + columnsPerPage, entries);
        const daysToDisplay = daysInMonth.slice(startIndex, endIndex);
        
        return inventoryData.map((room, index) => (
          <div key={index} className="room-inventory">
            <div className="room-name">
              {room.name} <button className="save-button">Save</button>
            </div>
            {['available', 'bookings', 'totalSlot', 'roomCost'].map(field => (
              <div key={field} className="inventory-row">
                <span className="field-name">{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                {daysToDisplay.map(day => (
                  <input
                    key={day}
                    type="number"
                    value={room[field][day]}
                    onChange={(e) => this.handleInventoryChange(index, field, day, e.target.value)}
                    className="inventory-input"
                  />
                ))}
              </div>
            ))}
          </div>
        ));
    }

    handleInventoryChange = (roomIndex, field, day, value) => {
        const updatedInventoryData = [...this.state.inventoryData];
        if (!updatedInventoryData[roomIndex][field]) {
            updatedInventoryData[roomIndex][field] = {};
        }
        updatedInventoryData[roomIndex][field][day] = parseInt(value) || 0;
        this.setState({ inventoryData: updatedInventoryData });
    }

    handleEntriesChange = (e) => {
        const entries = Number(e.target.value);
        this.setState({ 
            entries,
            currentPage: 1 // Reset to first page when changing entries
        });
    }

    handleSearch = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    }

    handlePrevPage = () => {
        this.setState(prevState => ({
            currentPage: Math.max(prevState.currentPage - 1, 1)
        }));
    }

    handleNextPage = () => {
        const maxPage = Math.ceil(this.state.entries / this.state.columnsPerPage);
        this.setState(prevState => ({
            currentPage: Math.min(prevState.currentPage + 1, maxPage)
        }));
    }

    renderPagination = () => {
        const { entries, columnsPerPage, currentPage } = this.state;
        const pageCount = Math.ceil(entries / columnsPerPage);
        const pageNumbers = [];

        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => this.handlePageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        return (
            <div className="pagination">
                <button 
                    style={{ border: 'none', background: 'none' }}
                    onClick={this.handlePrevPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pageNumbers}
                <button 
                    style={{ border: 'none', background: 'none' }}
                    onClick={this.handleNextPage}
                    disabled={currentPage === pageCount}
                >
                    Next
                </button>
            </div>
        );
    }

    render() {
        const { entries, searchTerm } = this.state;

        return (
            <div className="inventory-container">
                <h2 style={{ margin: '10px' }}>Inventory</h2>
                <div className="inventory-controls">
                    <div>
                        Show 
                        <select style={{margin:'0 10px'}} value={entries} onChange={this.handleEntriesChange}>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                        </select>
                        entries
                    </div>
                    <input
                        style={{margin:'0 10px'}} 
                        type="text" 
                        placeholder="Search..." 
                        value={searchTerm}
                        onChange={this.handleSearch}
                    />
                    <div className='top-buttons'>
                        <button>Add Rooms</button>
                        <button>+ Bulk Upload</button>
                    </div>    
                </div>
                <div className="inventory-table">
                    {this.renderCalendarHeader()}
                    {this.renderInventoryTable()}
                </div>
                {this.renderPagination()}
            </div>
        );
    }
}

export default Inventory;