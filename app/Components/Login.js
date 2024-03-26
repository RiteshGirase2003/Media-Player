import React,{useState} from 'react'

function Login({onFetchTokens}) {
    const [mobile, setMobile] = useState('');
    const [otpData, setOtpData] = useState('');
    const [otp, setOtp] = useState('');

    const handleGenerateOTP = async () =>{
        const payload = {
            "mobileNumber": mobile
        }
        const response = await fetch('https://api.audioshots.app/auth/generateOtp', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        const result = await response.json();
        setOtpData(result.data);
    
    // console.log('generateOTP : '+inputValue)

    }

    const handleMobileInputChange = (e) =>{
        
        setMobile(e.target.value);
        
        // console.log('handleInputChange : '+e.target.value);
    };

    const handleOtpInputChange = async(e) =>{
        setOtp(e.target.value);
    };

    const handleLogin = async()=>{
        const payload = {
            "mobileNumber": mobile,
            "otp": otp,
            "otpSessionId": otpData
          }
        const response = await fetch('https://api.audioshots.app/auth/verifyUser', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
        });
        const result = await response.json();
        console.log(result.data.tokens);
        onFetchTokens(result.data.tokens);
    };

  return (
    <div>

        <label for="Phone">Phone : </label>
        <input type="text" id="Phone" name="Phone" placeholder="Enter your Phone Number" onChange={handleMobileInputChange} maxLength={10} minLength={10} required/>

        <button onClick={handleGenerateOTP}> Generate OTP </button>
        <br></br>
        <br></br>

        <label for="otp">Otp : </label>
        <input type="text" id="otp" name="otp" placeholder="Enter your OTP Number" onChange={handleOtpInputChange} maxLength={6} minLength={6} required/>
        <button onClick={handleLogin}> Login </button>
    </div>
  )
}

export default Login