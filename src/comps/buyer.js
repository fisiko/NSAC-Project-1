import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function BuyerData() {

    const [sellerList, setSellerList] = useState([])
    const [uniqueID, setUniqueID] = useState(0)
    useEffect(() => {
        fetch(`http://localhost:3000/buyer`)
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
            setUniqueID(uniqueID + 1)
        }
        else { }
    }

    const forenameInputRef = useRef();
    const surnameInputRef = useRef();
    const addressInputRef = useRef();
    const postcodeInputRef = useRef();
    const phoneInputRef = useRef();
    const bForm = useRef();
    const showButton = useRef();
  

    function addR() {
 

        if (forenameInputRef.current.value != "") {

            // setUniqueID( uniqueID + 1)
          


            let tempR =

            {
                "firstName": forenameInputRef.current.value,
                "surname": surnameInputRef.current.value,
                "address": addressInputRef.current.value,
                "postcode": postcodeInputRef.current.value,
                "phone": phoneInputRef.current.value,
                "id": sellerList.length + uniqueID + 1
            }
            // tempR = tempR.map((item, index) => {return {...item, regno: index}})
            setSellerList([...sellerList, tempR])


        }
        else {

            alert("Please input both your name and marks")

        }


    }



    function onK(event) {
        if (event.keyCode === 13) {

            addR()


        }


    }

let count = 0
    function formDisplay(){
        if (count % 2 == 0){
showButton.current.value = "Hide"
            
            bForm.current.style.display = "block"
            count ++
        }
        else {
            count ++
            showButton.current.value = "Add Record"
            bForm.current.style.display = "none"
        }
        
    }



    return (
        <>


            <br />
            <h1>Register as a buyer</h1>
            <br />
            <br />


            <input type="button" class="btn btn-success" value="Add Record" onClick={() => formDisplay()} ref={showButton} id="showButton"></input>




            <form id="buyerForm"  ref={bForm} style={{display: "none"}}>
                <div class="form-row">
                    <div class="mx-auto col-10 col-md-8 col-lg-6">
                        <div class="form-group col">
                            <label for="InputName">Forename</label>
                            <input type="Name" ref={forenameInputRef} class="form-control" id="InpForename" aria-describedby="InputName" placeholder="Enter your forename"></input>
                        </div>

                        <div class="form-group col">
                            <label for="InputName">Surname</label>
                            <input type="Name" ref={surnameInputRef} class="form-control" id="InpSurname" aria-describedby="InputName" placeholder="Enter your surname"></input>
                        </div>



                        <div class="form-group">
                            <label for="InputPhone">Phone Number</label>
                            <input type="phone" ref={phoneInputRef} class="form-control" id="InputPhone" placeholder="Phone Number"></input>

                        </div>

                        <div class="form-group">
                            <label for="InputAddress">Address</label>
                            <input type="text" ref={addressInputRef} class="form-control" id="InputAddress" placeholder="Address"></input>

                        </div>
                        {/* <label for="inputAddress">Address</label> */}
                        {/* <input type="text" class="form-control" id="inputAddress" placeholder="House Number"></input> */}
                        <div class="form-group  col-md-5">
                            <label for="inputCounty">County</label>
                            <select id="inputCounty" class="form-control">
                                <option selected>Choose...</option>
                                <option>Birmingham</option>
                                <option>London</option>
                                <option>Leeds</option>
                                <option>Manchester</option>
                                <option>Liverpool</option>
                                <option>Bristol</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div class="form-group col-md-3">
                            <label for="inputPcode">Post Code</label>
                            <input type="text" ref={postcodeInputRef} class="form-control" id="inputPcode"></input>
                        </div>
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>

                        {/* <button type="submit" class="btn btn-primary" onClick={() => addR()}>Submit</button> */}
                        <input type="button" class="btn btn-success" value="Add Record" onClick={() => addR()} id="addButt"></input>


                    </div>




                </div>
            </form>
            <br />
            <br />
            <br />
            {/* <div class = "theTable"> */}

            <table class="table1">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Forename</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Address</th>
                    <th scope="col">Postcode</th>
                    <th scope="col">Phone</th>
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
                        {/* <td><input type="button" onClick={() => removeR(rec.id)}/><FontAwesomeIcon icon={faTrash} id="trashCan"/></td> */}
                        <td>    <button className="my-button">
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.id)} />

                        </button></td>
                    </tr>
                    )
                }
            </table>
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



        </>
    )

}