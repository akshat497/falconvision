import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/main/Card";
import Header from "../../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchItem } from "../../redux/items/itemThunk";
import RestaurantContext from "../../context/RestaurantContext";
import { FaRegDotCircle } from "react-icons/fa";

export default function Customer() {
  // let params = useParams();
  let dispatch = useDispatch();
  const { fetcheditemsCopy ,nonvegOnly, setnontVegOnly,vegOnly,setVegOnly,} = useContext(RestaurantContext);
  
  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  const fetchdItem = useSelector((state) => state.fetchitem.f_item);

  const params = JSON.parse(localStorage.getItem("params"));
  useEffect(() => {
    if (fetchdItem === null) {
      dispatch(fetchItem(params.userId));
      dispatch(fetchCategory(params.userId));
    }
  }, [fetchdItem]);

  return (
    <>
      {fetchLoading ? <div className="overlay"></div> : null}
      <Header />
      {/* <div className="d-flex justify-content-between margin ">
  <div className="d-flex ">
        <ReactSwitch
          checked={vegOnly}
          onChange={() => setVegOnly(!vegOnly)}
          className="veg-switch"
          value={"veg"}
          disabled={nonvegOnly}
          id="veg-switch"
          offColor="#90EE90"
        />
        <div><span className="switch-label mt-1 mx-1"><b>VEG</b> </span></div>
 </div>
 
 <div className="d-flex ">
 <div><span className="switch-label mt-1 mx-1"><b>NON-VEG</b> </span></div>
        <ReactSwitch
          checked={nonvegOnly}
          onChange={() => setnontVegOnly(!nonvegOnly)}
          className="Nonveg-switch"
          value={"Nonveg"}
          disabled={vegOnly}
          id="nonveg-switch"
          onColor="#FF0000" // Set the color when the switch is on (purple)
          offColor="#ffcccb"
        />
      </div>
  </div> */}
      <div className="d-flex  mt-4 p-2">
        {nonvegOnly===true
        ?
        <>
        <div
          className="d-flex btn mr-2"
          style={{
            maxHeight: "100px",
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "5px 10px 5px 10px",
            borderRadius: "30px",
            opacity:"0.5"
          }}
         
          
        >
          <div>
            <FaRegDotCircle className="text-success mx-1" size={20} />
          </div>
          <div> 
          veg
          </div>
        </div>
        </>
        :
        <>
        <div
          className="d-flex btn mr-2"
          style={{
            maxHeight: "100px",
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "5px 10px 5px 10px",
            borderRadius: "30px",
            backgroundColor:vegOnly===true?"#fff":"",
            color:vegOnly===true?"green":"",
            boxShadow:vegOnly===true?"2px 2px 1px 1px green":""
          }}
          onClick={() => setVegOnly(vegOnly === false ? true : false)}
          
        >
          <div>
            <FaRegDotCircle className="text-success mx-1" size={20} />
          </div>
          <div> 
          veg
          </div>
        </div>
        </>}
        {
          vegOnly===true
          ?<>
          <div
          className="d-flex btn"
          style={{
            maxHeight: "100px",
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "5px 10px 5px 10px",
            borderRadius: "30px",
            opacity:"0.5",
           
          }}
          
        >
          <div>
            <FaRegDotCircle className="text-danger mx-1" size={20} />
          </div>
          <div>non veg</div>
        </div>
          </>
          :
          <>
          <div
          className="d-flex btn"
          style={{
            maxHeight: "100px",
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "5px 10px 5px 10px",
            borderRadius: "30px",
            backgroundColor:nonvegOnly===true?"#fff":"",
            color:nonvegOnly===true?"red":"",
            boxShadow:nonvegOnly===true?"2px 2px 1px 1px red":""
          }}
          onClick={() => setnontVegOnly(nonvegOnly === true ? false : true)}
        >
          <div>
            <FaRegDotCircle className="text-danger mx-1" size={20} />
          </div>
          <div>non veg</div>
        </div>
          </>
        }
      </div>

      <Card id={params.userId} veg={vegOnly} nonVeg={nonvegOnly} />

      {/* <footer style={{textAlign: 'center', background: '#333', color: '#fff'}}>
  Powered by FalconVision <FaEarlybirds size={32}/>
</footer> */}
    </>
  );
}
