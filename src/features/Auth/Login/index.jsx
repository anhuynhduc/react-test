import React from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "../RegisterForm";
import {register} from "../userSlice";
import {useDispatch} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import {useSnackbar} from "notistack";

Register.propTypes = {
    closeDialog: PropTypes.func
};

function Register(props) {
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const handleSubmit = async (values) =>{
        try {
            values.username = values.email

            const action = register(values)
            const resultAction = await dispatch(action)
            const user = unwrapResult(resultAction)

            //close dialog
            const {closeDialog} = props
            if (closeDialog){
                closeDialog()
            }

            console.log('New user',user)
            enqueueSnackbar('Register successful', {variant:'success'})
        }catch (error) {
            console.log('Failed to register:', error)
            enqueueSnackbar(error.message, {variant:'error'})
        }

    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Register;