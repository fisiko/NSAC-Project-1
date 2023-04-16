import { useState, useRef, useEffect, Component } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom/client';
import React from 'react';


export default function Booking() {

    const { propertyID, propertyAddress, propertyPostcode } = useParams()

    const urlAddProperty = `/propForm/${propertyID}/${propertyAddress}/${propertyPostcode}`

    const [propertyList, setpropertyList] = useState([])
    const [buyerList, setbuyerList] = useState([])
    const navigate = useNavigate()
    const amendButton = useRef();

    const nameRef = useRef()
    const dateRef  = useRef()
    const timeRef  = useRef()



    // const [jsonData, setJsonData] = useState([]); // JSON data stored in state



    useEffect(() => {

        fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read propertys");
                    throw response.status;
                } else return response.json();
            })
            // .then(propertys => { setpropertyList(propertys) })
            .then(pList => { setpropertyList(pList.filter(property => property.id == propertyID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);

    fetch(`http://localhost:3000/buyer`)
        .then((response) => {
            if (!response.ok) {
                alert("An error has occured, unable to read propertys");
                throw response.status;
            } else return response.json();
        })
        // .then(propertys => { setpropertyList(propertys) })
        .then(bList => { setbuyerList(bList) }) //linking IDs
        .catch(error => {
            console.error(error);
        });




        const handleStatusChange = (event, ref) => {
            // Update the value in the ref
            ref.current.value = event.target.value;
        }; // handles the change event of the status <select> element
    
    


        function addR() {

            // console.log(nameRef.current.value+ dateRef.current.value.current.value+ timeRef.current.value)
            console.log(nameRef.current.value, dateRef.current.value, timeRef.current.value)
            // const tempR = {

    
            // }
    
            // const compareObjects = (obj1, obj2) => {
            //     return obj1.address.toLowerCase() === obj2.address.toLowerCase();
            // };
    
            // if (!propertyList.some(item => compareObjects(item, tempR))) {
    
            //     if (postcodeInputRef.current.value != "") {
    
    
    
    
            //         fetch("http://localhost:3000/property", {
            //             method: "POST",
            //             headers: { "Content-Type": "application/json" },
            //             body: JSON.stringify(tempR)
    
    
            //         })
            //             .then((response) => {
            //                 if (!response.ok) {
            //                     alert("An error has occured, unable to read propertys");
            //                     throw response.status;
            //                 } else navigate(urlSellerProperty);
            //             })
            //             .catch(error => {
            //                 console.error(error);
            //             });
    
    
            //     }
            //     else {
    
            //         alert("Please enter all details")
            //     }
            // } else {
    
            //     alert("Sorry, this user is already registered")
            // }
    
    
    
        }




    return (

        <>


            <main>
                {/* <img src="src\comps\house.jpg" alt="Example Image" /> */}
                <h1> Choose your viewing time </h1>

                <h5><b>{propertyAddress} {propertyPostcode}</b> </h5>


                <form>
                    <div className="form-group col">

                        <label>Who are you?</label>




                        <select className="form-select" onChange={(event) => handleStatusChange(event, nameRef)} ref={nameRef}>
                            {buyerList.map(rec =>
                                <option> {rec.firstName} </option>

                            )
                            }
                        </select >

                        <button>Register now</button>
                    </div>

                    <div className="form-group col  topSeller">
                        <label for="appt">Select a date:</label>

                        <input type="date" id="birthday" name="birthday" onChange={(event) => handleStatusChange(event, dateRef)} ref={dateRef}></input>
                        <label for="appt">Select a time:</label>
                        <select ref={timeRef}  onChange={(event) => handleStatusChange(event, timeRef)}>
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
                    </div>

                </form>
                    <div className="topSeller" >
                        <Link className="btn btn-primary" onClick={() => addR()}> Submit </Link>
                        <Link to="/property "className="btn btn-block"> Cancel </Link>
                    </div>
                <br></br>
                <br></br>



                <table class="table1">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bedroom</th>
                        <th scope="col">Bathroom</th>
                        <th scope="col">Garden</th>

                    </tr>
                    {

                        propertyList.map(rec => <tr>

                            <td><span>{rec.id}</span></td>
                            <td><span>{rec.address}</span></td>
                            <td><span>{rec.postcode}</span></td>

                            <td><span>{rec.type}</span></td>
                            <td><span>{rec.price}</span></td>
                            <td><span>{rec.bedroom}</span></td>
                            <td><span>{rec.bathroom}</span></td>
                            <td><span>{rec.garden}</span></td>
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


