import React from 'react';
import initialState from './initialState';
import * as _ from 'lodash';

class App extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = { 
            store: initialState,
            selectedShow: null,
            selectedSeats: [],
            showBookingDetails: false,
            bill: {},
            masterBill: {}, 
            showMasterBill: false
        };
    } 

    render() { 
        return (
            <div>
                { !this.state.showMasterBill && !this.state.showBookingDetails  && <div>
                    <label style={{marginRight: '10px'}}>Enter Show:</label> 
                    <select onChange={(e) => this.showChanged(e.target.value)} defaultValue=''>
                        <option disabled hidden style={{display: 'none'}} value=''></option>
                        { this.state.store.shows.map((show, index) => <option key={index} value={index}>{show.showName}</option>) }
                    </select><br/>
                    { this.state.selectedShow !== null && 
                        <div style={{marginTop: '10px'}}>
                            {this.getSeatingArrangement()}
                            <label style={{marginRight: '10px'}}>Enter Seats:</label> 
                            <select multiple onChange={ (e) => this.reserveSeat(e.target.value) }
                                style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '10px'}}>
                            { this.state.store.shows[this.state.selectedShow].seatDetails.map((data, index) => <option key={index} value={index}>{data.seat}</option>) }
                            </select>
                            { this.state.selectedSeats.map((seat, index) => 
                                <label key={index}>{this.state.store.shows[this.state.selectedShow].seatDetails[seat].seat}</label>)
                            }
                        </div>
                    }
                    <button onClick={() => this.makeBooking()}>Book</button>
                </div>}
                { !this.state.showMasterBill && this.state.showBookingDetails && 
                    <div>
                        Successfully booked show {Number(this.state.selectedShow) + 1} and seats 
                        { this.state.selectedSeats.map((booking, index) => 
                            <label key={index}> {this.state.store.shows[this.state.selectedShow].seatDetails[booking].seat}</label>)
                        }
                        <br/>
                        SubTotal: Rs. {this.state.bill.subTotal} <br/>
                        Service Tax @ 14%: Rs. {(this.state.bill.serviceTax).toFixed(2)} <br/>
                        Swachh Bharat Cess @0.5%: Rs. {(this.state.bill.sbc).toFixed(2)} <br/>
                        Krishi Kalyan Cess @0.5%: Rs. {(this.state.bill.kkc).toFixed(2)} <br/>
                        Total: Rs. {Math.round(this.state.bill.subTotal + this.state.bill.serviceTax + this.state.bill.sbc + this.state.bill.kkc)} <br/>

                        <button onClick={() => this.bookAnotherShow()}>Book Another</button>
                        <button onClick={() => this.showMasterBill()}>Print total revenue </button>
                    </div>
                }
                { this.state.showMasterBill &&
                    <div>
                        Revenue: Rs. {Math.round(this.state.masterBill.revenue)} <br/>
                        Service Tax @ 14%: Rs. {(this.state.masterBill.serviceTax).toFixed(2)} <br/>
                        Swachh Bharat Cess @0.5%: Rs. {(this.state.masterBill.sbc).toFixed(2)} <br/>
                        Krishi Kalyan Cess @0.5%: Rs. {(this.state.masterBill.kkc).toFixed(2)} <br/>
                    </div>
                }
            </div>
        );
    }

    getSeatingArrangement() {
        switch(this.state.selectedShow) {
            case '0': 
                return (
                    <div>
                        All Seats: <br/><br/>
                        <label>A1 A2 A3 A4 A5 A6 A7 A8 A9</label><br/>
                        <label>B1 B2 B3 B4 B5 B6</label><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <label>C2 C3 C4 C5 C6 C7</label><br/><br/>
                    </div> 
                )
            case '1': 
            return (
                <div>
                    All Seats: <br/><br/>
                    <label>A1 A2 A3 A4 A5 A6 A7</label><br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <label>B2 B3 B4 B5 B6</label><br/>
                    <label>C1 C2 C3 C4 C5 C6 C7</label><br/><br/>
                </div> 
            )
            case '2': 
            return (
                <div>
                    All Seats: <br/><br/>
                    <label>A1 A2 A3 A4 A5 </label><br/>
                    <label>B1 B2 B3 B4 B5 B6 B7 B8</label><br/>
                    <label>C2 C3 C4 C5 C6 C7 C8 C9</label><br/><br/>
                </div> 
            )
        }
    }

    makeBooking() {
        let modifiedStore = _.cloneDeep(this.state.store);
        let seatsNotAvailable = [];
        this.state.selectedSeats.forEach((seat) => {
            if (!modifiedStore.shows[this.state.selectedShow].seatDetails[seat].booked)
                modifiedStore.shows[this.state.selectedShow].seatDetails[seat].booked = true;
            else
                seatsNotAvailable.push(modifiedStore.shows[this.state.selectedShow].seatDetails[seat].seat)
        })
        if (seatsNotAvailable.length === 0) {
            this.setState({ store: modifiedStore, showBookingDetails: true });
            this.prepareBill();
        } else {
            alert(seatsNotAvailable.join(", ") + " not available. Please choose different seats.");
            this.setState({ selectedSeats: [] })
        }
    }

    reserveSeat(seatNumber) {
        let selectedSeats = this.state.selectedSeats;
        if (this.state.selectedSeats.indexOf(seatNumber) === -1)
            selectedSeats.push(seatNumber);
        this.setState({ selectedSeats: selectedSeats})
    }

    showChanged(show) {
        this.setState({ selectedShow: show, selectedSeats: [], showBookingDetails: false });
        this.getSeatingArrangement();
    }

    bookAnotherShow() {
        this.setState({ selectedShow: null, selectedSeats: [], showBookingDetails: false });
    }

    prepareBill() {
        let subTotal = 0;
        this.state.selectedSeats.forEach((seat) => {
            switch(this.state.store.shows[this.state.selectedShow].seatDetails[seat].row) {
                case 1:  subTotal += 320;
                    break;
                case 2: subTotal += 280;
                    break;
                case 3: subTotal += 240;
                    break;
            }
        }) 
        let bill = {
            subTotal: subTotal,
            serviceTax: subTotal * 14/100,
            sbc: subTotal * 0.5/100,
            kkc: subTotal * 0.5/100
        }
        this.setState({ bill: bill })
        this.updateMasterBill(bill);
    }

    updateMasterBill(bill) {
        let masterBill = this.state.masterBill;
        if (_.isEmpty(masterBill)) {
            masterBill.revenue = bill.subTotal + bill.serviceTax + bill.sbc + bill.kkc;
            masterBill.serviceTax = bill.serviceTax;
            masterBill.sbc = bill.sbc;
            masterBill.kkc = bill.kkc;
        } else {
            masterBill.revenue += bill.subTotal + bill.serviceTax + bill.sbc + bill.kkc;
            masterBill.serviceTax += bill.serviceTax;
            masterBill.sbc += bill.sbc;
            masterBill.kkc += bill.kkc;
        }

        this.setState({ masterBill: masterBill });
    }

    showMasterBill() {
        this.setState({ showMasterBill: true })
    }
}

export default App;