import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useProductsContext } from "../ProductsContextProvider";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import {Formik, Form ,Field, FieldArray} from "formik";
import { useNavigate } from "react-router";
import {regex, global} from "../../config"


const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout({ setCartBadge }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { proceedToCheckout } = useProductsContext();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState(true)
 
  const handleNext = async () => {
    
    if (activeStep != steps.length) {
      setErrors(true);
      setActiveStep(activeStep + 1);
      // console.log("hiiiiiiiiiiiii")
      // navigate("/dashboard");
    }
    
  };

  const handleBack = () => {
    setErrors(false)
    setActiveStep(activeStep - 1);
  };
  
  return (
    
        <Formik enableReinitialize={true} 
          initialValues={{
            firstName: "",
            lastName: "",
            address1: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            cardName: "",
            cardNumber: "",
            expDate:"",
            cvv: "",
          }}
          validate={values => {
            const errors ={}
            if((activeStep == 0)) {
              if(!values.firstName) {
                errors.firstName = "Required"
              }
              else if(!regex.Alphabets.test(values.firstName)) {
                errors.firstName = "Invalid Name"
              }
          
              if(!values.lastName) {
                errors.lastName = "Required"
              }
              else if(!regex.Alphabets.test(values.lastName)) {
                errors.lastName = "Invalid Name"
              }            
          
              if(!values.address1) {
                errors.address1 = "Required"
              }      
              
              if(!values.city) {
                errors.city = "Required"
              }
              else if(!regex.Alphabets.test(values.city)) {
                errors.city = "Invalid city name"
              }
              
              if(!values.state) {
                errors.state = "Required"
              }
              else if(!regex.Alphabets.test(values.state)) {
                errors.state = "Invalid state name"
              }

              if(!values.zip) {
                errors.zip = "Required"
              }
              if(!values.country) {
                errors.country = "Required"
              }
              else if(!regex.Alphabets.test(values.country)) {
                errors.country = "Invalid country name"
              }
            }
            if(activeStep == 1) {
              if(!values.cardName) {
                errors.cardName = "Required"
              }
              else if(!regex.Alphabets.test(values.cardName)) {
                errors.cardName = "Invalid cardName name"
              }

              if(!values.cardNumber) {
                errors.cardNumber = "Required"
              }
              else if(isNaN(values.cardNumber)) {
                errors.cardNumber = "Only Numbers are allowed"
              }

              if(!values.expDate) {
                errors.expDate = "Required"
              }

              if(!values.cvv) {
                errors.cvv = "Required"
              }
              else if(isNaN(values.cvv)) {
                errors.cvv = "Only Numbers are allowed"
              }
              else if(values.cvv > 999) {
                errors.cvv = "Invalid CVV"
              }
            }
            if((Object.keys(errors).length === 0)) {
             setErrors(false)
            }
            else {
              setErrors(true)
            }
            return errors;
          }}
          onSubmit= {async ( values, { setSubmitting, resetForm }) => {
            if (activeStep === steps.length - 1) {
              await proceedToCheckout(values);
              setCartBadge(0);
              setActiveStep(activeStep + 1);
            }

          }}
        >
        {({ submitForm, resetForm, isSubmitting, values, error, setFieldValues}) => {

          return (
            <Form>
              <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                <Paper
                  variant="outlined"
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                  <Typography component="h1" variant="h4" align="center">
                    Checkout
                  </Typography>
                  <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                    {steps.map((label, index) => (
                      <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                  {
                    (activeStep == 0) &&
                    <AddressForm values={values}/>
                  }
                  {
                    (activeStep == 1) &&
                    <PaymentForm values={values}/>
                  }
                  {
                    activeStep == 2 &&
                    <Review values={values}/>
                  }
                  {activeStep === steps.length && 
                    <>
                      <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your order number is placed. We have emailed your order
                        confirmation, and will send you an update when your order has
                        shipped.
                      </Typography>
                    </>
                  }
                                   
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {((activeStep !== 0) && (activeStep != steps.length))  && 
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    }
                    {
                      (activeStep === steps.length - 1) &&
                      <Button
                        variant="contained"
                        onClick={submitForm}
                        disabled={!(Object.keys(errors).length === 0)}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Place Order
                      </Button>
                    }
                    {
                      (activeStep === steps.length) &&

                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        close
                      </Button>
                    }
                    {
                      !( (activeStep === steps.length - 1) || (activeStep === steps.length)) && 
                    
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={errors}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        Next
                      </Button>

                    }

                  </Box>
                </Paper>
              </Container>
            </Form>
          )
        }}
        </Formik>
        
  );
}
