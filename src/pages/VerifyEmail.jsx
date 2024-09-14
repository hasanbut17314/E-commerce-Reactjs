import React from 'react'
import { useVerifyEmailMutation } from '../services/authApi';
import { useNavigate, useParams } from 'react-router-dom';
import notify from '../utils/notify';

const VerifyEmail = () => {

    const navigate = useNavigate();
    const {token} = useParams();
    const [verifyEmail, {isLoading}] = useVerifyEmailMutation();

    const verify = async () => {
        try {
            response = await verifyEmail(token).unwrap();
            if(response.status === 200) {
                notify.success(response.message);
                navigate('/login');
            } else if(response.status === 404) {
                notify.error('Unable to verify email. Your Token may be expired. Please try again.');
            }
        } catch (error) {
            notify.error(error.data.message);
            console.log(error);
        }
    }

  return (
    <div className='text-center mt-5'>
        <h1 className='text-xl'>Click on Verify button to verify your email</h1>
        <button 
        className='btn bg-green-400 px-5 py-2 rounded-md text-white font-semibold mt-3'
        onClick={verify}
        disabled={isLoading}
        >
        Verify
        </button>
    </div>
  )
}

export default VerifyEmail