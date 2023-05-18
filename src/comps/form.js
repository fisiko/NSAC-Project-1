import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react";



export default function NewForm() {

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
    const [sellerList, setSellerList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8080/seller/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(sellers => { setSellerList(sellers) })
            .catch(error => {
                alert("An error has occured, unable to read sellers");
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

        const compareObjects = (obj1, obj2) =>{
            const firstNameMatch = obj1.firstName.toLowerCase() === obj2.firstName.toLowerCase();
            const surNameMatch = obj1.lastName.toLowerCase() === obj2.lastName.toLowerCase();
            return firstNameMatch && surNameMatch;
};

        if (!sellerList.some(item => compareObjects(item, tempR))) {


            if (forenameInputRef.current.value !== "" && surnameInputRef.current.value !== "" && phoneInputRef.current.value !== "" && addressInputRef.current.value !== "" && postcodeInputRef.current.value !== "") {




                fetch("http://localhost:8080/seller/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)


                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read sellers");
                            throw response.status;
                        } else navigate("/buyer");
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }
            else {
                if (forenameInputRef.current.value === "" ){
                    fnameErr.current.style.display = "block";
                }
                else{
                    fnameErr.current.style.display = "none";

                }

                if (surnameInputRef.current.value === "" ){
                    snameErr.current.style.display = "block";
                }
                else{
                    snameErr.current.style.display = "none";

                }
                if (phoneInputRef.current.value === "" ){
                    phoneErr.current.style.display = "block";
                }
                else{
                    phoneErr.current.style.display = "none";

                }
                if (addressInputRef.current.value === "" ){
                    addressErr.current.style.display = "block";
                }
                else{
                    addressErr.current.style.display = "none";

                }
                if (postcodeInputRef.current.value === "" ){
                    postcodeErr.current.style.display = "block";
                }
                else{
                    postcodeErr.current.style.display = "none";

                }

                
            }
        } else {

            alert("Sorry, this user is already registered")
        }


    }


    return (
        <main>

<h1>Register as a Seller</h1>
<br/>


            <form id="sellerForm">
                <div class="form-row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <div class="form-label form-group col form-control">
                            <label for="InputName">Forename</label>
                            <input type="Name" ref={forenameInputRef} class="form-control" id="InpForename validationCustom01" aria-describedby="InputName" placeholder="Enter your forename" required></input>
                            <div style={{display:"none", color:"red"}} ref={fnameErr}>
                                Please enter your first name
                        </div>
                            </div>

                        <div class="form-label form-group col form-control">
                            <label for="InputName" >Surname</label>
                            <input type="Name" ref={surnameInputRef} class="form-control" id="InpSurname" aria-describedby="InputName" placeholder="Enter your surname" reqiured></input>
                            <div style={{display:"none", color:"red"}} ref={snameErr}>
                            Please enter your first name

                            </div>
                        </div>
                        <div class="form-label form-group form-control">
                            <label for="InputPhone">Phone Number</label>
                            <input type="phone" ref={phoneInputRef} class="form-control" id="InputPhone" placeholder="Phone Number" required></input>
                            <div style={{display:"none", color:"red"}} ref={phoneErr}>
                                Please enter your phone number
                            </div>
                        </div>

                        <div class="form-label form-group form-control">
                            <label for="InputAddress">Address</label>
                            <input type="text" ref={addressInputRef} class="form-control" id="InputAddress" placeholder="Address" required></input>
                            <div style={{display:"none", color:"red"}} ref={addressErr}>
                                Please enter your address
                            </div>
                        </div>

                        <div class="form-label form-group form-control">
                            <label for="inputPcode">Post Code</label>
                            <input type="text" ref={postcodeInputRef} class="form-control" id="inputPcode validationCustom03" required></input>
                            <div style={{display:"none", color:"red"}} ref={postcodeErr}>
                                Please enter your postcode
                            </div>
                        </div>

                        <br/>

                        <Link className="btn btn-success" onClick={() => addR()}> Submit </Link>

                        <Link to="/seller" className="btn btn-outline-danger"> Cancel </Link>


                    </div>




                </div>
            </form>
        </main>
    )
}
