import { useState, useRef, useEffect, Component } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom/client';
import React from 'react';

function SellerProp() {

    const { sellerID, sellerFirstName, sellerSurname } = useParams()

    // const urlAddProperty=`/propForm/${seller.id}/${seller.firstName}/${seller.surname}`
    const urlAddProperty = `/propForm/${sellerID}/${sellerFirstName}/${sellerSurname}`


    console.log(sellerID, sellerFirstName, sellerSurname)

    const [propertyList, setpropertyList] = useState([])
    // const [uniqueID, setUniqueID] = useState(0)
    const navigate = useNavigate()
    const amendButton = useRef();

    const idRef = useRef()
    const addressRef = useRef()
    const postcodeRef  = useRef()
    const typeRef  = useRef()
    const priceRef  = useRef()
    const bedroomRef = useRef()
    const bathroomRef = useRef()
    const gardenRef = useRef()
    const sellerIdRef = useRef()
    const statusRef = useRef()
    const buyerIdRef  = useRef()


    // const [jsonData, setJsonData] = useState([]); // JSON data stored in state



    useEffect(() => {

        fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setpropertyList(sellers) })
            .then(pList => { setpropertyList(pList.filter(property => property.sellerId == sellerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);

    // const selID=1;
    propertyList.filter(property => property.sellerId === sellerID)


    function removeR(recno) {

        let tempR = propertyList.filter(recs => recs.id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setpropertyList(tempR)


            fetch(`http://localhost:3000/property/${recno}`, {
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



        fetch(`http://localhost:3000/property/${recno}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(statusChange)
        })
            .then(response => response.json())
            .then(
            )
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });

             fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setpropertyList(sellers) })
            .then(pList => { setpropertyList(pList.filter(property => property.sellerId == sellerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });

            

            

    }



    function withdraw(recno) {

        const statusChange = { status: "Withdrawn" };

        fetch(`http://localhost:3000/property/${recno}`, {
            method: 'PATCH',
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
    .then()
            .catch(error => {
                console.error('Failed to delete JSON entry:', error);
            });


        fetch(`http://localhost:3000/property`)
        .then((response) => {
            if (!response.ok) {
                alert("An error has occured, unable to read sellers");
                throw response.status;
            } else return response.json();
        })
        // .then(sellers => { setpropertyList(sellers) })
        .then(pList => { setpropertyList(pList.filter(property => property.sellerId == sellerID)) }) //linking IDs
        .catch(error => {
            console.error(error);
        });



    }

    const[isAmend, setAmend] = useState(true);

    function amend (recno) {

        if (amendButton.current.value == "Amend"){
            setAmend(false)
        }
        else {


                      
            // const statusChange = { status: "Withdrawn" };

             
            const tempR = {
                "type": typeRef.current.value,
                "price": priceRef.current.value,
                "bedroom": bedroomRef.current.value,
                "bathroom": bathroomRef.current.value,
                "garden": gardenRef.current.value,
                "address": addressRef.current.value,
                "postcode": postcodeRef.current.value,
                "sellerId": recno.sellerId,
                "status": statusRef.current.value,
                // "buyerId": recno.buyerId

              }

              console.log(tempR)

            fetch(`http://localhost:3000/property/${recno.id}`, {
                method: 'PATCH',
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
        .then()
                .catch(error => {
                    console.error('Failed to delete JSON entry:', error);
                });
    
    
            fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setpropertyList(sellers) })
            .then(pList => { setpropertyList(pList.filter(property => property.sellerId == sellerID)) }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    
                setAmend(true)


        }

console.log(amendButton.current.value)
        




    }

    // ReactDOM.render(<p>Hallo</p>, document.getElementById('table1'))
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
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Address</th>
                        <th scope="col">Postcode</th>
                        <th scope="col">Type</th>
                        <th scope="col">Price</th>
                        <th scope="col">Bedroom</th>
                        <th scope="col">Garden</th>
                        <th scope="col">Seller ID</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer ID</th>
                        <th scope="col">Changes</th>
                        {/* <th scope="col"></th> */}
                        <th></th>

                    </tr>
                    {

                        propertyList.map(rec => <tr>
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.id}</span></td>:<td><span> <input type="text" id="recid" ref={idRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                <td id="pList"> <span>{rec.address} </span> </td>:<td> <span> <input type="text" id="recid" ref={addressRef}></input> </span>  </td>

                            }
                            
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.postcode}</span></td>:<td><span> <input type="text" id="recid" ref={postcodeRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.type}</span></td>:<td><span> <input type="text" id="recid" ref={typeRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.price}</span></td>:<td><span> <input type="text" id="recid" ref={priceRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.bedroom}</span></td>:<td><span> <input type="text" id="recid" ref={bedroomRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.garden}</span></td>:<td><span> <input type="text" id="recid" ref={gardenRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.sellerId}</span></td>:<td><span> <input type="text" id="recid" ref={sellerIdRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.status}</span></td>:<td><span> <input type="text" id="recid" ref={statusRef}></input> </span></td>

                            }
                            {
                                isAmend==true?
                               
                                    <td><span>{rec.buyerId}</span></td>:<td><span> <input type="text" id="recid" ref={buyerIdRef}></input> </span></td>

                            }
                                                        {
                                isAmend==true?
                               
                                    <td><span>{rec.bathroom}</span></td>:<td><span> <input type="text" id="recid" ref={bathroomRef}></input> </span></td>

                            }
                     
                            {
                                rec.status == "FOR SALE" ?
                                    <td><div className="topSeller"><button className="btn btn-primary" onClick={() => withdraw(rec.id)}>Withdraw</button></div></td>


                                    :
                                    <td><div className="topSeller"><button className="btn btn-success" onClick={() => resubmit(rec.id)}>Resubmit</button></div></td>



                            }
                             {
                                isAmend==true ?
                                    <td><div className="topSeller"><button className="btn btn-warning" value="Amend" ref={amendButton} onClick={() => amend(rec)}>Amend</button></div></td>


                                    :
                                    <td><div className="topSeller"><button className="btn btn-primary" value="Save" ref={amendButton} onClick={() => amend(rec)}>Save</button></div></td>



                            }
                          
                            <td>                    <Link to={urlAddProperty}> Inspect Property </Link>
                            </td>
                            {/* <td><input type="button" onClick={() => removeR(rec.id)}/><FontAwesomeIcon icon={faTrash} id="trashCan"/></td> */}
                            <td>    <button className="my-button">
                                <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.id)} />

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

// 