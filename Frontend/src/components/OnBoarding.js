import React,{useState} from "react";
import Header from "./Header";
import UserType from "../UserType";
import StatusType from "../StatusType";
import GenderType from "../GenderType";
import { v4 as uuidv4 } from 'uuid';

const OnBoarding = () => {

    // User Details
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState(GenderType.MALE);
    const [mobile_number, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [user_email, setUserEmail] = useState('admin@gmail.com');
    const [type, setType] = useState(UserType.USER);
    const [status, setStatus] = useState(StatusType.ONBOARD);
    const [password, setPassword] = useState('');
    const [id,setID] = useState(uuidv4());
    const [basic_info,setBasic] = useState({id,first_name,last_name,dob,gender});
    const [contact_info,setContact] = useState({mobile_number,email});
    const [auth_info,setAuth] = useState({password});
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            setID(uuidv4());
            setBasic({id,first_name,last_name,dob,gender});
            setContact({mobile_number,email});
            setAuth({password: password});
            const response = await fetch('/api/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_email: user_email,
                    type: type,
                    status:status,
                    basic_info: {
                        id: id,
                        first_name:first_name,
                        last_name:last_name,
                        dob:dob,
                        gender:gender
                    },
                    contact_info:{
                        mobile_number:mobile_number,
                        email:email
                    },
                    auth_info:{
                        password:password
                    }
                })
            });
            const data = await response.json();
            console.log('User added successfully:', data);
            // Clear form inputs after successful submission
            setFirstName('');
            setLastName('');
            setDob('');
            setGender('male');
            setPhoneNumber('');
            setEmail('');
        } catch (error) {
            console.error('Error adding user:', error);
            setError('Failed to add user');
        }
    };

  return(
      <div>
          <Header/>
          <div className="onboarding-container">
              <h1 className="onboarding-h">User Onboarding</h1>
              <p className="onboarding-h">lorem ipsum dolor sit amet consectetur. </p>
              <form onSubmit={handleSubmit}>
                  <div className="outer-container">
                      <h3 className="onboarding-h">Basic Details</h3>
                      <div className="onboarding-inner-container">
                          <input type="text" className="onboarding-text-box" placeholder="First Name" value={first_name} onChange={e=>setFirstName(e.target.value)}/>
                          <input type="text" className="onboarding-text-box" placeholder="Last Name" value={last_name} onChange={e=>setLastName(e.target.value)}/>
                          <input type="date" className="onboarding-text-box" placeholder="Birth of Date" value={dob} onChange={e=>setDob(e.target.value)}/>
                      </div>
                      <div className="onboarding-inner-container">
                          <select className="onboarding-text-box"  value={gender} onChange={e=>setGender(e.target.value)}>
                              <option value={GenderType.MALE}>MALE</option>
                              <option value={GenderType.FEMALE}>FEMALE</option>
                          </select>
                          <div/>
                          <div/>
                      </div>
                      <h3 className="onboarding-h">Contact Details</h3>
                      <div className="onboarding-inner-container">
                          <input type="tel" className="onboarding-text-box" placeholder="Phone Number"  value={mobile_number} onChange={e=>setPhoneNumber(e.target.value.substring(0,10))}/>
                          <input type="email" className="onboarding-text-box" placeholder="Email"  value={email} onChange={e=>setEmail(e.target.value)}/>
                          <div/>
                      </div>
                  </div>
                  <div className="button-container">
                      <div/>
                      <button type="reset" className="onboarding-inactive-button">Clear</button>
                      <button type="submit" className="onboarding-active-button">Save</button>
                  </div>
              </form>
          </div>
          {error && <p className="error-message">{error}</p>}
      </div>
  );
}

export default OnBoarding;