import { useState, useRef, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

// import { faTrash } from '@fortawesome/fontawesome-svg-core/import.macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Sell() {

    const [sellerList, setSellerList] = useState([])
    // const [uniqueID, setUniqueID] = useState(0)
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:3000/seller`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(sellers => { setSellerList(sellers) })
            .catch(error => {
                console.error(error);
            });
    }, []);



    function removeR(recno) {

        let tempR = sellerList.filter(recs => recs.id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setSellerList(tempR)
            // fetch("http://localhost:3000/seller")
            // .then(response => response.json())
            // .then(jsonData => {
            //     // Remove the entry based on a specific condition
            //     const updatedData = jsonData.filter(entry => entry.id !== recno);

            //     // Update the JSON data on the server
            //     fetch("http://localhost:3000/seller", {
            //         method: 'PUT', // Use the appropriate HTTP method for updating data
            //         headers: {
            //             'Content-Type': 'application/json',
            //         },
            //         body: JSON.stringify(updatedData), // Convert the JavaScript object to JSON string
            //     })
            //         .then(response => {
            //             if (response.ok) {
            //                 console.log('Entry removed successfully.');
            //             } else {
            //                 console.error('Failed to remove entry from JSON file.');
            //             }
            //         })
            //         .catch(error => {
            //             console.error('Failed to update JSON file:', error);
            //         });
            // })
            // .catch(error => {
            //     console.error('Failed to fetch JSON data:', error);
            // });


        }
        else { }

        // fetch("http://localhost:3000/seller", {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(tempR)


        // })
        //     .then((response) => {
        //         if (!response.ok) {
        //             alert("An error has occured, unable to read sellers");
        //             throw response.status;
        //         } else navigate("/buyer");
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });

        

    }

    // const forenameInputRef = useRef();
    // const surnameInputRef = useRef();
    // const addressInputRef = useRef();
    // const postcodeInputRef = useRef();
    // const phoneInputRef = useRef();


    // function addR() {
    //     // newregno(addregno + 1)


    //     if (forenameInputRef.current.value != "") {


    //         let tempR =

    //         {
    //             "firstName": forenameInputRef.current.value,
    //             "surname": surnameInputRef.current.value,
    //             "address": addressInputRef.current.value,
    //             "postcode": postcodeInputRef.current.value,
    //             "phone": phoneInputRef.current.value,
    //             "id": sellerList.length + uniqueID + 1
    //         }
    //         setSellerList([...sellerList, tempR])


    //     }
    //     else {

    //         alert("Please input both your name and marks")

    //     }


    // }



    // function onK(event) {
    //     if (event.keyCode === 13) {

    //         addR()


    //     }


    // }
    /*function (validateAndSave) {
     const newSeller = {
        "firstName": firstnameRef.current.value,
        "surname": surnnameRef.current.value,
        "address": addressRef.current.value,
        "postcode": postcodeRef.current.value
        
        
        
        
     }   
    }*/


    function showRec() {



    }

    return (
        <main>


            <div class="topSeller">
                <Link to="/form" id="showButton" className="btn btn-primary "> Register as a seller </Link>

            </div>




            <table class="table1">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Forename</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Address</th>
                    <th scope="col">Postcode</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Manage</th>
                    <th></th>

                </tr>
                {

                    sellerList.map(rec => <tr>
                        <td> {rec.id}  </td>
                        <td> {rec.firstName}  </td>
                        <td> {rec.surname}  </td>
                        <td> {rec.address}  </td>
                        <td> {rec.postcode}  </td>
                        <td> {rec.phone}  </td>
                        <td><Link to="/sellerProp">manage properties</Link></td>
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
    )

}