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

export default function Header({ id }) {
  // const{fetcheditems}=useContext(RestaurantContext);
  const originalItems = useSelector((state) => state.fetchitem.f_item);
  const [searchInput, setsearchInput] = useState("");
  const [sortOrder, setsortOrder] = useState("asc");
  const [categoryName, setcategoryName] = useState(false);

  // const [allItemaCopy, setallItemaCopy] = useState([]);
  // const dispatch=useDispatch()
  // const allItems = useSelector((state) => state.fetchitem.f_item);
  const category = useSelector((state) => state.fetchcategory.fetchedcategory);
  const Name = useSelector((state) => state.fetchitem.Name);

  const {
    fetcheditems,
    setFetcheditemsCopy,
    nonvegOnly,
    setnontVegOnly,
    vegOnly,
    setVegOnly,
    activeCategoryId,
    setActiveCategoryId,
    setFilterActive,
    filterActive,
    fetcheditemsCopy
    
  } = useContext(RestaurantContext);

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
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
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
      const isVegMatch =
        item.veg === true && searchInput.toLowerCase() === "veg";
      const isNonVegMatch =
        item.Veg === false && searchInput.toLowerCase() === "nonveg";

      return isMatch || isVegMatch || isNonVegMatch;
    });
  };

  const deepSearch = (obj, searchText) => {
    if (!obj || typeof obj !== "object") {
      return false;
    }

    const values = Object.values(obj);

    for (const value of values) {
      if (typeof value === "object") {
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
    setVegOnly(false);
    setnontVegOnly(false);

    setFetcheditemsCopy(filteredData);

    if (searchInput.trim() === "") {
      setFetcheditemsCopy(fetcheditems); // Reset to original data
    }
  }, [searchInput, fetcheditems]);
  
  const handleFilter = (categoryId) => {
    setActiveCategoryId(categoryId);
  
    // Filter the items based on the selected category
    let filterData = fetcheditems.filter((data) => {
      return data?.Category?.categoryId?.includes(categoryId);
    });
  
    // Filter veg or non-veg items if active
    if (vegOnly) {
      filterData = filterData.filter((data) => data.veg);
    } else if (nonvegOnly) {
      filterData = filterData.filter((data) => !data.veg);
    }
  
    // Apply sorting to the filtered data
    if (sortOrder === "asc") {
      filterData.sort((a, b) => Number(a?.price) - Number(b?.price));
    } else if (sortOrder === "dec") {
      filterData.sort((a, b) => Number(b?.price) - Number(a?.price));
    }
  
    // Update the state with the filtered and sorted data
    setTimeout(() => {
      setFetcheditemsCopy(filterData);
    }, 100);
  
    // Reset filter and category name
    setFilterActive(false);
    setcategoryName(true);
  };
  
  
  

  const sort = () => {
    setFilterActive(false)
   
    let sortedData;

    if (sortOrder === "asc") {
      sortedData = [...fetcheditemsCopy].sort(
        (a, b) => Number(a?.price) - Number(b?.price)
      );
      setsortOrder("dec");
    } else if (sortOrder === "dec") {
      sortedData = [...fetcheditemsCopy].sort(
        (a, b) => Number(b?.price) - Number(a?.price)
      );
      setsortOrder("");
    } else {
      sortedData = [...fetcheditemsCopy];
      setsortOrder("asc");
    }

   
    setTimeout(() => {
      // Update fetchedItemsCopy state
      setFetcheditemsCopy(sortedData || []);
    }, 100);
  };

  const handleAllClick = () => {
    setFetcheditemsCopy(fetcheditems);
    setFilterActive(false)
    setActiveCategoryId(null); // Set activeCategoryId to null to deactivate all buttons
    // Add your logic for when "All" is clicked
  };
  // useEffect(()=>{
  //   dispatch(setFetchedItem(allItemaCopy))
  // },[allItemaCopy])
  // (id)

  return (
    <>
      <div className="sticky-top" style={{ backgroundColor: "white" }}>
        <div
          className="d-flex "
          style={{
            justifyContent: "space-between",
            backgroundColor: "whiteSmoke",
            padding: "10px",
          }}
        >
          <div className="">
            <Link to="/" className="navbar-brand  ">
              <div
                style={{
                  justifyContent: "right",
                  textAlign: "right",
                  alignContent: "right",
                }}
              >
                <div>
                  <span className="fw-bold">{Name}</span>
                </div>
                <div
                  className="ms-auto"
                  style={{
                    fontSize: "8px",
                    textAlign: "right",
                    backgroundColor: "whiteSmoke",
                    color: "",
                    width: "6 0%",
                  }}
                >
                  Powered by falcon-vision
                  <FaEarlybirds size={12} />
                </div>
              </div>
            </Link>
          </div>
          <div className="d-flex">
            <div className="input-group">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearch}
                value={searchInput}
                style={{ borderRight: "none", height: "35px" }}
              />
              <div className="mt-1">
                {!searchInput.length > 0 ? (
                  <div
                    className="btn text-light"
                    style={{ backgroundColor: "purple", borderLeft: "none" }}
                  >
                    <FaSearch />
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
            className={`mx-1 ${activeCategoryId === null ? "btn-active" : ""}`}
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
              className={`mx-1 ${
                activeCategoryId === categoryItem.categoryId ? "btn-active" : ""
              }`}
              style={{
                maxHeight: "100px",

                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "10px",
              
              }}
              
              id={categoryItem.categoryId}
            >
              {categoryItem?.isActive === true ? (
                <span
                  className="text-dark mt-5"
                  onClick={() => handleFilter(categoryItem.categoryId)}
                >
                  {categoryItem.name}
                </span>
              ) : (
                <span
                  className="text-dark mt-5"
                  style={{ cursor: "not-allowed", opacity: "0.5" }}
                >
                  {categoryItem.name}
                </span>
              )}
            </div>
          ))}
        </div>

        <div
          className="d-flex-main  mt-4 p-2"
          style={{ justifyContent: "space-between" }}
        >
          <div className="d-flex-main">
            {nonvegOnly === true ? (
              <>
                <div
                  className="d-flex-main btn mr-2"
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
                    <FaRegDotCircle className="text-success mx-1 " size={20} />
                  </div>
                  <div className="responsiveText">veg</div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex-main btn mr-2"
                  style={{
                    maxHeight: "100px",
                    cursor: nonvegOnly === true ? "not-allowed" : "pointer",
                    border: "1px solid #ccc",
                    padding: "5px 10px 5px 10px",
                    borderRadius: "30px",
                    backgroundColor: vegOnly === true ? "#fff" : "",
                    color: vegOnly === true ? "green" : "",
                    boxShadow: vegOnly === true ? "2px 2px 1px 1px green" : "",
                  }}
                  onClick={() => {setVegOnly(vegOnly === false ? true : false);setFilterActive(false)}}
                >
                  <div>
                    <FaRegDotCircle className="text-success mx-1" size={20} />
                  </div>
                  <div className="responsiveText">veg</div>
                </div>
              </>
            )}
            {vegOnly === true ? (
              <>
                <div
                  className="d-flex-main btn"
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
                  <div className="responsiveText">non veg</div>
                </div>
              </>
            ) : (
              <>
                <div
                  className="d-flex-main btn"
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
                    {setnontVegOnly(nonvegOnly === true ? false : true);setFilterActive(false)}
                  }
                >
                  <div>
                    <FaRegDotCircle className="text-danger mx-1" size={20} />
                  </div>
                  <div className="responsiveText">non veg</div>
                </div>
              </>
            )}
          </div>
          <div className="d-flex-main ">
            <div
              className="mx-2"
              style={{
                maxHeight: "100px",
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "5px 10px 5px 10px",
                borderRadius: "30px",
              
                backgroundColor: filterActive === true ? "purple" : "",
              }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <FaFilter size={20} style={{ color: filterActive === true ? "white" : "purple",}}/>
              <span className="responsiveText" style={{ color: filterActive === true ? "white" : "",}}>Filter</span>
            </div>
            <div
              style={{
                maxHeight: "100px",
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "5px 10px 5px 10px",
                borderRadius: "30px",
              }}
              onClick={sort}
            >
              {sortOrder === "asc" ? (
                <FaSort size={20} style={{ color: "purple" }} />
              ) : sortOrder === "" ? (
                <FaSortDown size={20} style={{ color: "purple" }} />
              ) : (
                <FaSortUp size={20} style={{ color: "purple" }} />
              )}

              <span className="responsiveText">Sort</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
