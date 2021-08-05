export const LoginEmail = async (data) => {
    try {
        console.log("In login email auth");
        console.log(data);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/loginemail', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('emailtoken',data.token);
                console.log("Email found");
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

export const LoginPass = async (data) => {
    try {
        console.log("In login pass auth");
        console.log(data);
        const token = localStorage.getItem('emailtoken');
        console.log(token);
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        };
        await fetch('https://le2fpw7qj8.execute-api.ap-south-1.amazonaws.com/Prod/loginpass', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                localStorage.setItem('token',data.token);
                console.log("Login/Signup successful");
                localStorage.removeItem('emailtoken');
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