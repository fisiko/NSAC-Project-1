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

    const { sellerID, sellerFirstName, sellerSurname } = useParams()

    const urlSellerProperty = `/sellerProp/${sellerID}/${sellerFirstName}/${sellerSurname}`

    const navigate = useNavigate()

    const [propertyList, setpropertyList] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read propertys");
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
            "bedroom": bedInputRef.current.value,
            "bathroom": bathInputRef.current.value,
            "garden": gardenInputRef.current.value,
            "address": addressInputRef.current.value,
            "postcode": postcodeInputRef.current.value,
            "sellerId": sellerID,
            "status": "FOR SALE"

        }

        const compareObjects = (obj1, obj2) => {
            return obj1.address.toLowerCase() === obj2.address.toLowerCase();
        };

        if (!propertyList.some(item => compareObjects(item, tempR))) {

            if (postcodeInputRef.current.value != "") {




                fetch("http://localhost:3000/property", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(tempR)


                })
                    .then((response) => {
                        if (!response.ok) {
                            alert("An error has occured, unable to read propertys");
                            throw response.status;
                        } else navigate(urlSellerProperty);
                    })
                    .catch(error => {
                        console.error(error);
                    });


            }
            else {

                alert("Please enter all details")
            }
        } else {

            alert("Sorry, this user is already registered")
        }



    }



    function onK(event) {
        if (event.keyCode === 13) {

            addR()


        }


    }

    return (
        <>

            <form>

                <div className="form-group col">

                    <label htmlFor="propertyType">Type</label>
                    <select className="form-select" ref={typeInputRef}>
                        <option value="DETACHED"> Detached </option>
                        <option value="SEMI"> SEMI </option>
                        <option value="APARTMENT"> Apartment </option>


                    </select >
                </div>
                <div className="form-group col">
                    <label htmlFor="propertyPrice">Price</label>
                    Price:<input ref={priceInputRef} /><br />
                </div>
                Bed Rooms:
                <select className="form-select" ref={bedInputRef}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </select>
                Bath Rooms:
                <select className="form-select" ref={bathInputRef}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>

                </select>
                Garden:
                <select className="form-select" ref={gardenInputRef}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>

                Address: <input ref={addressInputRef} /><br />
                Post Code: <input ref={postcodeInputRef} /><br />
            </form> <Link className="btn btn-primary" onClick={() => addR()}> Submit </Link>
            <Link to={urlSellerProperty} className="btn btn-block"> Cancel </Link>

        </>)

}



