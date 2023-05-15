import { useState, useRef, useEffect, Component } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom/client';
import React from 'react';

export default function BuyerBookings() {

    const { buyerID, buyerFirstName, buyerSurname } = useParams()

    // const urlAddbooking=`/propForm/${buyer.id}/${buyer.firstName}/${buyer.surname}`
    const urlAddbooking = `/buyerBookings/${buyerID}/${buyerFirstName}/${buyerSurname}`


    const [bookingList, setbookingList] = useState([])
    const [propertyList, setpropertyList] = useState([])

    const navigate = useNavigate()
    const amendButton = useRef();




    // const [jsonData, setJsonData] = useState([]); // JSON data stored in state

    useEffect(() => {

        fetch(`http://localhost:8080/booking/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            // .then(buyers => { setbookingList(buyers) })
            .then(pList => { setbookingList(pList.filter(booking => booking.buyers.buyer_id == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });


        fetch(`http://localhost:8080/property/read  `)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(pList => { setpropertyList(pList.filter(property => property.buyers != null && property.buyers.buyer_id == buyerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);

    console.log(bookingList)


    // console.log(propertyList)
    // console.log(buyerID)
    // console.log(propertyList.filter(property => property.sellers.seller_id == 1))
    // console.log(propertyList.filter(property => property.buyers.buyer_id == 1))
    // const selID=1;
    //bookingList.filter(booking => booking.buyerId === buyerID)

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

        let tempR = bookingList.filter(recs => recs.booking_id != recno)
        let choice = window.confirm("Are you sure you want to cancel")
        if (choice) {
            setbookingList(tempR)

            fetch(`http://localhost:8080/booking/delete/${recno}`, {
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



    




    const [isAmend, setAmend] = useState(true);

    function canc() {


        setAmend(true)
    }

    const handleStatusChange = (event, ref) => {
        // Update the value in the ref
        ref.current.value = event.target.value;
    }; // handles the change event of the status <select> element


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


                <h1>Properties of <b>{buyerFirstName} {buyerSurname}</b> </h1>



                <table class="table1">
                    <tr>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bedroom</th>
                        <th scope="col">Bathroom</th>
                        <th scope="col">Garden</th>


                        <th></th>

                    </tr>

                    {

                        propertyList.map(rec => <tr>
                                <td> {rec.address}  </td>
                                <td> {rec.postcode}  </td>
                                <td> {rec.type}  </td>
                                <td> {rec.price}  </td>
                                <td> {rec.bedrooms}  </td>
                                <td> {rec.bathrooms}  </td>
                                <td> {rec.garden}  </td>
                        </tr>)




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


