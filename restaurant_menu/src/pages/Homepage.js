import React, { useEffect, useState } from "react";
import Card from "../components/main/Card";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchItem } from "../redux/items/itemThunk";
import RestaurantContext from "../context/RestaurantContext";
import { useContext } from "react";
import NoDatComponent from "../components/common/NoDatComponent";

export default function Homepage() {
  const navigate=useNavigate()
  const [vegOnly, setVegOnly] = useState(false);
  const [nonvegOnly, setnontVegOnly] = useState(false);
  const fetchLoading = useSelector((state) => state.fetchitem.f_itemloading);
  const fetchdItem = useSelector((state) => state.fetchitem.f_item);
  const { fetcheditemsCopy, } =
  useContext(RestaurantContext);
  let params = useParams();
  let dispatch = useDispatch();
  localStorage.setItem("params", JSON.stringify(params));
  useEffect(() => {
    dispatch(fetchItem(params?.userId));
    dispatch(fetchCategory(params?.userId));
  }, [params.userId]);

  useEffect(()=>{
    if(fetchdItem!==null){
      navigate('/customer')
    }
  },[fetchdItem])
  const userid = JSON.stringify(params?.userId);
 
  return (
    <>
      {fetchLoading ? <div className="overlay"></div> : null}
      <Header id={userid} />
      {fetcheditemsCopy?.length===0?(<NoDatComponent/>):(
        <>
        <div className="d-flex justify-content-between margin">
        <ReactSwitch
          checked={vegOnly}
          onChange={() => setVegOnly(!vegOnly)}
          className="veg-switch"
          value={"veg"}
          disabled={nonvegOnly}
          id="veg-switch"
          offColor="#90EE90"
        />

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

      <Card id={params.userId} veg={vegOnly} nonVeg={nonvegOnly} />

     
        </>
      )}
      
    </>
  );
}
