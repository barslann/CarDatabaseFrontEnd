import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditCar = (props) => {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({brand: '', model: '', year: '', color: '', price: ''});

  const handleClickOpen = () => {
    setCar({brand: props.car.values.brand, model: props.car.values.model, color: props.car.values.color,
        year: props.car.values.year, fuel: props.car.values.fuel, price: props.car.values.price })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  // Update car and close modal form
  const handleSave = () => {
      props.updateCar(car, props.link);
      handleClose();
  }

  return (
    <div>
    {console.log(props)}
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
         <DialogTitle>Edit car</DialogTitle>
         <DialogContent>
            <input type="text" placeholder="Brand" name="brand" 
              value={car.brand} onChange={handleChange}/><br/> 
            <input type="text" placeholder="Model" name="model" 
              value={car.model} onChange={handleChange}/><br/>
            <input type="text" placeholder="Color" name="color" 
              value={car.color} onChange={handleChange}/><br/>
            <input type="text" placeholder="Year" name="year" 
              value={car.year} onChange={handleChange}/><br/>
            <input type="text" placeholder="Price" name="price" 
              value={car.price} onChange={handleChange}/><br/>
         </DialogContent>
         <DialogActions>
           <button onClick={handleClose}>Cancel</button>
           <button onClick={handleSave}>Save</button>
         </DialogActions>
        </Dialog> 
    </div>
  );
};

export default EditCar;