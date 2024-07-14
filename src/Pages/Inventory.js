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
                },
                {
                    name: 'Single Bed in 25 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                },
                {
                    name: 'Single Bed in 30 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                },
                {
                    name: 'Single Bed in 35 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                },
                {
                    name: 'Single Bed in 40 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                },
                {
                    name: 'Single Bed in 45 bed dormitory Room',
                    available: {},
                    bookings: {},
                    totalSlot: {},
                    roomCost: {}
                }
            ],
            entries: 20,
            searchTerm: '',
            currentPage: 1,
            filteredData: [] // Initialize filteredData array
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
        const { currentDate, daysInMonth } = this.state;
        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const month = currentDate.toLocaleString('default', { month: 'long' });
        const today = new Date().getDate();
        const daysToDisplay = daysInMonth;
      
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

    renderbckdi= (props) => {
        const { inventoryData, daysInMonth, entries, currentPage, searchTerm, filteredData } = this.state;
        const daysToDisplay = daysInMonth;
        const startIndex = (currentPage - 1) * entries;
        const endIndex = startIndex + entries;
        const dataToDisplay = searchTerm ? filteredData.slice(startIndex, endIndex) : inventoryData.slice(startIndex, endIndex);
        
        return (
        // dataToDisplay.map((room, index) => (
          <div  className="room-inventory">
            <div className="bckdi-name">
              <span>{dataToDisplay[0].name} <button className="save-button">Save</button></span>
            </div> 
         </div>
        )
    }

    renderInventoryTable = () => {
        const { inventoryData, daysInMonth, entries, currentPage, searchTerm, filteredData } = this.state;
        const daysToDisplay = daysInMonth;
        const startIndex = (currentPage - 1) * entries;
        const endIndex = startIndex + entries;
        const dataToDisplay = searchTerm ? filteredData.slice(startIndex, endIndex) : inventoryData.slice(startIndex, endIndex);
        
        return dataToDisplay.map((room, index) => (
          <div key={index} className="room-inventory">
            <div className="room-name">
              <span>{room.name}<button className="save-button">Save</button></span>
            </div>

            {/* <div style={{height:"30px"}}></div> */}

            {['available', 'bookings', 'totalSlot', 'roomCost'].map(field => (
              <div key={field} className="inventory-row">
                <div className="field-name">
                    <span >{field.charAt(0).toUpperCase() + field.slice(1)}</span>
                    </div>
                <div className='cell'>
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
        const searchTerm = e.target.value;
        this.setState({ searchTerm }, () => {
            this.filterInventoryData();
        });
    }

    filterInventoryData = () => {
        const { inventoryData, searchTerm } = this.state;
        const filteredData = inventoryData.filter(room =>
            room.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.setState({ filteredData });
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
        const { entries, filteredData, currentPage } = this.state;
        const maxPage = Math.ceil(filteredData.length / entries);
        this.setState(prevState => ({
            currentPage: Math.min(prevState.currentPage + 1, maxPage)
        }));
    }

    renderPagination = () => {
        const { entries, inventoryData, currentPage, filteredData } = this.state;
        const dataLength = filteredData.length > 0 ? filteredData.length : inventoryData.length;
        const pageCount = Math.ceil(dataLength / entries);
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
        <div className='inventory-wrapper'>
            <div className='inventory-content'>
                <div className='top'>
                    <div className="inventory-container">
                        <h2 className="inventory-title">Inventory</h2>
                        <div className="inventory-controls">
                            <div className="entries-selector">
                                <span>Show</span>
                                <select value={entries} onChange={this.handleEntriesChange}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                </select>
                                <span>entries</span>
                            </div>
                            <input
                                className="search-input"
                                type="text" 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={this.handleSearch}
                            />
                            <div className='top-buttons'>
                                <button className="add-rooms-btn">Add Rooms</button>
                                <button className="bulk-upload-btn">+ Bulk Upload</button>
                            </div>    
                        </div>
                    </div>
                    
                    <div className="inventory-table">
                        {this.renderCalendarHeader()}
                        {this.renderInventoryTable()}
                    </div>
                    {this.renderPagination()}
                </div>
            </div>
        </div>
    );
}
}

export default Inventory;
