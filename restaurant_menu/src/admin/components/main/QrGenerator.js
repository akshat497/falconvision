import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { qrGenerator } from "../../../redux/auth/authThunks";
import { FaEarlybirds, FaQrcode } from "react-icons/fa";
import RestaurantContext from "../../../context/RestaurantContext";
import { useParams } from "react-router-dom";
import qrimage from "../../../images/qr-code-concept-illustration_114360-5933.jpg"
export default function QrGenerator() {
  // const [tables, setTables] = useState("");
  const [startNumber, setStartNumber] = useState("");
  const [endNumber, setEndNumber] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { expanded } = useContext(RestaurantContext);
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const Qrcodes = useSelector((state) => state.qrgenerator.qr);
  const QrcodesLoading = useSelector((state) => state.qrgenerator.qrloading);

  const createQr = () => {
    const obj = {
      start:startNumber,
      end:endNumber,
      // url:"https://ordermanagementbyfalconvesion.netlify.app/",
      URL: window.location.origin,
      userId: restroDetails?.userId,
    };
    dispatch(qrGenerator(obj));
  };

  const printQR = () => {
    const qrCodesContainer = document.getElementById("qrCodesContainer");
    if (qrCodesContainer) {
      const printWindow = window.open("", "", "width=600,height=600");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Codes</title>
          </head>
          <body>
            <div id="" class="container">
              ${Qrcodes.map(
                (data, index) => `
                <div class="  my-5">
                <h3 class="text-center mb-4">Table No :${index + 1}</h3>
                  <img src="${data}" alt="QR Code" class="img-fluid" />
                </div>
              `
              ).join("")}
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

        <div className="input-group mb-3">
  {/* First Dropdown */}
  <select
    className="form-control"
    style={{ width: "30%", margin: "2%" }}
    value={startNumber}
    onChange={(e) => setStartNumber(e.target.value)}
  >
    <option value="" disabled>Start table/room number</option>
    {Array.from({ length: 1000 }, (_, index) => (
      <option key={index} value={index + 1}>
        {index + 1}
      </option>
    ))}
  </select>

  {/* Second Dropdown */}
  <select
   className="form-control"
    style={{ width: "30%", margin: "2%" }}
    value={endNumber}
    onChange={(e) => setEndNumber(e.target.value)}
  >
    <option value="" disabled>End table/room number </option>
    {Array.from({ length: 1000 }, (_, index) => (
      <option key={index} value={index + 1} >
        {index + 1}
      </option>
    ))}
  </select>
</div>


        <div id="qrCodesContainer" className="generated-qrs ">
          {Qrcodes?.length === 0 || Qrcodes === null ? (
            <img
              src={qrimage}
              alt="qr_image"
              height={300}
              width={300}
            />
          ) : (
            <>
              {QrcodesLoading === true ? (
                <div className="loader-container">
                  <div className="qr-code">
                    <img src="/Animation - 1699272201529.gif" alt="qr" />
                  </div>

                  <p className="loading-text">Generating QR Code</p>
                  <p className="loading-details">
                    Please wait while we generate your QR code.
                  </p>
                </div>
              ) : (
                Qrcodes?.map((data, index) => (
                  <>
                    <div key={index} className="qr-code mx-5 my-5">
                      <img
                        src={data}
                        alt="QR Code"
                        className="img-fluid"
                        title={`table number ${Number(startNumber) + Number(index)}`}

                      />
                    </div>
                  </>
                ))
              )}
            </>
          )}
        </div>

        <div className="qr-footer">
          <div>
            <button
              className="btn text-light mx-2"
              onClick={createQr}
              disabled={
                QrcodesLoading || (startNumber.length===0&&endNumber?.length === 0 )|| (startNumber&&endNumber === null)||(startNumber.trim===""&&endNumber.trim()==="")
              }
              style={{ backgroundColor: "purple" }}
            >
              {QrcodesLoading ? "Generating..." : "Generate QR"}
            </button>
          </div>
          <div>
            <button
              className="btn btn-secondary ml-2"
              onClick={printQR}
              disabled={QrcodesLoading || Qrcodes === null || Qrcodes === 0}
            >
              Print QR Codes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
