import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import InputField from './InputField';
import * as gtag from '../../lib/gtag';
import useForm from '../../hooks/useForm';

const StyledContactForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 500rem;
width: 100%;

.react-reveal {
width: 100%;
}

.error-label {
font-size: 12rem;
color: #c20000;
text-align: left;
width: 100%;
font-weight: bold;
}

textarea{
    height: 150rem;
    border: 1px solid #424242;
    resize: none;
    padding: 10rem;
    width: 100%;
    outline: none;
    font-size: 16rem;
    background: rgba(255, 255, 255, 0.1);
    
    &::placeholder{
    font-size: 12px;
    }
    &:focus,
    &.not-empty{
         border: 2px solid #5fa8d3;
    }
    
    &.error{
         border: 2px solid #ff0000;
    }
}

`;

const TextAreaTitle = styled.div`
text-align: left;
width:100%;
margin-top: 20rem;
transition: all 0.3s ease;
font-family: Roboto, sans-serif;
color: #898989;
height: 26rem;

&.focus,
&.not-empty{
color: #5fa8d3;
padding-bottom: 5px;
font-size: 14rem;
}

&.error {
color: #ff0000;
padding-bottom: 5px;
font-size: 14rem;
}
`;

const SubmitButton = styled.button`
   position: relative;
   display: flex;
   justify-content: space-between;
   align-items: center;
   max-width: 300px;
   padding: 10px 20px;
   color: #bd0038;
   font-size: 24px;
   text-align: center;
   text-decoration: none;
   border: 2px solid #000000;
   border-radius: 10px;
   overflow: hidden;
   transition: all 150ms ease-in-out;
   z-index: 1;
   background: white;
   cursor: pointer;
   outline: none;
   margin: 20rem auto;
   
   &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(189,0,56,0.7);
      z-index: -1;
      transform: scaleX(0);
      transition: transform 150ms ease-in-out;
   }
   
   &:hover {
      color: white;
      border-color: rgba(189,0,56,0.7);
      box-shadow: 0 0 16px rgba(255, 255, 255, 0.1);
      
      &:after {
         transform: scaleX(1);
         transform-origin: 50% 50%;
         transition: transform 150ms ease-in-out;
      }
   }
   
`;

const ContactFormContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

.lottie-container {
max-width: 400px;
width: 100%;
padding: 0 20rem;
}

@media only screen and (max-width: 1024px) {
flex-direction: column;

.lottie-container {
margin: 30rem 0;
padding: 0;
}

}
`;

const ResponseText = styled.div`
color: ${({ success }) => (success ? '#1a861a' : '#ff0000')};
font-size: 24rem;
text-align: center;
font-weight: bold;
`;

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.name) {
    errors.name = 'Name is required';
  }

  if (!values.message) {
    errors.message = 'Message is required';
  }
  return errors;
}

const ContactForm = () => {
  const [status, setStatus] = useState('idle');
  const onSubmit = async (values) => {
    if (status === 'loading') {
      return;
    }
    setStatus('loading');

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    if (response.status === 200) {
      gtag.event({
        action: 'submit_form_success',
        category: 'Contact',
        label: values,
      });
      setStatus('success');
    } else {
      alert('Message failed to send, please try again');
      gtag.event({
        action: 'submit_form_fail',
        category: 'Contact',
        label: values,
      });
      console.log('serverError');
      setStatus('error');
    }
  };
  const {
    values, errors, handleChange, handleSubmit,
  } = useForm(onSubmit, validate);
  const [textAreaFocused, setTextAreaFocused] = useState(false);

  return (
    <ContactFormContainer>
      <StyledContactForm onSubmit={handleSubmit}>
        <Fade bottom delay={200}>
          <InputField
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={values.name}
            error={!!errors.name}
          />
        </Fade>
        <Fade bottom when={!!errors.name}>
          <span className="error-label">{errors.name || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={400}>
          <InputField
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            error={!!errors.email}
          />
        </Fade>
        <Fade bottom when={!!errors.email}>
          <span className="error-label">{errors.email || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={600}>
          <TextAreaTitle className={`${values.message ? 'not-empty' : ''} ${errors.message ? 'error' : ''} ${textAreaFocused ? 'focus' : ''}`}> Message </TextAreaTitle>
          <textarea
            name="message"
            placeholder="Your Message..."
            maxLength="550"
            value={values.message || ''}
            onChange={handleChange}
            className={`${values.message ? 'not-empty' : ''} ${errors.message ? 'error' : ''}`}
            onFocus={() => setTextAreaFocused(true)}
            onBlur={() => setTextAreaFocused(false)}
          />
        </Fade>
        <Fade bottom when={!!errors.message}>
          <span className="error-label">{errors.message || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={700}>
          <SubmitButton type="submit">
            Submit
            {' '}
            {status === 'loading' && <FaSpinner className="fa-spin" size="26rem" style={{ marginLeft: '10rem' }} />}
          </SubmitButton>
        </Fade>
        <Fade when={status !== 'idle'} bottom>
          <>
            {status === 'success' && <ResponseText success> Message sent, thank you </ResponseText>}
            {status === 'error' && <ResponseText> Message failed to send, please try again </ResponseText>}
          </>
        </Fade>
      </StyledContactForm>
      <Slide right delay={400}>
        <div style={{ maxWidth: 400 }}>
          <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_WdTEui.json" background="transparent" speed="1" loop autoplay />
        </div>
      </Slide>
    </ContactFormContainer>
  );
};

export default ContactForm;
