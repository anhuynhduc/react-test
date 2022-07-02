import React from 'react';
import PropTypes from 'prop-types';
import {useForm} from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from "@hookform/resolvers/yup";
import InputField from "../../../components/form-controls/InputField";
import {Avatar, Button, LinearProgress, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {makeStyles} from "@material-ui/core/styles";
import PasswordField from "../../../components/form-controls/PasswordField";


const useStyles = makeStyles((theme) => ({
    root : {
        paddingTop: theme.spacing(4)
    },

    avatar:{
        margin: "0 auto",
        backgroundColor: theme.palette.secondary.main
    },

    title: {
        margin: theme.spacing(2, 0, 3, 0),
        textAlign: "center"
    },

    submit: {
        margin: theme.spacing(3, 0, 2, 0),
    }
}))
RegisterForm.propTypes = {
    onSubmit: PropTypes.func
};

function RegisterForm(props) {
    const classes = useStyles()

    const schema = yup.object().shape({
        fullName: yup.string()
            .required('please enter your fullName')
            .test('should has at least two words', 'please enter at least two word.', (value)=>{
                return value.split(' ').length >= 2
            }),
        email: yup.string()
            .required('please enter your email')
            .email('Please enter a valid email address'),
        password: yup.string()
            .required('please enter your password')
            .min(6, 'Please enter at least 6 characters'),
        retypePassword: yup.string()
            .required('please enter your retype password')
            .oneOf([yup.ref('password')], 'Password does not match')


    })
    const form = useForm({
        defaultValues:{
            fullName:'',
            email:'',
            password:'',
            retypePassword:'',
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) =>{
        const {onSubmit} = props
        if (onSubmit){
            await onSubmit(values)
        }
    }

    const {isSubmitting} = form.formState
    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress/>}


            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography component="h3" variant="h5" className={classes.title}>
                Create An Account
            </Typography>

            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name="fullName" label="Full Name" form={form}/>
                <InputField name="email" label="Email" form={form}/>
                <PasswordField name="password" label="Password" form={form}/>
                <PasswordField name="retypePassword" label="Retype Password" form={form}/>

                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>
                    Create an account
                </Button>
            </form>
        </div>

    );
}

export default RegisterForm;