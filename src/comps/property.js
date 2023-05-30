import { useState, useRef, useEffect } from "react"
import {  useNavigate } from "react-router-dom"


export default function Property() {

    const [propertyList, setPropertyList] = useState([])
    const navigate = useNavigate()


    const inputGardenRef = useRef(null);
    const inputBedRef = useRef(null);
    const inputBathRef = useRef(null);
    const inputTypeRef = useRef(null);
    const inputMaxPriceRef = useRef(null);
    const inputStatusRef = useRef(null);


    useEffect(() => {

        fetch(`http://18.169.34.1:8080/property/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            // .then(sellers => { setPropertyList(sellers) })
            .then(
                pList => {
                    setPropertyList(pList)
                }) //linking IDs
            .catch(error => {
                console.error(error);
            });
    }, []);


    const showProperties = (property) => {
        const urlProperty = `/property/${property.property_id}/${property.address}/${property.postcode}`
        navigate(urlProperty)
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



        fetch(`http://18.169.34.1:8080/property/read`)
            .then((response) => {
                if (!response.ok) {
                    alert("An error has occured, unable to read sellers");
                    throw response.status;
                } else return response.json();
            })
            .then(
                pList => {
                    setPropertyList(pList.filter(property => {
                        return (
                            (tempR.garden === 'Any' || property.garden === tempR.garden) &&
                            (tempR.bedroom === 'Any' || property.bedrooms === tempR.bedroom) &&
                            (tempR.bath === 'Any' || property.bathrooms === tempR.bath) &&
                            (tempR.type === 'Any' || property.type === tempR.type) &&
                            (tempR.maxprice === 'Any' || property.price <= parseInt(tempR.maxprice)) &&
                            (tempR.status === 'Any' || property.status === tempR.status)

                        );
                    }));
                })
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
                            <option>SEMI</option>

                        </select>
                    </div>


                    <div class="col-md-2">
                        <label for="inputMaxPrice">Max Price</label>
                        <select ref={inputMaxPriceRef} class="form-control" >
                            <option selected>Any</option>

                            <option>100000</option>
                            <option>150000</option>
                            <option>200000</option>
                            <option>250000</option>
                            <option>300000</option>
                            <option>350000</option>

                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="inputStatus">Status</label>
                        <select ref={inputStatusRef} class="form-control">
                            <option selected>Any</option>

                            <option>SOLD</option>
                            <option>FOR SALE</option>
                            <option>WITHDRAWN</option>

                        </select>
                    </div>

                </div>


            </form>

            <br />
            <br />
            <div className="topSeller"><button className="btn btn-secondary" id="showButton" onClick={() => showRec()}>Search For properties</button>
            </div>



            <br />
            <br />
            <br />
            <table class="table1">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Address</th>
                    <th scope="col">Postcode</th>
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
                        <td> {rec.property_id}  </td>
                        <td> {rec.address}  </td>
                        <td> {rec.postcode}  </td>
                        <td> {rec.type}  </td>
                        <td> {rec.price}  </td>
                        <td> {rec.bedrooms}  </td>
                        <td> {rec.bathrooms}  </td>
                        <td> {rec.garden}  </td>

                        {
                            rec.status === "FOR SALE" ?
                                <td>FOR SALE</td>


                                :
                                <td> {rec.status}  </td>


                        }
                        {
                            rec.status === "FOR SALE" ?
                                <td> <button className="btn btn-success" onClick={() => showProperties(rec)}>Book</button></td>


                                :
                                <td> </td>


                        }



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



        </main>
    )

}