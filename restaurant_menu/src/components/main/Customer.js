import React, { useContext, useEffect, useState } from "react";
import Card from "../../components/main/Card";
import Header from "../../components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory, fetchItem } from "../../redux/items/itemThunk";
import RestaurantContext from "../../context/RestaurantContext";

export default function Customer() {
  // let params = useParams();
  let dispatch = useDispatch();
  const { fetcheditemsCopy } = useContext(RestaurantContext);
  const [vegOnly, setVegOnly] = useState(false);
  const [nonvegOnly, setnontVegOnly] = useState(false);
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

      {/* <footer style={{textAlign: 'center', background: '#333', color: '#fff'}}>
  Powered by FalconVision <FaEarlybirds size={32}/>
</footer> */}
    </>
  );
}
