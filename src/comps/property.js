import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Property() {

    const { propertyID, propertyFirstName, propertySurname } = useParams()

    // const urlpropertyProperty=`/propertyProp/${propertyID}/${propertyFirstName}/${propertySurname}`


    const [propertyList, setpropertyList] = useState([])
    const navigate = useNavigate()
    const [propCriteria, setPropCriteria] = useState([])


    const inputGardenRef = useRef(null);
    const inputBedRef = useRef(null);
    const inputBathRef = useRef(null);
    const inputTypeRef = useRef(null);
    const inputMaxPriceRef = useRef(null);
    const inputStatusRef = useRef(null);


    useEffect(() => {

        fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setpropertyList(sellers) })
            .then(
                pList => {
                    setpropertyList(pList)
                }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);


    function removeR(recno) {

        let tempR = propertyList.filter(recs => recs.id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setpropertyList(tempR)



        }
        else { }




    }



    function showRec() {

        const tempR = {
            "garden": inputGardenRef.current.value,
            "bedroom": inputBedRef.current.value,
            "bath": inputBathRef.current.value,
            "type": inputTypeRef.current.value,
            "maxprice": inputMaxPriceRef.current.value,
            "status": inputStatusRef.current.value,


        }



        fetch(`http://localhost:3000/property`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setpropertyList(sellers) })
            .then(
                pList => {
                    setpropertyList(pList.filter(property => {
                        return (
                            (tempR.garden === 'Any' || property.garden == tempR.garden) &&
                            (tempR.bedroom === 'Any' || property.bedroom == tempR.bedroom) &&
                            (tempR.bath === 'Any' || property.bathroom == tempR.bath) &&
                            (tempR.type === 'Any' || property.type == tempR.type) &&
                            (tempR.maxprice === 'Any' || property.price <= parseInt(tempR.maxprice)) &&
                            (tempR.status === 'Any' || property.status == tempR.status)

                        );
                    }));
                }) //linking IDs
            .catch(error => {
                console.error(error);
            });










    }



    return (
        <main>
            <h1>Our Properties</h1>
            <form>

                <div class="row topSeller" >


                    <div class="col-md-1">
                        <label for="inputGarden">Garden</label>
                        <select ref={inputGardenRef} class="form-control">
                            <option selected>Any</option>
                            <option>1</option>
                            <option>0</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputMinBed">Bedrooms</label>
                        <select ref={inputBedRef} class="form-control">
                            <option selected>Any</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputMinBath">Bathroom</label>
                        <select ref={inputBathRef} class="form-control">
                            <option selected>Any</option>

                            <option>1</option>
                            <option>2</option>
                            <option>3</option>

                        </select>
                    </div>

                    <div class="col-md-2">
                        <label for="inputType">Type</label>
                        <select ref={inputTypeRef} class="form-control">
                            <option selected>Any</option>

                            <option>DETACHED</option>
                            <option>APARTMENT</option>
                            {/* <option>Semi-Detached</option> */}

                        </select>
                    </div>


                    <div class="col-md-2">
                        <label for="inputMaxPrice">Max Price</label>
                        <select ref={inputMaxPriceRef} class="form-control">
                            <option selected>Any</option>

                            <option>100000</option>
                            <option>150000</option>
                            <option>200000</option>
                            <option>250000</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputStatus">Status</label>
                        <select ref={inputStatusRef} class="form-control">
                            <option selected>Any</option>

                            <option>SOLD</option>
                            <option>FOR SALE</option>

                        </select>
                    </div>



                </div>






            </form>

            <br />
            <br />
            <div className="topSeller">                    <button className="btn btn-primary" id="showButton" onClick={() => showRec()}>Search For properties</button>
            </div>



            <br />
            <br />
            <br />
            <table class="table1">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Type</th>
                    <th scope="col">Price</th>
                    <th scope="col">Bedroom</th>
                    <th scope="col">Bathroom</th>
                    <th scope="col">Garden</th>
                    <th scope="col">Status</th>
                    <th></th>

                </tr>
                {

                    propertyList.map(rec => <tr>
                        <td> {rec.id}  </td>
                        {/* <td> {rec.address}  </td> */}
                        {/* <td> {rec.postcode}  </td> */}
                        <td> {rec.type}  </td>
                        <td> {rec.price}  </td>
                        <td> {rec.bedroom}  </td>
                        <td> {rec.bathroom}  </td>
                        <td> {rec.garden}  </td>

                        {
                        rec.status=="FOR SALE" ?
                        <td><div className="topSeller"><button className="btn btn-primary">Book</button></div></td>


                        :
                            <td> {rec.status}  </td>

                        
                        }

                        {/* <td> {rec.sellerId}  </td> */}
                        {/* <td> {rec.buyerId}  </td> */}

                        <td><button className="btn btn-link">Inspect property</button></td>


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