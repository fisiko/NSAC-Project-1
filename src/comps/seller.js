import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


export default function Sell() {


    const [sellerList, setSellerList] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8080/seller/read`)
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
        const urlSellerProperties=`/sellerProp/${seller.seller_id}/${seller.firstName}/${seller.lastName}`
        navigate(urlSellerProperties)
    }
    



    function removeR(recno) {

        let tempR = sellerList.filter(recs => recs.seller_id !== recno)
        //let choice = window.confirm("Are you sure you want to delete this record")
        setSellerList(tempR)


        fetch(`http://localhost:8080/seller/delete/${recno}`, {
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

    };


    return (
        <main>


            <div class="topSeller">
                <Link to="/form" id="showButton" className="btn btn-secondary "> Register as a seller </Link>

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
                        <td> {rec.seller_id}  </td>
                        <td> {rec.firstName}  </td>
                        <td> {rec.lastName}  </td>
                        <td> {rec.address}  </td>
                        <td> {rec.postcode}  </td>
                        <td> {rec.phone}  </td>
                        <td>                        <button className="btn-outline-dark" onClick={()=> showProperties(rec)}>manage properties</button>
</td>
                        <td>    <button className="my-button">
                            <FontAwesomeIcon icon={faTrash} onClick={() => removeR(rec.seller_id)} />

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



        </main>
    )

}