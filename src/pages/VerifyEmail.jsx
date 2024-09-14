import React from 'react'
import { useVerifyEmailMutation } from '../services/authApi';
import { useNavigate, useParams } from 'react-router-dom';
import notify from '../utils/notify';
import { Button, CircularProgress } from '@mui/material';

const VerifyEmail = () => {

    const navigate = useNavigate();
    const { token } = useParams();
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

    const verify = async () => {
        try {
            await verifyEmail(token).unwrap();
            notify.success('Email verified successfully');
            navigate('/login');
        } catch (error) {
            notify.error('Unable to verify email. Your Token may be expired. Please try again');
        }
    }

    return (
        <div className='text-center mt-5'>
            <h1 className='text-xl'>Click on Verify button to verify your email</h1>
            <Button
            onClick={verify}
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading && <CircularProgress size={22} />}
            sx={{ mt: 2, textTransform: 'capitalize', fontSize: '16px' }}
            >
                {isLoading ? 'Verifying...' : 'Verify'}
            </Button>
        </div>
    )
}

export default VerifyEmail