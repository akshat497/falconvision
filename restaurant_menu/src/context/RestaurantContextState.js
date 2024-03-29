import React, { useEffect, useState } from "react";
import RestaurantContext from "./RestaurantContext";
import { useDispatch, useSelector } from "react-redux";
import { w3cwebsocket as W3CWebSocket, client, w3cwebsocket } from "websocket";
import {  useParams } from "react-router-dom";
import { setorder } from "../redux/orders/getorderSlice";
import { setFetchedItem } from "../redux/items/fetchItemSlice";
import { fetchCategory, fetchItem } from "../redux/items/itemThunk";
import { showToast } from "../services/ToastInstance";

export default function RestaurantContextState(props) {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.login.user);
  
  const allItems = useSelector((state) => state?.fetchitem?.f_item);
  const couponCodes = useSelector((state) => state.getCoupon.getCoupon);
  const [restroDetails] = useState({});
  const [fetcheditems, setFetcheditems] = useState([]);
  const [fetcheditemsCopy, setFetcheditemsCopy] = useState([]);
  const [fetchedCoupens, setfetchedCoupens] = useState([]);
  const [enableSound, setenableSound] = useState(false);
  const [mode, setmode] = useState("light");
  const [expanded, setExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orders, setOrders] = useState([]);
  const [notification, setnotification] = useState([]);
  const [vegOnly, setVegOnly] = useState(false);
  const [nonvegOnly, setnontVegOnly] = useState(false);
  const [filterActive, setFilterActive] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const allorders = useSelector((state) => state.getOrder.order);

  // const isActiveUpdate=useSelector((state)=> state.updateisactiveorder.isActiveOrder)
  const detailRestro = useSelector((state) => state.restrodetail.restro);

  let params = useParams();
  //refreshing order every minute
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Dispatch the fetchOrders action every second
  //     dispatch(fetchOrders(detailRestro?.userId));
  //   }, 10000);

  //   // Clear the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [dispatch, allorders]);

  // useEffect(()=>{
  //   const client = new W3CWebSocket('ws://127.0.0.1:8080');
  //   client.onopen = () => {
  //     ('WebSocket Client Connected');
  //   };
  //   client.onmessage = (message) => {
  //     const dataFromServer = JSON.parse(message.data);
  //     (dataFromServer)
  //     if(dataFromServer.updateType==="order"){
  //       dispatch(fetchOrders(detailRestro?.userId))
  //     }
  //     if(dataFromServer.updateType==="newMenu"){
  //       setFetcheditems(...fetcheditems,dataFromServer.data)
  //     }
  //     // dispatch(fetchItem(detailRestro?.userId))
  //     // dispatch(fetchCategory(detailRestro?.userId))

  //   };
  // },[detailRestro])
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    // Create an Audio element when the component mounts
    const audio = new Audio('notification_1.mp3');
    // Set the audio element in state
    setAudioElement(audio);
  }, []);
  useEffect(() => {
    // Update audio element source whenever notification sound changes
    if (audioElement) {
      audioElement.src = 'notification_1.mp3';
    }
  }, [audioElement]);
  useEffect(() => {
    // Create a WebSocket connection to the user's room
    const userData = JSON.parse(localStorage.getItem("params"));
    const userId = userData?.userId || detailRestro?.userId;
    // const serverAddress = `wss://falconvesionbackend.onrender.com:443/?room=${userId}`;
    // const serverAddress = `ws://127.0.0.1:9090/?room=${userId}`;
    const serverAddress=`wss://api.falcon-vision.in:9090/?room=${userId}`

    const ws = new WebSocket(serverAddress);

    ws.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    ws.onmessage = (message) => {
      // Handle messages received from the server
      const dataFromServer = JSON.parse(message.data);
      
      const { updateType, data } = dataFromServer;
      // setnotification([...notification, updateType]);
      
      
      // Handle different update types
      
      switch (updateType) {
        case "updatedMenu":
          // Handle updated menu data

          dispatch(setFetchedItem(dataFromServer?.data));
          setFetcheditemsCopy([dataFromServer?.data]);

          // dispatch(fetchItem(userData?.userId))
          // Update your component state or perform actions
          break;
        case "updatedCategory":
         
          dispatch(fetchCategory(userData?.userId));
          dispatch(fetchItem(userData?.userId));
          break;
        case "newOrder":
          setOrders([dataFromServer?.data[0], ...orders]);
          setorder(orders);

          break;
        case "newMenu":
          // dispatch(setFetchedItem(dataFromServer?.data));
          setFetcheditems([...fetcheditems, dataFromServer?.data]);
          setFetcheditemsCopy([...fetcheditemsCopy, dataFromServer?.data]);

          // dispatch(setFetchedItem(fetcheditems));
          dispatch(fetchItem(userData?.userId))

          break;
          case "newCategory":
            dispatch(fetchCategory(userData?.userId));
            dispatch(fetchItem(userData?.userId));
          break;
        case "deletedMenu":
          dispatch(fetchItem(detailRestro?.userId));

          break;
        case "userUpdated":
          window.location.reload();
          break;
          case "waiterCall":
          // setnotification(detailRestro)
             setnotification([...notification,data])
               notification.push(data)
              if(localStorage.getItem("enableSound")==='true'){
                audioElement.play()
               
              }
              console.log(notification)
          break;
        case "updatedOrder":
          const userPhone = JSON.parse(localStorage.getItem("userPhone"));

          if (
            dataFromServer?.data?.isAccepted === true &&
            dataFromServer?.data?.isCompleted === false &&
            Number(dataFromServer.data.Customer.phoneNumber) ===
              Number(userPhone)
          ) {
            showToast("Order is accepted", "info");
          }
          if (
            dataFromServer?.data?.isRejected === true &&
            Number(dataFromServer.data.Customer.phoneNumber) ===
              Number(userPhone)
          ) {
            showToast("Order is Rejected");
          }
          if (
            dataFromServer?.data?.isCompleted === true &&
            Number(dataFromServer.data.Customer.phoneNumber) ===
              Number(userPhone)
          ) {
            showToast("Order is completed ", "success");
          }
          break;
        default:
          break;
      }
    };

    ws.onerror = function (error) {};

    // Ensure the WebSocket client is closed when the component unmounts
    return () => {
      ws.close();
    };
  }, [detailRestro, dispatch, setFetcheditems, fetcheditems, orders]);
  //   useEffect(() => {
  //     const userData=JSON.parse(localStorage.getItem('params'))
  //     const serverAddress=`ws://127.0.0.1:9090/?room=${userData.userId}`
  //     const client = new WebSocket(serverAddress);

  //     client.onopen = () => {
  //         ('WebSocket Client Connected');
  //         client.send("hello")
  //     };

  //     client.onmessage = (message) => {
  //       const dataFromServer = JSON.parse(message.data);
  //       (dataFromServer)
  //       const paramsUserId=JSON.parse(localStorage.getItem("params"))
  //       const dataUserId=dataFromServer?.data?.data.map(data=>data.userId)
  //       // Use switch instead of if-else for better readability
  //       switch (dataFromServer?.updateType) {
  //         case "newMenu":
  //           if(dataUserId[0]===paramsUserId?.userId){
  //           setFetcheditems([...allFetchedItems, dataFromServer?.data])
  //           setFetcheditemsCopy([...allFetchedItems, dataFromServer?.data])
  //          dispatch(setFetchedItem(fetcheditems))
  //           }
  //           break;
  //         case "newOrder":

  //           if(dataUserId[0]===paramsUserId?.userId){
  //           setOrders([...orders, dataFromServer?.data[0]]);
  //           setorder(orders);
  //           }
  //           break;
  //         case "updatedMenu":

  //           if(dataUserId[0]===paramsUserId?.userId){
  //             dispatch(setFetchedItem(dataFromServer?.data))
  //             setFetcheditemsCopy([ dataFromServer?.data])
  //           }

  //             // setFetcheditems(dataFromServer?.data)

  //           // Find the index of the item to update in fetcheditems
  //           // (dataFromServer)
  //           // const itemIndex = fetcheditems.findIndex((item) => item.menuItemId === dataFromServer?.data[0].menuItemId);

  //           // if (itemIndex !== -1) {
  //           //   // Create a new array with the updated item
  //           //   const updatedFetchedItems = [...fetcheditems];
  //           //   updatedFetchedItems[itemIndex] = dataFromServer?.data[0];

  //           //   // Update the state with the new array
  //           //   // (updatedFetchedItems)
  //           //   setFetcheditems(updatedFetchedItems);
  //           // }
  //           break;
  //           case "userUpdated":
  //             window.location.reload();
  //              break;
  //         default:
  //           break;
  //       }
  //     };

  //     client.onerror = function (error) {
  //       ('WebSocket Error: ' + error);
  //     };

  //     // Ensure the WebSocket client is closed when the component unmounts
  //     return () => {
  //         client.close();
  //     };
  // }, [detailRestro, dispatch, setFetcheditems,fetcheditems,orders]);

  useEffect(() => {
    setFetcheditems(allItems);
    setFetcheditemsCopy(allItems);
  }, [allItems]);
  useEffect(() => {
    if (couponCodes === null || couponCodes === undefined) {
      setfetchedCoupens([]);
    } else {
      setfetchedCoupens(couponCodes);
    }
  }, [couponCodes]);
  useEffect(() => {
    if (allorders === null || allorders === undefined) {
      setOrders([]);
    } else {
      setOrders(allorders);
    }
  }, [allorders]);

  useEffect(() => {
    setmode("dark");
  }, []);

  return (
    <RestaurantContext.Provider
      value={{
        restroDetails,
        mode,
        fetcheditems,
        setFetcheditems,
        expanded,
        setExpanded,
        isDarkMode,
        setIsDarkMode,
        orders,
        setOrders,
        fetcheditemsCopy,
        setFetcheditemsCopy,
        notification,
        setnotification,
        fetchedCoupens,
        setfetchedCoupens,
        vegOnly, 
        setVegOnly,
        nonvegOnly, 
        setnontVegOnly,
        activeCategoryId,
         setActiveCategoryId,
         filterActive, 
         setFilterActive,
         audioElement,
         enableSound,
          setenableSound
         
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
}
