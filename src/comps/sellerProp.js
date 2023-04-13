import { useState, useRef, useEffect, Component  } from "react"
import { Link, useNavigate, useParams} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from 'react-dom/client';
import React from 'react';




function SellerProp() {

    const{sellerID, sellerFirstName, sellerSurname}=useParams()

    // const urlAddProperty=`/propForm/${seller.id}/${seller.firstName}/${seller.surname}`
        const urlAddProperty=`/propForm/${sellerID}/${sellerFirstName}/${sellerSurname}`


    console.log(sellerID, sellerFirstName, sellerSurname)

    const [propertyList, setpropertyList] = useState([])
    // const [uniqueID, setUniqueID] = useState(0)
    const navigate = useNavigate()

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
            .then(pList => { setpropertyList(pList.filter(property=>property.sellerId==sellerID)) }) //linking IDs
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

    // ReactDOM.render(<p>Hallo</p>, document.getElementById('table1'))
    return (

        <>

            <main>

                <h1>Properties of <b>{sellerFirstName} {sellerSurname}</b> </h1>
                 
            <container id="BbuttonBox">
                <div class="topSeller">
                    <Link to={urlAddProperty} id="showButton" className="btn btn-primary "> Add a property </Link>

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
                        <th scope="col"></th>
                        <th></th>

                    </tr>
                    {

                        propertyList.map(rec => <tr>
                            <td> {rec.id}  </td>
                            <td> {rec.address}  </td>
                            <td> {rec.postcode}  </td>
                            <td> {rec.type}  </td>
                            <td> {rec.price}  </td>
                            <td> {rec.bedroom}  </td>
                            <td> {rec.garden}  </td>
                            <td> {rec.sellerId}  </td>
                            <td> {rec.status}  </td>
                            <td> {rec.buyerId}  </td>
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


                </>);}

                

export default SellerProp;

// 