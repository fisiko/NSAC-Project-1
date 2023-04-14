import { useState, useRef, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

// import { faTrash } from '@fortawesome/fontawesome-svg-core/import.macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Sell() {

    const{sellerID, sellerFirstName, sellerSurname}=useParams()

    // const urlSellerProperty=`/sellerProp/${sellerID}/${sellerFirstName}/${sellerSurname}`


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
    const showProperties=(seller)=>{
        const urlSellerProperties=`/sellerProp/${seller.id}/${seller.firstName}/${seller.surname}`
        navigate(urlSellerProperties)
    }
    



    function removeR(recno) {

        let tempR = sellerList.filter(recs => recs.id != recno)
        let choice = window.confirm("Are you sure you want to delete this record")
        if (choice) {
            setSellerList(tempR)



        }
        else { }


        

    }




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
                        {/* <td><Link to={urlSellerProperties}>manage properties</Link></td> */}
                        <td>                        <button className="btn btn-link" onClick={()=> showProperties(rec)}>manage properties</button>
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
    )

}