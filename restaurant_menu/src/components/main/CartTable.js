import React from 'react';
// import CartItem from './CartItem';
import { FaShoppingCart } from 'react-icons/fa';

const CartTable = ({ cartItems, removeItem, updateQuantity }) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <div className="cart-header">
        <h2>
          <FaShoppingCart />
          Shopping Cart
        </h2>
      </div>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            {/* <CartItem
              key={item.id}
              item={item}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            /> */}
          ))
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          <button className="checkout-button">Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartTable;

// import React, { useContext, useEffect, useState } from 'react'
// import DataTable from 'react-data-table-component';
// import RestaurantContext from '../../context/RestaurantContext';
// import Header from '../common/Header';
// export default function CartTable() {
//     const{setcartItems,cartItems}=useContext(RestaurantContext);
//     const [cartData, setCartData] = useState([]);
//       useEffect(()=>{
//         setCartData(cartItems)
//       },[cartItems])
//     const columns = [
//         {
//           name: 'Item Name',
//           selector: 'name',
//           sortable: true,
//         },
//         {
//           name: 'Price',
//           selector: 'price',
//           sortable: true,
//           right: true,
//         },
//         {
//           name: 'Quantity',
//           selector: 'quantity',
//           sortable: true,
//           right: true,
//         },
//         {
//           name: 'Total',
//           cell: (row) => row.price * row.quantity,
//           sortable: true,
//           right: true,
//         },
//       ];
//   return (
//     <>
    
//     <DataTable
//         columns={columns}
//         data={cartData}
//         pagination
//         paginationPerPage={5}
//         paginationRowsPerPageOptions={[5, 10, 20,30]}
//         highlightOnHover
        
//       />
//     </>
//   )
// }
