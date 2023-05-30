import { useState, useRef, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import React from 'react';

function SellerProp() {

    const { sellerID, sellerFirstName, sellerSurname } = useParams()
    const urlAddProperty = `/propForm/${sellerID}/${sellerFirstName}/${sellerSurname}`
    const [propertyList, setPropertyList] = useState([])

    const amendButton = useRef();
    const addressRef = useRef()
    const postcodeRef = useRef()
    const typeRef = useRef()
    const priceRef = useRef()
    const bedroomRef = useRef()
    const bathroomRef = useRef()
    const gardenRef = useRef()
    const statusRef = useRef()

    useEffect(() => {

        fetch(`http://18.169.34.1:8080/property/read  `)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(pList => { setPropertyList(pList.filter(property => property.sellers.seller_id == sellerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, [sellerID]);

    function removeR(recno) {

        let tempR = propertyList.filter(recs => recs.property_id !== recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setPropertyList(tempR)


            fetch(`http://18.169.34.1:8080/property/delete/${recno}`, {
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

    function resubmit(recno) {

        const statusChange = { status: "FOR SALE" };

        fetch(`http://18.169.34.1:8080/property/update/${recno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChange)
        })
            .then(response => response.json())
            .then(data => updatePList()
        )
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });


    }

    function withdraw(recno) {

        const statusChange = { "status": "WITHDRAWN" };

        fetch(`http://18.169.34.1:8080/property/update/${recno}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChange)
        })
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(data=> updatePList())
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });


    }

    function updatePList() {
        fetch(`http://18.169.34.1:8080/property/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setPropertyList(sellers) })
            .then(pList => { setPropertyList(pList.filter(property => property.sellers.seller_id == sellerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }
    const [isAmend, setAmend] = useState(true);

    function canc() {
        setAmend(true)
        fetch(`http://18.169.34.1:8080/property/read`)
        .then((response) => {
            if (!response.ok) {
                alert("An error has occured, unable to read sellers");
                throw response.status;
            } else return response.json();
        })
        .then(pList => { setPropertyList(pList.filter(property => property.sellers.seller_id == sellerID)) }) //linking IDs
        .catch(error => {
            console.error(error);
        });
    }

    const handleStatusChange = (event, ref) => {
        // Update the value in the ref
        ref.current.value = event.target.value;
    }; // handles the change event of the status <select> element

    function amend(recno) {

        setPropertyList(propertyList.filter(property => property.property_id == recno.property_id))
        setAmend(false)


    }

        function save(recno) {
            const tempR = {
                "type": typeRef.current.value,
                "price": priceRef.current.value,
                "bedrooms": bedroomRef.current.value,
                "bathrooms": bathroomRef.current.value,
                "garden": gardenRef.current.value,
                "address": addressRef.current.value,
                "postcode": postcodeRef.current.value,
                "status": statusRef.current.value

            }
            console.log("hello")
            console.log(tempR)


            fetch(`http://18.169.34.1:8080/property/update/${recno.property_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tempR)
            })
                .then((response) => {
                    if (!response.ok) {
                        alert("An error has occured, unable to read sellers");
                        throw response.status;
                    } else return response.json();
                })
                .then(data => updatePList())
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });


            setAmend(true)

        }




    return (

        <>

            <main>

                <h1>Properties of <b>{sellerFirstName} {sellerSurname}</b> </h1>

                <container id="BbuttonBox">
                    <div class="topSeller">
                        <Link to={urlAddProperty} id="showButton" className="btn btn-dark "> Add a property </Link>



                    </div>

                </container>


                <table class="table1">

                    <thead>

                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bedroom</th>
                        <th scope="col">Bathroom</th>

                        <th scope="col">Garden</th>
                        <th scope="col">Seller ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Changes</th>
                        <th></th>

                    </tr>
                    </thead>

                    {

                        propertyList.map(rec => <tr>

                            <td><span>{rec.property_id}</span></td>
                            {
                                isAmend === true ?

                                    <td id="pList"> <span>{rec.address} </span> </td> : <td> <span> <input type="text" id="recid" defaultValue={rec.address} ref={addressRef} onChange={(event) => handleStatusChange(event, addressRef)}></input> </span>  </td>

                            }

                            {
                                isAmend === true ?

                                    <td><span>{rec.postcode}</span></td> : <td><span> <input type="text" id="recid" ref={postcodeRef} defaultValue={rec.postcode}  onChange={(event) => handleStatusChange(event, postcodeRef)}></input> </span></td>

                            }
                            {
                                isAmend === true ?

                                    <td><span>{rec.type}</span></td> : <td> <select ref={typeRef} onChange={(event) => handleStatusChange(event, typeRef)}>
                                        <option value="DETACHED"> DETACHED </option>
                                        <option value="SEMI-DETACHED"> SEMI-DETACHED </option>
                                        <option value="APARTMENT"> APARTMENT </option>
                                        <option value="APARTMENT"> BUNGALOW </option>


                                    </select ></td>

                            }

                            {
                                isAmend === true ?

                                    <td><span>{rec.price}</span></td> : <td><span>  <input ref={priceRef}
                                        type="number" step="10000"  defaultValue={rec.price}
                                        id="ex1"
                                        onChange={(event) => handleStatusChange(event, priceRef)}

                                    /> </span></td>

                            }
                            {
                                isAmend === true ?

                                    <td><span>{rec.bedrooms}</span></td> : <td>

                                        <input ref={bedroomRef}
                                            type="number"
                                            defaultValue={rec.bedrooms}
                                            class="form-control input-sm" id="inputsm"
                                            onChange={(event) => handleStatusChange(event, bedroomRef)}

                                        />
                                    </td>

                            }
                            {
                                isAmend === true ?

                                    <td><span>{rec.bathrooms}</span></td> : <td>

                                        <input ref={bathroomRef}
                                            type="number"
                                            defaultValue={rec.bathrooms}
                                            class="form-control input-sm" id="inputsm"
                                            onChange={(event) => handleStatusChange(event, bathroomRef)}

                                        />
                                    </td>


                            }

                            {
                                isAmend === true ?

                                    <td><span>{rec.garden}</span></td> : <td>

                                        <input ref={gardenRef}
                                            type="number"
                                            defaultValue={rec.garden}
                                            class="form-control input-sm" id="inputsm"
                                            onChange={(event) => handleStatusChange(event, gardenRef)}

                                        />
                                    </td>

                            }

                            <td><span>{rec.sellers.seller_id}</span></td>
                            {
                                isAmend === true ?

                                    <td>
                                        <span>{rec.status}</span></td> : <td>
                                        <select ref={statusRef} onChange={(event) => handleStatusChange(event, statusRef)}>

                                            <option>WITHDRAWN</option>
                                            <option>FOR SALE</option>
                                            <option>SOLD</option>
                                        </select>
                                    </td>

                            }
                            {/*<td><span>{rec.buyers.buyer_id}</span></td>*/}

                            {
                                isAmend == true?

                                rec.status == "FOR SALE" || rec.status == "WITHDRAWN" ?
                                    rec.status == "FOR SALE" ?
                                    <td><div className="topSeller"><button className="btn btn-primary" onClick={() => withdraw(rec.property_id)}>Withdraw</button></div></td>
                                    :
                                    <td><div className="topSeller"><button className="btn btn-success" onClick={() => resubmit(rec.property_id)}>Resubmit</button></div></td>



                                    :
                                    <td>  </td>
                                    :
                                    <td>  </td>


                            }
                         


                            {
                                rec.status == "FOR SALE" ?

                                    isAmend == true ?
                                        <td><div className="topSeller"><button className="btn btn-warning" value="Amend" ref={amendButton} onClick={() => amend(rec)}>Amend</button></div></td>
                                        :
                                        <td><div className="topSeller"><button className="btn btn-success" value="Save" ref={amendButton} onClick={() => save(rec)}>Save</button></div>
                                            <div className="topSeller"><button className="btn btn-danger" value="Cancel" onClick={() => canc()}>Cancel</button></div>
                                        </td>
                                    :
                                    <td>  </td>
                            }



                            {/*<td>                    <Link to={urlAddProperty}> Inspect Property </Link>*/}
                            {/*</td>*/}
                            <td>    <button className="my-button">
                                <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.property_id)} />
                            </button></td>
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



export default SellerProp;
