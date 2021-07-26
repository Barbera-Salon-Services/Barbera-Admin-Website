export const LoginPhone = async (data) => {
    try {
        console.log("In login phone auth");
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch('https://fma7xvauo3.execute-api.ap-south-1.amazonaws.com/Prod/loginphone', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('phonetoken',data.token);
                console.log("OTP sent");
                return true;
            })
            .catch(error => {
                alert(error);
                return false;
            });
    } catch (err) {
        alert(err.message);
        return false;
    }
};

export const LoginOtp = async (data) => {
    try {
        console.log("In login otp auth");
        console.log(data);
        const token = localStorage.getItem('phonetoken');
        console.log(token);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        };
        await fetch('https://fma7xvauo3.execute-api.ap-south-1.amazonaws.com/Prod/loginotp', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('token',data.token);
                console.log("Login/Signup successful");
                localStorage.removeItem('phonetoken');
                return true;
            })
            .catch(error => {
                alert(error);
                return false;
            });
    } catch (err) {
        alert(err.message);
        return false;
    }
};