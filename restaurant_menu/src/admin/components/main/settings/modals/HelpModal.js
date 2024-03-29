import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export default function HelpModal() {
  return (
    <div className="modal fade" tabIndex={-1} id="helpmodal" aria-labelledby="helpmodal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Contact Support</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span className="contact-label"> Phone: </span>
                <b className="contact-value">+91 81686-41371</b>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span className="contact-label"> Email: </span>
                <b className="contact-value">support@falcon-vision.online</b>
              </div>
            </div>
          </div>
          <div className="modal-footer">
           
          </div>
        </div>
      </div>
    </div>
  );
}
