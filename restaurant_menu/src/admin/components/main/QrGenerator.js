import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { qrGenerator } from '../../../redux/auth/authThunks';
import { FaQrcode } from 'react-icons/fa';
import RestaurantContext from '../../../context/RestaurantContext';
import { useParams } from 'react-router-dom';

export default function QrGenerator() {
  const [tables, setTables] = useState();
  const dispatch = useDispatch();
  const params=useParams();
  const { expanded } = useContext(RestaurantContext);
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const Qrcodes = useSelector((state) => state.qrgenerator.qr);
  const QrcodesLoading = useSelector((state) => state.qrgenerator.qrloading);

  
  const createQr = () => {
    
    const obj = {
      tableCount: tables,
      url:"https://ordermanagementbyfalconvesion.netlify.app/",
      userId: restroDetails?.userId,
    };
    dispatch(qrGenerator(obj));
  };

  const printQR = () => {
    const qrCodesContainer = document.getElementById("qrCodesContainer");
    if (qrCodesContainer) {
      const printWindow = window.open('', '', 'width=600,height=600');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Codes</title>
          </head>
          <body>
            <div id="" class="container">
              ${Qrcodes.map((data, index) => `
                <div class="  my-5">
                <h3 class="text-center mb-4">Table No :${index + 1}</h3>
                  <img src="${data}" alt="QR Code" class="img-fluid" />
                </div>
              `).join('')}
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className={expanded ? "dashboard" : "dashboardcollapsed"}>
    <div className="container qr-generator">
      <h2 className="text-center mt-3 mb-4">QR Code Generator</h2>
  
      <div className="input-group mb-3"   style={{width:"60%",marginLeft:"20%"}}>
        <input
          type="number"
          className="form-control"
          placeholder="Number of tables"
          value={tables}
          style={{width:"60%",margin:"2%"}}
          onChange={(e) => setTables(e.target.value)}
        />
        <div className="input-group-append"  style={{width:"60%",margin:"2%"}}>
          <button className="btn btn-primary mx-2" onClick={createQr} disabled={QrcodesLoading} style={{backgroundColor:"purple"}}>
            {QrcodesLoading ? "Generating..." : "Generate QR"}
          </button>
          <button className="btn btn-secondary ml-2" onClick={printQR} disabled={QrcodesLoading||Qrcodes===null||Qrcodes===0}>
            Print QR Codes
          </button>
        </div>
      </div>
  
      <div id="qrCodesContainer" className="generated-qrs my-2">
{QrcodesLoading ? (
  <div className="loader-container">
  <div className="qr-code">
  <img src="/Animation - 1699272201529.gif" alt="qr" />

</div>



    <p className="loading-text">Generating QR Code</p>
    <p className="loading-details">Please wait while we generate your QR code.</p>
  </div>
) : (
  Qrcodes?.map((data, index) => (
   <> 
    <div key={index} className="qr-code mx-5 my-5">
    
      <img src={data} alt="QR Code" className="img-fluid" title={"table number "+Number(index+1)}/>
    </div></>
  ))
)}
</div>
    </div>
  </div>
  
  );
}