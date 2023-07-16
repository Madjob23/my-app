import './App.css';
import logo from './logo.jpeg'
import bg from './bg.jpeg'
import {useState} from 'react'
import axios from 'axios'

function App() {
  

    const [userInput, setUserInput] = useState({
      username: "", password: ""
    })

    const input = (e) => {
      e.preventDefault()
      const name = e.target.name;
      const value = e.target.value;
      setUserInput({...userInput, [name]:value})
      console.log(name, value)
    }
    

    const [records, setRecords] = useState([]);
    const submit = async (e, userInput) => {
      e.preventDefault();
      setRecords(userInput);
      console.log(records);
      try {
        const response = await axios.post(
          "https://be-infollion.vercel.app/api/v1/users/login",
          {
            username: userInput.username,
            password: userInput.password
          }
        );
  
        const message = response.data.message
        await alert(message)
  
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log(message);
  
        console.log(token);
      } catch (err) {
        console.log(err);
        alert("An Error occured.")
      }
  
      setUserInput({
        username: "",
        password: "",
      })
    };

    const otp = async (e) => {
      let logInWithOtp = prompt("Please Enter Username")
      try {
        const otpPrompt = await axios.post("https://be-infollion.vercel.app/api/v1/users/generate-otp",
        {
          username: logInWithOtp
        }
        );

        const otp = otpPrompt.data.otp
        alert(otp)

        const otpEntry = await prompt("Enter OTP")

        const otpVerification = await axios.post("https://be-infollion.vercel.app/api/v1/users/verify-otp"
        , {
          username: logInWithOtp, otp: otpEntry
        });
        const msg = otpVerification.data.message;
        alert(msg);
        const tkn = otpVerification.data.token;
        localStorage.setItem("tkn", tkn);
      } catch (err) {
        console.log(err);
        alert("An Error Occured.")
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
