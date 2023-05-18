import { useState, useRef, useEffect, Component } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import React from 'react';


export default function Booking() {

    const { propertyID, propertyAddress, propertyPostcode } = useParams()
    const [buyerList, setBuyerList] = useState([])


    const nameRef = useRef()
    const dateRef  = useRef()
    const timeRef  = useRef()

    const nameErr = useRef()
    const dateErr  = useRef()
    const timeErr  = useRef()



    // const [jsonData, setJsonData] = useState([]); // JSON data stored in state



    useEffect(() => {


    fetch(`http://localhost:8080/buyer/read`)
        .then((response) => {
            if (!response.ok) {
                alert("An error has occured, unable to read properties");
                throw response.status;
            } else return response.json();
        })
        .then(bList => { setBuyerList(bList) }) //linking IDs
        .catch(error => {
            console.error(error);
        });

}, []);

    console.log(buyerList)





        const handleStatusChange = (event, ref) => {
            // Update the value in the ref
            ref.current.value = event.target.value;
        }; // handles the change event of the status <select> element



        function addR() {

            console.log(nameRef.current.value, dateRef.current.value, timeRef.current.value)

            const originalDate = new Date(dateRef.current.value + " " + timeRef.current.value);
            const formattedDate = originalDate.toISOString().slice(0, 10) + "T" + originalDate.toTimeString().slice(0, 8);

            console.log(formattedDate);

            const person = buyerList.filter(data => data.firstName == nameRef.current.value)
            const object = Object.assign({}, ...person);


            const tempR = {
                "properties": {"property_id": propertyID},
                "buyers": {"buyer_id": object.buyer_id},
                "timeslot": formattedDate

            }

            if(nameRef.current.value != "" && timeRef.current.value != "" && dateRef.current.value != ""){

                fetch("http://localhost:8080/booking/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)
                })

                    .catch(error => {
                        console.error(error);
                    });
            }
            else {
                Event.preventDefault();
                if (nameRef.current.value == "" ){
                    nameErr.current.style.display = "block";
                }
                else{
                    nameErr.current.style.display = "none";

                }

                if (dateRef.current.value == "" ){
                    dateErr.current.style.display = "block";
                }
                else{
                    dateErr.current.style.display = "none";

                }
                if (timeRef.current.value == "" ){
                    timeErr.current.style.display = "block";
                }
                else{
                    timeErr.current.style.display = "none";

                }
            }

        }




    return (

        <>


            <main>
                <h1> Choose your viewing time </h1>

                <h5 className="topSeller"><b>{propertyAddress} {propertyPostcode}</b> </h5>

                <form id="sellerForm">
                    <div className="form-row">
                        <div className="mx-auto col-10 col-md-8 col-lg-6">
                            <div className="form-label form-group col form-control">
                                <label htmlFor="InputName">Who are you?</label>

                                <select className="form-select" onChange={(event) => handleStatusChange(event, nameRef)} ref={nameRef}>
                                    {buyerList.map(rec =>
                                        <option> {rec.firstName} </option>
                                    )
                                    }
                                </select >

                                <Link to="/formBuyer "className="btn btn-block"> Register Now </Link>
                                <div style={{display: "none", color: "red"}} ref={nameErr}>
                                    Please choose your name, or register if you do not have an account
                                </div>
                            </div>

                            <div className="form-label form-group col form-control">
                                <label htmlFor="appt">Select a time:</label>
                                <select  className="form-select" ref={timeRef} onChange={(event) => handleStatusChange(event, timeRef)}>
                                    <option>08:00</option>
                                    <option>09:00</option>
                                    <option>10:00</option>
                                    <option>11:00</option>
                                    <option>12:00</option>
                                    <option>13:00</option>
                                    <option>14:00</option>
                                    <option>15:00</option>
                                    <option>16:00</option>
                                    <option>17:00</option>

                                </select>
                                <div style={{display: "none", color: "red"}} ref={timeErr}>
                                    Please enter a time

                                </div>
                            </div>
                            <div className="form-label form-group form-control">
                                <label htmlFor="appt">Select a date:</label>

                                <input  className="form-select" type="date" id="birthday" name="birthday"
                                       onChange={(event) => handleStatusChange(event, dateRef)} ref={dateRef}></input>
                                <div style={{display: "none", color: "red"}} ref={dateErr}>
                                    Please enter your a date

                                </div>
                            </div>


                            <br/>

                            <Link to="/property " className="btn btn-primary" onClick={() => addR()}> Submit </Link>


                        </div>


                    </div>
                </form>




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


