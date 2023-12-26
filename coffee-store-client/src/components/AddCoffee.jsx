import React from 'react';
import Swal from 'sweetalert2'

const AddCoffee = () => {
    const handleSubmit=(event)=>{
        event.preventDefault();
        const form = event.target;
        const name=form.name.value;
        const quantity=form.quantity.value;
        const supplier=form.supplier.value;
        const taste=form.taste.value;
        const category=form.category.value;
        const details=form.details.value;
        const photo=form.photo.value;
        const newCoffee={name,quantity,supplier,taste,category,details,photo}
        fetch('http://localhost:5000/coffee/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newCoffee)
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.insertedId){
            Swal.fire({
                title: 'Success!',
                text: 'User Added Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
           }
        })
    }
    return (
        <div className="bg-[#F4F3F0] p-24">
            <h1 className='text-3xl font-extrabold text-center'>Add Coffee</h1>
            <form onSubmit={handleSubmit}>
                <div className='md:flex'>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='name' placeholder="Enter Coffee name" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Chef</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="quantity" placeholder="Available Quantity" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <div className='md:flex'>
                <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Supplier</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="supplier" placeholder="Enter Coffee Supplier" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Taste</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="taste" placeholder="Enter Coffee Taste" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                <div className='md:flex'>
                <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text">Category</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='category' placeholder="Enter Coffee Category" className="input input-bordered w-full" />
                        </label>
                    </div>
                    <div className="form-control md:w-1/2 ml-4">
                        <label className="label">
                            <span className="label-text">Details</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='details' placeholder="Enter Coffee Details" className="input input-bordered w-full" />
                        </label>
                    </div>
                </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name='photo' placeholder="Enter Photo Url" className="input input-bordered w-full" />
                        </label>
                    </div>

                    <input type="submit" value="Submit" class="bg-[#D2B48C] text-white p-2 rounded-md cursor-pointer hover:bg-amber-500 w-full mt-4"/>

            </form>
        </div>
    );
};

export default AddCoffee;