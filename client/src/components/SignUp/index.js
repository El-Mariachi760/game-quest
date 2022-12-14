import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import auth from '../../utils/auth';


export default function SignUp() {

    const [formState, setFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
        ...formState,
        [name]: value,
        });
    };

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const { data } = await addUser({
                variables: { ...formState }
            });

            auth.login(data.addUser.token)
        } catch (e) {
            console.error(e);
        }

        // clear form values
        setFormState({
            username: '',
            email: '',
            password: '',
        });
    };



return (
<div className="signup-form">
    <div>
        <h2>User Registration</h2>
    </div>

    <form>
        {/* Labels and inputs for form data */}
        <div>
        <input name="username" onChange={handleChange} className="input" 
        value={formState.username} type="text" placeholder="Username"/>
        </div>
        <div>
        <input name="email" onChange={handleChange} className="input"
        value={formState.email} type="email" placeholder="Email" />
        </div>

        <div>
        <input name="password" onChange={handleChange} className="input"
        value={formState.password} type="password" placeholder="Password"/>
        </div>
        <div className='button-container'>
            <button onClick={handleSubmit} className="signup-btn" type="submit">
            Submit
            </button>
        </div>
    </form>
</div>
);
}