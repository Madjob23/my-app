import './App.css';
import logo from './logo.jpeg'
import bg from './bg.jpeg'
import {useState} from 'react'
import axios from 'axios'

function App() {
  

    const [userInput, setUserInput] = useState({
      username: "", password: ""
    })

    // taking Input
    const input = (e) => {
      e.preventDefault()
      const name = e.target.name;
      const value = e.target.value;
      setUserInput({...userInput, [name]:value})
      console.log(name, value)
    }
    
    // Processing Input
    const [records, setRecords] = useState([]);
    const submit = async (e, userInput) => {
      e.preventDefault();
      setRecords(userInput);
      console.log(records); // just for checking
      try {
        // sending username and password to API
        const response = await axios.post(  
          "https://be-infollion.vercel.app/api/v1/users/login", // API URL
          // request body
          {
            username: userInput.username,
            password: userInput.password
          }
        );
        // API sends back data that has a message and a token

        // separating the message
        const message = response.data.message 
        await alert(message)
        
        // separating the token and saving it in browser's local storage
        const token = response.data.token;
        localStorage.setItem("token", token);
      } catch (err) {
        console.log(err);
        alert("Incorrect Username/Password.")
      }
  
      // clearing input fields
      setUserInput({
        username: "",
        password: "",
      })
    };

    // for logging in with OTP
    const otp = async (e) => {  
      let username = prompt("Please Enter Username")
      try {
        const fetchOTP = await axios.post("https://be-infollion.vercel.app/api/v1/users/generate-otp",
        {
          username: username
        }
        );

        const otp = fetchOTP.data.otp
        alert(otp)

        const otpEntry = await prompt("Enter OTP")

        const otpVerification = await axios.post("https://be-infollion.vercel.app/api/v1/users/verify-otp"
        , {
          username: username, otp: otpEntry
        });

        const msg = otpVerification.data.message;
        alert(msg);

        const tkn = otpVerification.data.token;
        localStorage.setItem("tkn", tkn);
      } catch (err) {
        console.log(err);
        alert("Invalid OTP.")
      }
    }
    
    return (
    <>
      <div className="container">
        <div><img className="bg" src={bg} alt="Digital Art"></img></div>
        <div>
            <form action="">
                <div className="login">
                    <img id="logo" src={logo} alt="logo" title="Logo"></img>
                    <p>Login to Dashboard</p>
                    <input onChange={input} title="Enter Email or Username" type="email" placeholder="Email/Username" name="username" value={userInput.username} required></input>
                    <input onChange={input} title="Enter Password" type="password" placeholder="Password" name="password" value={userInput.password} required></input>
                    <button onClick={(e) => submit(e,userInput)} className="lgn_btn" type="button">Log in</button>
                    <p>OR</p>
                    <button onClick={otp} type="button" className="otp_btn">Log in with OTP</button>
                </div>
            </form>
        </div>
    </div>
    </>
  );
  }

export default App;
