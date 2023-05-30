import { Link, useNavigate, useParams } from "react-router-dom"
import React, { useRef, useState, useEffect } from "react";


//test

export default function PropForm() {

    const typeInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const bedInputRef = useRef(null);
    const bathInputRef = useRef(null);
    const gardenInputRef = useRef(null);
    const addressInputRef = useRef(null);
    const postcodeInputRef = useRef(null);

    const typeErr = useRef(null);
    const priceErr = useRef(null);
    const bedErr = useRef(null);
    const bathErr = useRef(null);
    const gardenErr = useRef(null);
    const addressErr = useRef(null);
    const postcodeErr = useRef(null);

    const { sellerID, sellerFirstName, sellerSurname } = useParams()

    const urlSellerProperty = `/sellerProp/${sellerID}/${sellerFirstName}/${sellerSurname}`

    const navigate = useNavigate()

    const [propertyList, setpropertyList] = useState([])

    useEffect(() => {
        fetch(`http://18.134.155.255:8080/property/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read properties");
                    throw response.status;
                } else return response.json();
            })
            .then(properties => { setpropertyList(properties) })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function addR() {
        const tempR = {
            "type": typeInputRef.current.value,
            "price": priceInputRef.current.value,
            "bedrooms": bedInputRef.current.value,
            "bathrooms": bathInputRef.current.value,
            "garden": gardenInputRef.current.value,
            "address": addressInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            // "sellerId": sellerID,
            "status": "FOR SALE",
            "sellers": {
            "seller_id": sellerID
            }


        }

        const compareObjects = (obj1, obj2) => {
            return obj1.address.toLowerCase() === obj2.address.toLowerCase();
        };

        if (!propertyList.some(item => compareObjects(item, tempR))) {

            if (typeInputRef.current.value != "" && priceInputRef.current.value != "" && bedInputRef.current.value != "" && bathInputRef.current.value != "" && gardenInputRef.current.value != "" && addressInputRef.current.value != "" && postcodeInputRef.current.value != "") {


                fetch("http://18.134.155.255:8080/property/add", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)


                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read properties");
                            throw response.status;
                        } else navigate(urlSellerProperty);
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }
            else {
                if (typeInputRef.current.value == "" ){
                    typeErr.current.style.display = "block";
                }
                else{
                    typeErr.current.style.display = "none";

                }

                if (priceInputRef.current.value == "" ){
                    priceErr.current.style.display = "block";
                }
                else{
                    priceErr.current.style.display = "none";

                }
                if (bedInputRef.current.value == "" ){
                    bedErr.current.style.display = "block";
                }
                else{
                    bedErr.current.style.display = "none";

                }
                if (bathInputRef.current.value == "" ){
                    bathErr.current.style.display = "block";
                }
                else{
                    bathErr.current.style.display = "none";

                }
                if (gardenInputRef.current.value == "" ){
                    gardenErr.current.style.display = "block";
                }
                else{
                    gardenErr.current.style.display = "none";

                }
                if (addressInputRef.current.value == "" ){
                    addressErr.current.style.display = "block";
                }
                else{
                    addressErr.current.style.display = "none";

                }
                if (postcodeInputRef.current.value == "" ){
                    postcodeErr.current.style.display = "block";
                }
                else{
                    postcodeErr.current.style.display = "none";

                }


            }

        } else {

            alert("Sorry, this property is already registered")
        }



    }



    function onK(event) {
        if (event.keyCode === 13) {

            addR()


        }


    }

    return (
        <>
            <form id="sellerForm">
                <div className="form-row">
                    <div className="mx-auto col-10 col-md-8 col-lg-6">
                        <div className="form-label form-group col form-control">

                            <label htmlFor="propertyType">Type</label>
                            <select className="form-select" ref={typeInputRef}>
                                <option value="DETACHED"> Detached </option>
                                <option value="SEMI"> SEMI </option>
                                <option value="APARTMENT"> Apartment </option>
                            </select >
                            <div style={{display:"none", color:"red"}} ref={typeErr}>
                                Please enter your first name
                            </div>

                        </div>

                        <div className="form-label form-group col form-control">

                            <label htmlFor="propertyPrice">Price</label><br />
                            <input  type="text"  className="form-control"  ref={priceInputRef} />
                            <div style={{display:"none", color:"red"}} ref={priceErr}>
                                Please enter your price
                            </div>

                        </div>
                        <div className="form-label form-group form-control">
                            <label htmlFor="InputPhone">Bed Rooms:</label>

                            <select className="form-select" ref={bedInputRef}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>

                            </select>
                            <div style={{display:"none", color:"red"}} ref={bedErr}>
                                Please enter your first name
                            </div>
                        </div>

                        <div className="form-label form-group form-control">
                            <label htmlFor="InputAddress">Bath Rooms:</label>

                            <select className="form-select" ref={bathInputRef}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>

                            </select>
                            <div style={{display:"none", color:"red"}} ref={bathErr}>
                                Please enter your first name
                            </div>
                        </div>
                        <div className="form-label form-group form-control">
                            <label htmlFor="InputPhone">Garden:</label>
                            <select className="form-select" ref={gardenInputRef}>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select>
                            <div style={{display:"none", color:"red"}} ref={gardenErr}>
                                Please enter your first name
                            </div>
                        </div>

                        <div className="form-label form-group col form-control">

                            <label htmlFor="propertyPrice">Address:</label><br />
                             <input  type="text"  className="form-control" ref={addressInputRef}  />
                            <div style={{display:"none", color:"red"}} ref={addressErr}>
                                Please enter your first name
                            </div>

                        </div>

                        <div className="form-label form-group form-control">
                            <label htmlFor="inputPcode">Post Code</label>
                            <input type="text" className="form-control" ref={postcodeInputRef} ></input>
                            <div style={{display: "none", color: "red"}} ref={postcodeErr}>
                                Please enter your postcode
                            </div>
                        </div>

                        <br/>

                        <Link className="btn btn-success" onClick={() => addR()}> Submit </Link>

                        <Link to="/seller" className="btn btn-outline-danger"> Cancel </Link>


                    </div>


                </div>
            </form>


            {/*<form  id="sellerForm">*/}

            {/*    <div className="form-group col">*/}

            {/*        <label htmlFor="propertyType">Type</label>*/}
            {/*        <select className="form-select" ref={typeInputRef}>*/}
            {/*            <option value="DETACHED"> Detached </option>*/}
            {/*            <option value="SEMI"> SEMI </option>*/}
            {/*            <option value="APARTMENT"> Apartment </option>*/}


            {/*        </select >*/}
            {/*        <div style={{display:"none", color:"red"}} ref={typeErr}>*/}
            {/*            Please enter your first name*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div className="form-group col">*/}
            {/*        <label htmlFor="propertyPrice">Price</label>*/}
            {/*        Price:<input ref={priceInputRef} /><br />*/}
            {/*        <div style={{display:"none", color:"red"}} ref={priceErr}>*/}
            {/*            Please enter your price*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    Bed Rooms:*/}
            {/*    <select className="form-select" ref={bedInputRef}>*/}
            {/*        <option>1</option>*/}
            {/*        <option>2</option>*/}
            {/*        <option>3</option>*/}
            {/*        <option>4</option>*/}
            {/*        <option>5</option>*/}

            {/*    </select>*/}
            {/*    <div style={{display:"none", color:"red"}} ref={bedErr}>*/}
            {/*        Please enter your first name*/}
            {/*    </div>*/}
            {/*    Bath Rooms:*/}
            {/*    <select className="form-select" ref={bathInputRef}>*/}
            {/*        <option>1</option>*/}
            {/*        <option>2</option>*/}
            {/*        <option>3</option>*/}
            {/*        <option>4</option>*/}
            {/*        <option>5</option>*/}

            {/*    </select>*/}
            {/*    <div style={{display:"none", color:"red"}} ref={bathErr}>*/}
            {/*        Please enter your first name*/}
            {/*    </div>*/}
            {/*    Garden:*/}
            {/*    <select className="form-select" ref={gardenInputRef}>*/}
            {/*        <option value="1">Yes</option>*/}
            {/*        <option value="0">No</option>*/}
            {/*    </select>*/}
            {/*    <div style={{display:"none", color:"red"}} ref={gardenErr}>*/}
            {/*        Please enter your first name*/}
            {/*    </div>*/}

            {/*    Address: <input ref={addressInputRef} /><br />*/}
            {/*    <div style={{display:"none", color:"red"}} ref={addressErr}>*/}
            {/*        Please enter your first name*/}
            {/*    </div>*/}
            {/*     <label htmlFor="InputName">Post Code:</label>*/}
            {/*    <input ref={postcodeInputRef} /><br />*/}
            {/*    <div style={{display:"none", color:"red"}} ref={postcodeErr}>*/}
            {/*        Please enter your first name*/}
            {/*    </div>*/}
            {/*</form>

            <Link className="btn btn-primary" onClick={() => addR()}> Submit </Link>
            <Link to={urlSellerProperty} className="btn btn-block"> Cancel </Link>*/}

        </>)

}



