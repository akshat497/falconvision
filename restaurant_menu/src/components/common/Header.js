import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantContext from "../../context/RestaurantContext";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaSearch,
  FaFilter,
  FaEarlybirds,

  FaTimes,
  FaRegDotCircle,
 
} from "react-icons/fa";
import FilterModal from "../main/FilterModal";
export default function Header({ id }) {
  // const{fetcheditems}=useContext(RestaurantContext);
  const [searchInput, setsearchInput] = useState("");
  const [sortOrder, setsortOrder] = useState("");
  const [categoryName, setcategoryName] = useState(false);

  // const [allItemaCopy, setallItemaCopy] = useState([]);
  // const dispatch=useDispatch()
  // const allItems = useSelector((state) => state.fetchitem.f_item);
  const category = useSelector((state) => state.fetchcategory.fetchedcategory);
  const Name = useSelector((state) => state.fetchitem.Name);

  const { fetcheditems, setFetcheditems,fetcheditemsCopy, setFetcheditemsCopy,nonvegOnly, setnontVegOnly,vegOnly,setVegOnly,activeCategoryId, setActiveCategoryId } = useContext(RestaurantContext);

 
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
 

 
  // const [allItems, setallItems] = useState([]);
  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
// useEffect(()=>{
//   setallItems(fetcheditems)
// },[fetcheditems])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos])
  const handleSearch = (e) => {
    setsearchInput(e.target.value);
    // (allItems);
  };
  // useEffect(()=>{
  //   setallItemaCopy(allItems)
  // },[])
  // useEffect(()=>{
  //   setallItemaCopy(allItems)
  // },[allItems]);
  const filterItems = (items, searchInput) => {
    return items?.filter((item) => {
      const isMatch = deepSearch(item, searchInput?.toLowerCase());
  
      // Check if the item is veg and the search input is 'veg'
      const isVegMatch = item.veg===true && searchInput.toLowerCase() === 'veg';
      const isNonVegMatch = item.Veg===false && searchInput.toLowerCase() === 'nonveg';

      return isMatch || isVegMatch || isNonVegMatch;
     
    });
  };
  
  const deepSearch = (obj, searchText) => {
    if (!obj || typeof obj !== 'object') {
      return false;
    }
  
    const values = Object.values(obj);
  
    for (const value of values) {
      if (typeof value === 'object') {
        if (deepSearch(value, searchText)) {
          return true;
        }
      } else {
        const stringValue = value?.toString().toLowerCase();
        if (stringValue && stringValue.includes(searchText)) {
          return true;
        }
      }
    }
  
    return false;
  };
  
  
useEffect(() => {
  const filteredData = filterItems(fetcheditems, searchInput);
  setVegOnly(null)
  setnontVegOnly(null)

  setFetcheditemsCopy(filteredData);

  if (searchInput.trim() === '') {
    setFetcheditemsCopy(fetcheditems); // Reset to original data
  }
}, [searchInput, fetcheditems]);
  
  
  

  const handleFilter = (categoryId) => {
    
    setActiveCategoryId(categoryId);
    const filterData = fetcheditems?.filter((data) => {
      return data?.Category?.categoryId?.includes(categoryId);
    });

    setFetcheditemsCopy(filterData);
    setcategoryName(true);
  };

  const sort = () => {
    if (categoryName) {
      const sortedData = [...fetcheditems]?.sort((a, b) => {
        const priceA = Number(a?.price);
        const priceB = Number(b?.price);

        if (sortOrder === "" || sortOrder === "ace") {
          setsortOrder("dec");
          return priceA - priceB;
        } else {
          setsortOrder("ace");
          return priceB - priceA;
        }
      });
      setFetcheditemsCopy(sortedData);
    } else {
      const sortedData = [...fetcheditems]?.sort((a, b) => {
        const priceA = Number(a?.price);
        const priceB = Number(b?.price);

        if (sortOrder === "" || sortOrder === "ace") {
          setsortOrder("dec");
          return priceA - priceB;
        } else {
          setsortOrder("ace");
          return priceB - priceA;
        }
      });
      setFetcheditemsCopy(sortedData);
    }
  };
  const handleAllClick = () => {
    setFetcheditemsCopy(fetcheditems);
    setActiveCategoryId(null); // Set activeCategoryId to null to deactivate all buttons
    // Add your logic for when "All" is clicked
  };
  // useEffect(()=>{
  //   dispatch(setFetchedItem(allItemaCopy))
  // },[allItemaCopy])
  // (id)
  
  return (
    <>
   
 
  
 <div  className="sticky-top" style={{backgroundColor:"white"}}>
 <div className="d-flex " style={{justifyContent:"space-between",backgroundColor:"whiteSmoke",padding:"10px"}}>
      <div className="">
      <Link to='/' className="navbar-brand  ">
  <div style={{ justifyContent: "right", textAlign: "right", alignContent: "right" }}>
  <div>
    <span className="fw-bold">{Name}</span>
  </div>
  <div className="ms-auto" style={{ fontSize: "8px", textAlign: "right", backgroundColor: "whiteSmoke", color: "", width: "6 0%" }}>
    Powered by falcon-vision<FaEarlybirds size={12}/>
  </div>
</div>

</Link>
  
       
          
        
      </div>
      <div className="d-flex">
            <div className="input-group" >
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
                value={searchInput}
                style={{ borderRight: "none" ,height:"35px"}}
              />
              <div className="mt-1">
                {!searchInput.length > 0 ? (
                  <div className="btn text-light" style={{ backgroundColor: "purple", borderLeft: "none" }}>
                    <FaSearch  />
                  </div>
                ) : (
                  <div
                    className="btn text-light"
                    style={{ backgroundColor: "purple", borderLeft: "none" }}
                    onClick={() => {
                      setsearchInput("");
                    }}
                  >
                    <FaTimes />
                  </div>
                )}
              </div>
            </div>
          </div>
    </div>
    <div className="card-container d-flex mt-2">
      <div
        className={`mx-1 ${activeCategoryId === null ? 'btn-active' : ''}`}
        style={{
          maxHeight: "100px",
          
          cursor: "pointer",
          border: "1px solid #ccc",
          padding: "8px",
          borderRadius: "10px",
        }}
        onClick={handleAllClick}
      >
        <span className="text-dark mt-5 mx-1">All</span>
      </div>
      {category?.map((categoryItem, index) => (
        <div
          key={categoryItem?.categoryId}
          className={`mx-1 ${activeCategoryId === categoryItem.categoryId ? 'btn-active' : ''}`}
          style={{
            maxHeight: "100px",
           
            cursor: "pointer",
            border: "1px solid #ccc",
            padding: "8px",
            borderRadius: "10px",
          }}
          
          id={categoryItem.categoryId}
        >
          {categoryItem?.isActive===true?<span className="text-dark mt-5" onClick={() => handleFilter(categoryItem.categoryId)}>{categoryItem.name}</span>:<span className="text-dark mt-5" style={{cursor:"not-allowed",opacity:"0.5"}}>{categoryItem.name}</span>}
        </div>
      ))}
     
    </div>
 

    <div
        className="d-flex  mt-4 p-2"
        style={{ justifyContent: "space-between" }}
      >
        <div className="d-flex">
          {nonvegOnly === true ? (
            <>
              <div
                className="d-flex btn mr-2"
                style={{
                  maxHeight: "100px",
                  cursor: "not-allowed",
                  border: "1px solid #ccc",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "30px",
                  opacity: "0.5",
                }}
              >
                <div>
                  <FaRegDotCircle className="text-success mx-1" size={20} />
                </div>
                <div>veg</div>
              </div>
            </>
          ) : (
            <>
              <div
                className="d-flex btn mr-2"
                style={{
                  maxHeight: "100px",
                  cursor: nonvegOnly===true?"not-allowed":"pointer",
                  border: "1px solid #ccc",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "30px",
                  backgroundColor: vegOnly === true ? "#fff" : "",
                  color: vegOnly === true ? "green" : "",
                  boxShadow: vegOnly === true ? "2px 2px 1px 1px green" : "",
                  
                }}
                onClick={() => setVegOnly(vegOnly === false ? true : false)}
              >
                <div>
                  <FaRegDotCircle className="text-success mx-1" size={20} />
                </div>
                <div>veg</div>
              </div>
            </>
          )}
          {vegOnly === true ? (
            <>
              <div
                className="d-flex btn"
                style={{
                  maxHeight: "100px",
                  cursor: "not-allowed",
                  border: "1px solid #ccc",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "30px",
                  opacity: "0.5",
                }}
              >
                <div>
                  <FaRegDotCircle className="text-danger mx-1" size={20} />
                </div>
                <div>non veg</div>
              </div>
            </>
          ) : (
            <>
              <div
                className="d-flex btn"
                style={{
                  maxHeight: "100px",
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  padding: "5px 10px 5px 10px",
                  borderRadius: "30px",
                  backgroundColor: nonvegOnly === true ? "#fff" : "",
                  color: nonvegOnly === true ? "red" : "",
                  boxShadow: nonvegOnly === true ? "2px 2px 1px 1px red" : "",
                }}
                onClick={() =>
                  setnontVegOnly(nonvegOnly === true ? false : true)
                }
              >
                <div>
                  <FaRegDotCircle className="text-danger mx-1" size={20} />
                </div>
                <div>non veg</div>
              </div>
            </>
          )}
        </div>
        <div className="d-flex ">
          <div
            className="mx-2"
            style={{
              maxHeight: "100px",
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "5px 10px 5px 10px",
              borderRadius: "30px",
            
            }}
            data-bs-toggle="modal"
              data-bs-target="#exampleModal"
          >
            <FaFilter
              size={20}
              style={{ color: "purple" }}
            
            />
            Filter
          </div>
          <div
            style={{
              maxHeight: "100px",
              cursor: "pointer",
              border: "1px solid #ccc",
              padding: "5px 10px 5px 10px",
              borderRadius: "30px",
            
            }}
            onClick={()=>{sort()}}
          >
           {sortOrder === "" ? (
            <FaSort size={20} style={{ color: "purple" }} />
            ) : sortOrder === "ace" ? (
              <FaSortDown  size={20} style={{ color: "purple" }}/>
            ) : (
              <FaSortUp  size={20} style={{ color: "purple" }} />
            )}
            
            Sort
          </div>
        </div>
      </div>
 </div>
    
     
    </>
  );
}
