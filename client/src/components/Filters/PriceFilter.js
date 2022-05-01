import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Grid, TextField } from "@mui/material";

export default function PriceFilter(props) {
  const [open, setOpen] = React.useState(false);
  const [priceFrom, setPriceFrom] = React.useState(null);
  const [priceTo, setPriceTo] = React.useState(null);
  const [errorText, setErrorText] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSet = () => {
    
    if(parseInt(priceFrom) > parseInt(priceTo)){
        setErrorText("Maximum Price range cannot exceed minimum price range")
    }
    if(!priceFrom || !priceTo){
        setErrorText("Values Cannot be null")
    }
    else{
        props.productFilters("price",[priceFrom,priceTo]);
        setOpen(false);
    }
    
  };

  const handleClear = () =>{
      setOpen(false);
      setPriceFrom(null);
      setPriceTo(null);
      setErrorText(null);
      props.productFilters("clearprice");
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{marginTop:'17%', marginLeft:'5%', height:'100%', borderColor:'black', color:'black'}}>
        Price Filter
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogContent>
          <Grid container columnSpacing={2} rowSpacing={2}>
            <Grid item md={6}>
              <TextField
                id="price-from"
                label="From"
                variant="outlined"
                type="number"
                value={priceFrom}
                onChange={(e)=>{setPriceFrom(e.target.value)}}
              />
            </Grid>
            <Grid item md={6}>
              <TextField
                id="price-to"
                label="To"
                variant="outlined"
                type="number"
                min={priceFrom}
                value={priceTo}
                onChange={(e)=>{setPriceTo(e.target.value)}}
              />
            </Grid>
            <Grid item md={12}>
              <p style={{color:'orange', fontWeight:'bold'}}>
                  {errorText}
              </p>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClear}>
            Clear
          </Button>
          <Button autoFocus onClick={handleSet}>
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
