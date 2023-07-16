# User Authentication via Username & Password or OTP

## Regular Login :-
- takes Username and Password as Input.
- sends them to an API using `axios` `post` request method for authentication.
- returns 'Login Successful' for a match.

## OTP Login :-
- prompts user for username.
- sends username to another API for OTP generation.
- `Alerts` the user to the OTP.
- prompts user for OTP.
- send it to another API for verification.
- returns 'Login Succesful' for a match.
