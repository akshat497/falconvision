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
  FaCross,
  FaWindowClose,
  FaTimes,
 
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
  const { fetcheditems, setFetcheditems,fetcheditemsCopy, setFetcheditemsCopy } = useContext(RestaurantContext);

 
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
  const noDataComponent = () => {
    return <h1 className="text-center mt-5">No item found</h1>;
  };
  useEffect(() => {
    const filterData = fetcheditems?.filter((data) => {
      return (
        data?.Category?.name
          ?.toLowerCase()
          .includes(searchInput?.toLowerCase()) ||
        data?.name?.toLowerCase().includes(searchInput?.toLowerCase())
      );
    });
  
    setFetcheditemsCopy(filterData);
  
    if (searchInput.trim() === "") {
      setcategoryName(false);
      setFetcheditemsCopy(fetcheditems);// Reset to original data
    }
  }, [searchInput]);
  

  const handleFilter = (e) => {
    ;
    const categoryId = e.target.id;
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

  // useEffect(()=>{
  //   dispatch(setFetchedItem(allItemaCopy))
  // },[allItemaCopy])
  // (id)
  return (
    <>
   
      
   <nav className={`navbar navbar-expand-lg navbar-light bg-light ${visible ? 'bg-light text-dark navbar-show sticky-top' : 'bg-light navbar-hide'} `}>
  <div className="container-fluid">
    <Link to='/' className="navbar-brand">
      <span className="fw-bold">FalconVision</span> <FaEarlybirds size={32}/>
    </Link>

    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a
            className="nav-link active"
            aria-current="page"
            href="#"
            onClick={sort}
          >
            <span className="fw-bold">Sort</span>
            {sortOrder === "" ? (
              <FaSort />
            ) : sortOrder === "ace" ? (
              <FaSortDown />
            ) : (
              <FaSortUp />
            )}
          </a>
        </li>

        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {categoryName
              ? fetcheditemsCopy[0]?.Category?.name
              : "Category"}
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {category?.map((data) => (
              <li key={data?.categoryId}>
                {data?.isActive ? (
                  <li
                    className="dropdown-item"
                    onClick={handleFilter}
                    id={data?.categoryId}
                  >
                    {data?.name}
                  </li>
                ) : (
                  <li className="dropdown-item" id={data?.categoryId}>
                    {data?.name + " (Currently Unavailable)"}
                  </li>
                )}
              </li>
            ))}
            <li className="dropdown-item ml-3" onClick={() => {
              setcategoryName(false);
              setFetcheditemsCopy(fetcheditems);
              setsortOrder("");
            }}>
              All
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <li
            className="nav-link active"
            aria-current="page"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <span className="fw-bold"><FaFilter /> Filter</span>
          </li>
        </li>
      </ul>

      <form className="d-flex">
        <div className="input-group mb-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
            value={searchInput}
          />
          <div className="input-group-append">
            {!searchInput.length > 0 ? (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  // Perform your search action here
                }}
              >
                <FaSearch />
              </button>
            ) : (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {
                  setsearchInput("");
                }}
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  </div>
</nav>
      <div>
        {/* <button type="button" className="btn btn-primary "  data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button> */}
        {/* Modal */}
        <FilterModal />
      </div>
     
    </>
  );
}
