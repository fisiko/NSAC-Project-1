import { Link, useNavigate } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react";



export default function NewForm2() {

    const forenameInputRef = useRef();
    const surnameInputRef = useRef();
    const addressInputRef = useRef();
    const postcodeInputRef = useRef();
    const phoneInputRef = useRef();

    const fnameErr = useRef();
    const snameErr = useRef();
    const phoneErr = useRef();
    const addressErr = useRef();
    const postcodeErr = useRef();

    const navigate = useNavigate()

    const [buyerList, setbuyerList] = useState([])

    useEffect(() => {
        fetch(`http://18.134.155.255:8080/buyer/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read buyers");
                    throw response.status;
                } else return response.json();
            })
            .then(buyers => { setbuyerList(buyers) })
            .catch(error => {
                console.error(error);
            });
    }, []);


    function addR() {

        const tempR = {
            "firstName": forenameInputRef.current.value,
            "lastName": surnameInputRef.current.value,
            "address": addressInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            "phone": phoneInputRef.current.value
        }

        const compareObjects = (obj1, obj2) => {
            const firstNameMatch = obj1.firstName.toLowerCase() === obj2.firstName.toLowerCase();
            const surNameMatch = obj1.lastName.toLowerCase() === obj2.lastName.toLowerCase();
            return firstNameMatch && surNameMatch;
        };

        if (!buyerList.some(item => compareObjects(item, tempR))) {
            if (forenameInputRef.current.value !== "" && surnameInputRef.current.value !== "" && phoneInputRef.current.value !== "" && addressInputRef.current.value !== "" && postcodeInputRef.current.value != "") {

                fetch("http://18.134.155.255:8080/buyer/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)

                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read buyers");
                            throw response.status;
                        } else navigate("/buyer");
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }

            else {
                if (forenameInputRef.current.value === "") {
                    fnameErr.current.style.display = "block";
                } else {
                    fnameErr.current.style.display = "none";

                }

                if (surnameInputRef.current.value === "") {
                    snameErr.current.style.display = "block";
                } else {
                    snameErr.current.style.display = "none";

                }
                if (phoneInputRef.current.value === "") {
                    phoneErr.current.style.display = "block";
                } else {
                    phoneErr.current.style.display = "none";

                }
                if (addressInputRef.current.value === "") {
                    addressErr.current.style.display = "block";
                } else {
                    addressErr.current.style.display = "none";

                }
                if (postcodeInputRef.current.value === "") {
                    postcodeErr.current.style.display = "block";
                } else {
                    postcodeErr.current.style.display = "none";

                }
            }


        } else {

            alert("Sorry, this user is already registered")
        }


    }


    return (
        <main>
            <h1>Register as a buyer</h1>
            <br/>

            <form id="sellerForm">
                <div className="form-row">
                    <div className="mx-auto col-10 col-md-8 col-lg-6">
                        <div className="form-label form-group col form-control">
                            <label htmlFor="InputName">Forename</label>
                            <input type="Name" ref={forenameInputRef} className="form-control"
                                   id="InpForename validationCustom01" aria-describedby="InputName"
                                   placeholder="Enter your forename" required></input>
                            <div style={{display: "none", color: "red"}} ref={fnameErr}>
                                Please enter your first name
                            </div>
                        </div>

                        <div className="form-label form-group col form-control">
                            <label htmlFor="InputName">Surname</label>
                            <input type="Name" ref={surnameInputRef} className="form-control" id="InpSurname"
                                   aria-describedby="InputName" placeholder="Enter your surname" reqiured></input>
                            <div style={{display: "none", color: "red"}} ref={snameErr}>
                                Please enter your first name

                            </div>
                        </div>
                        <div className="form-label form-group form-control">
                            <label htmlFor="InputPhone">Phone Number</label>
                            <input type="phone" ref={phoneInputRef} className="form-control" id="InputPhone"
                                   placeholder="Phone Number" required></input>
                            <div style={{display: "none", color: "red"}} ref={phoneErr}>
                                Please enter your phone number
                            </div>
                        </div>

                        <div className="form-label form-group form-control">
                            <label htmlFor="InputAddress">Address</label>
                            <input type="text" ref={addressInputRef} className="form-control" id="InputAddress"
                                   placeholder="Address" required></input>
                            <div style={{display: "none", color: "red"}} ref={addressErr}>
                                Please enter your address
                            </div>
                        </div>

                        <div className="form-label form-group form-control">
                            <label htmlFor="inputPcode">Post Code</label>
                            <input type="text" ref={postcodeInputRef} className="form-control"
                                   id="inputPcode validationCustom03" required></input>
                            <div style={{display: "none", color: "red"}} ref={postcodeErr}>
                                Please enter your postcode
                            </div>
                        </div>
                        <Link className="btn btn-success" onClick={() => addR()}> Save </Link>

                        <Link to="/buyer" className="btn btn-primary"> Cancel </Link>


                    </div>




                </div>
            </form>
        </main>
    )
}
