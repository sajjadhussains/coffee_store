import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Card = ({ coffee, coffees, setCoffees }) => {
    const { _id, name, quantity, supplier, taste, category, details, photo } = coffee;
    const handleDelete = (_id) => {
        console.log(_id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/coffee/${_id}`, {
                    method: 'Delete'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining=coffees.filter(cof=>cof._id != _id);
                            setCoffees(remaining)
                        }
                    })

            }
        });
    }
    return (

        <div className="card card-side bg-base-100 py-5 shadow-xl">
            <figure><img src={photo} alt="Shoes" /></figure>
            <div className="flex justify-between w-full pr-4 pl-2">
                <div>
                    <h2 className="card-title">{name}</h2>
                    <p>{quantity}</p>
                    <p>{supplier}</p>
                    <p>{taste}</p>
                </div>
                <div className="card-actions justify-end">
                    <div className="btn-group flex flex-col space-y-4">
                        <button className="btn active bg-[#4B5563] text-white">View</button>
                        <Link to={`updateCoffee/${_id}`}>
                            <button className="btn bg-[#4B5563] text-white">Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(_id)} className="btn bg-[#F05252] hover:bg-orange-500 text-white">X</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;