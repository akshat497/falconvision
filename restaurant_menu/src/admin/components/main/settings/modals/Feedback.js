import React from 'react';
import { Button } from 'react-bootstrap';
import { FaPen, FaPenNib } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createContact } from '../../../../../redux/contactus/contactusthunk';

export default function Feedback() {
    const dispatch=useDispatch();
    const restroDetais=useSelector((state)=>state.restrodetail.restro)
    const [feedback,setFeedback]=React.useState("");

    const sendFeedback=()=>{
        if(feedback.length<10){
           return toast.warn("Feedback should me more than 5 words",{
                autoClose:false,
                closeOnClick:true,
                closeButton:false,
            })
        }
        const feedbackObj={
            name:restroDetais.name,
            email:restroDetais.email,
            message:feedback,
            priority:true
        }
        dispatch(createContact(feedbackObj))
        
    }
  return (
    <div className="modal fade" tabIndex={-1} id="Feedback" aria-labelledby="Feedback" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Feedback form <FaPen/></h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div className='container'>
          <span></span>
             <textarea className="form-control" 
             placeholder={`Write your feedback here ` }
             rows={6}
                onChange={(e)=>{setFeedback(e.target.value)}}
                value={feedback}
             />
          </div>
          </div>
          <div className="modal-footer">
            <button className='btn text-light' style={{backgroundColor:"purple"}} onClick={sendFeedback}> Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
