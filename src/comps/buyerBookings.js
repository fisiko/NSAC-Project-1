import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import React from 'react';

export default function BuyerBookings() {

    const { buyerID, buyerFirstName, buyerSurname } = useParams()
    const [bookingList, setBookingList] = useState([])
    const [propertyList, setPropertyList] = useState([])


    useEffect(() => {

        fetch(`http://18.134.155.255:8080/booking/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            // .then(buyers => { setBookingList(buyers) })
            .then(pList => { setBookingList(pList.filter(booking => booking.buyers.buyer_id == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });


        fetch(`http://18.134.155.255:8080/property/read  `)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(pList => { setPropertyList(pList.filter(property => property.buyers != null && property.buyers.buyer_id == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, [buyerID]);

    console.log(bookingList);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const formattedDate = dateTime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        const formattedTime = dateTime.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric"
        });
        return `${formattedDate} at ${formattedTime}`;
      };


    function removeR(recno) {
        console.log(recno)

        let tempR = bookingList.filter(recs => recs.booking_id !== recno)
        let choice = window.confirm("Are you sure you want to cancel")
        if (choice) {
            setBookingList(tempR)

            fetch(`http://18.134.155.255:8080/booking/delete/${recno}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => response.json())
                .then(deletedData => {
                    console.log('JSON entry deleted successfully!', deletedData);
                    // Perform additional actions as needed after successful deletion
                })
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });
        }
        else { }
    };



    // ReactDOM.render(<p>Hallo</p>, document.getElementById('table1'))
    return (

        <>

            <main>

                <h1>Bookings of <b>{buyerFirstName} {buyerSurname}</b> </h1>


                <table class="table1">
                    <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Property ID</th>
                        <th scope="col">Date</th>

                        <th scope="col">Changes</th>
                        {/* <th scope="col"></th> */}
                 

                    </tr>
                    {

                        bookingList.map(rec => <tr>

                            <td><span>{rec.booking_id}</span></td>
                            <td><span>{rec.properties.property_id}</span></td>
                            <td><span>  {formatDateTime(rec.timeslot)}</span></td>

                            <td>    <button className="my-button"onClick={() => removeR(rec.booking_id)} >
                                Cancel</button></td>
                        </tr>
                        )
                    }
                </table>
                {/* </div> */}
                <br />
                


                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />







        </main>


        </>);
}


