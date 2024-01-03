import React, { useEffect, useRef, useState } from 'react'
import { FaCommentDots } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { createContact } from '../../redux/contactus/contactusthunk';
import { showToast } from '../../services/ToastInstance';
import feedbackImg from "../../images/feedback-removebg-preview.png"
export default function FeedbackModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const loadingFeedback=useSelector((state)=>state.contactus.contactusloading);
    const response=useSelector((state)=>state.contactus.contactus);


    
  
    const dispatch=useDispatch();
    const ref=useRef()
    const sendFeedback = () => {
        // Validate name, email, and feedback
        if (!name || !email || !feedback) {
          // Handle validation error (you can show an alert or set an error state)
          showToast("Please fill in all required fields");
          return;
        }
      
        const data = {
          name,
          email,
          message:feedback,
          priority: 2,
          userId:JSON.parse(localStorage.getItem('params')).userId
        };
      
        dispatch(createContact(data));
       
      };
      useEffect(() => {
        if (response?.success === true) {
          setName('');
          setEmail('');
          setFeedback('');
      
          // Get the elements with the class name 'btn-close'
          ref.current.click()
        }
      }, [response]);
      
  return (
    <div className="modal fade" tabIndex={-1} id="FeedbackModal" aria-labelledby="FeedbackModal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
        <h5 className="modal-title">Share Your Feedback <img src={feedbackImg} alt="Feedback-icon" height={40} width={40} /></h5>

          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={ref}></button>
        </div>
        <div className="modal-body">
  <div className="container">
    <div className="mb-3">
      <label htmlFor="name" className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Enter your name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        className="form-control"
        id="email"
        placeholder="Enter your email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="feedbackTextarea" className="form-label">
        Feedback
      </label>
      <textarea
        className="form-control"
        id="feedbackTextarea"
        placeholder="Enter your feedback"
        rows={6}
        onChange={(e) => {
            if(e.target.value.length<=150)
          setFeedback(e.target.value);
        }}
        value={feedback}
      />
      <small>{feedback.length===150?<b>{feedback.length}</b>:feedback.length}<span>/</span><b>150</b></small>
    </div>
  </div>
</div>
        <div className="modal-footer">
          <button className='btn text-light' style={{backgroundColor:"purple"}} onClick={sendFeedback} disabled={loadingFeedback}>{loadingFeedback?"Sending...":"Send"} </button>
        </div>
      </div>
    </div>
  </div>
 

  )
}
