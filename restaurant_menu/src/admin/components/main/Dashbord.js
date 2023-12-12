import React, { useEffect, useState } from "react";
import { Line, Pie, Bar, Chart } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Legend,
  Tooltip,
  BarElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RestaurantContext from "../../../context/RestaurantContext";
import { useContext } from "react";
import {
  FaAdjust,
  FaChartLine,
  FaDatabase,
  FaMoneyBillWave,
  FaRegCompass,
} from "react-icons/fa";
import { salesSummery } from "../../../redux/orders/orderThunk";

const Dashboard = () => {
  const allOrders = useSelector((state) => state.salessummery.sales);
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const salesDataLoading = useSelector(
    (state) => state.salessummery.loadingsales
  );

  const dispatch = useDispatch();
  const { expanded } = useContext(RestaurantContext);
  const [totalSales, setTotalSales] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startMonth, setStartMonth] = useState(null);
  const [endMonth, setEndMonth] = useState(null);
  const [totalSalesForCurrentMonth, setTotalSalesForCurrentMonth] =
    useState("");
  const [totalSalesForPreviousMonth, setTotalSalesForPreviousMonth] =
    useState("");
  const [showChart, setshowChart] = useState("sales");
  Chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Legend,
    Tooltip,
    BarElement
  );

  const calculateMonthlySales = (data, isCurrentMonth) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthlySales = data.reduce(
      (result, sale) => {
        const saleDate = new Date(sale.day);
        const saleMonth = saleDate.getMonth();
        const saleYear = saleDate.getFullYear();

        if (
          isCurrentMonth &&
          saleMonth === currentMonth &&
          saleYear === currentYear
        ) {
          result.currentMonthSales += sale.totalAmount;
        } else if (
          !isCurrentMonth &&
          (saleMonth !== currentMonth || saleYear !== currentYear)
        ) {
          result.previousMonthSales += sale.totalAmount;
        }

        return result;
      },
      { currentMonthSales: 0, previousMonthSales: 0 }
    );

    return monthlySales;
  };

  useEffect(() => {
    // ... (previous useEffect block for total sales)

    // Calculate current and previous month sales
    const { currentMonthSales, previousMonthSales } = calculateMonthlySales(
      totalSales,
      true
    );
    setTotalSalesForCurrentMonth(currentMonthSales);
    setTotalSalesForPreviousMonth(previousMonthSales);
  }, [totalSales]);

  // ... (other variables and calculations)

  // New bar chart dataset
  // const barChartDatacompare = {
  //   labels: ['Revenue'],
  //   datasets: [
  //     {
  //       label: 'Sales Amount',
  //       data: [totalRevenue],
  //       backgroundColor: ['blue', 'red'], // You can adjust colors as needed
  //       borderColor: 'blue',
  //     },
  //   ],
  // };
  // const LineChartDatacompare = {
  //   labels: ['Revenue'],
  //   datasets: [
  //     {
  //       label: 'Sales Amount',
  //       data: [totalRevenue],
  //       backgroundColor: ['blue', 'red'], // You can adjust colors as needed
  //       borderColor: 'blue',
  //     },
  //   ],
  // };
  useEffect(() => {
    if (allOrders !== null && allOrders !== undefined) {
      const dataObj = allOrders?.customers
        ?.map((data) => {
          if (data.Orders[0].isCompleted) {
            return {
              amount: data.Orders[0].totalAmount,
              day: new Date(data.Orders[0].createdAt).toLocaleDateString(
                "en-US"
              ),
            };
          }
          return null; // Skip incomplete orders
        })
        .filter(Boolean); // Filter out null values

      // Calculate total sales for each day
      const dailySales = dataObj?.reduce((result, sale) => {
        const key = sale.day;
        if (!result[key]) {
          result[key] = 0;
        }
        result[key] += Number(sale.amount);
        return result;
      }, {});

      // Create an array of objects for daily sales
      const dailySalesData = Object?.keys(dailySales)?.map((day) => ({
        day,
        totalAmount: dailySales[day],
      }));

      setTotalSales(dailySalesData);
    }
  }, [allOrders]);

  useEffect(() => {
    // Calculate total revenue
    const revenue = totalSales?.reduce(
      (accumulator, currentValue) =>
        accumulator + Number(currentValue.totalAmount),
      0
    );

    // Calculate total profit (30% of total revenue)
    const profit = 0.3 * revenue;

    setTotalRevenue(revenue);
    setTotalProfit(profit);
  }, [totalSales]);
  const filteredData = totalSales.filter((sale) => {
    const saleDate = new Date(sale.day);
    if (startDate && endDate) {
      return saleDate >= startDate && saleDate <= endDate;
    }
    return true;
  });
  const labels = filteredData?.map((sale) => sale.day);
  const data = filteredData?.map((sale) => sale.totalAmount);

  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales Amount",
        data: data,
        fill: true,
        borderColor: "black",
      },
    ],
  };

  const pieChartData = {
    labels: ["Revenue", "Profit"],
    datasets: [
      {
        data: [totalRevenue, totalProfit],
        backgroundColor: ["gray", "green"],
        borderColor: "black",
      },
    ],
  };

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Sales Amount",
        data: data,
        backgroundColor: "gray",
        borderColor: "black",
        borderRadius: "10px",
        outerWidth: "10px",
        innerWidth: "10px",
        width: "10px",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales Amount",
        },
      },
    },
  };
  const fetchSalesData = () => {
    if (showChart === "sales") {
      // Handle fetching data for a single month based on startDate and endDate
      const obj = {
        startDate: startDate,
        endDate: endDate,
        userId: restroDetails?.userId,
      };
      dispatch(salesSummery(obj));
    } else if (showChart === "comparison" && startMonth && endMonth) {
      // Handle fetching data for the selected two months
      // Calculate the start and end dates for the two months
      const startDate = new Date(
        startMonth.getFullYear(),
        startMonth.getMonth(),
        1
      );
      const endDate = new Date(
        endMonth.getFullYear(),
        endMonth.getMonth() + 1,
        0
      );

      const obj = {
        startDate: startDate,
        endDate: endDate,
        userId: restroDetails?.userId,
      };
      dispatch(salesSummery(obj));
    }
  };
  // Assuming you have all the sales data in the 'dataObj' array
  const dataObj = [allOrders]; // Replace with your actual data

  // Initialize arrays to store sales data for two months
  const salesDataForMonth1 = [];
  const salesDataForMonth2 = [];

  // Define the start and end months
  const startMonthIndex = startMonth?.getMonth(); // Replace with the index of the start month in your data
  const endMonthIndex = endMonth?.getMonth(); // Replace with the index of the end month in your data

  dataObj[0]?.customers?.forEach((data) => {
    debugger;
    const saleDate = new Date(data.createdAt);
    const saleMonth = saleDate.getMonth();
    
    // Check if the sale belongs to the start month
    if (saleMonth === startMonthIndex) {
      salesDataForMonth1.push(data.Orders[0]?.totalAmount);
    }

    // Check if the sale belongs to the end month
    if (saleMonth === endMonthIndex) {
      salesDataForMonth2.push(data.Orders[0]?.totalAmount);
    }
  });
  const totalSalesMonth1 = salesDataForMonth1.reduce(
    (a, b) => Number(a) + Number(b),
    0
  );
  const totalSalesMonth2 = salesDataForMonth2.reduce(
    (a, b) => Number(a) + Number(b),
    0
  );

  // Determine the background colors for the bars
  const backgroundColorMonth1 =
    totalSalesMonth1 > totalSalesMonth2 ? "green" : "red";
  const backgroundColorMonth2 =
    totalSalesMonth2 > totalSalesMonth1 ? "green" : "red";
  // Update the 'barChartDatacompare' dataset

  const barChartDatacompare = {
    labels: [
      startMonth?.toLocaleString("en-US", { month: "long" }),
      endMonth?.toLocaleString("en-US", { month: "long" }),
    ], // Replace with actual month names or labels
    datasets: [
      {
        label: "Sales Amount",
        data: [totalSalesMonth1, totalSalesMonth2],
        backgroundColor: [backgroundColorMonth1, backgroundColorMonth2], // You can adjust colors as needed
        borderColor: "blue",
      },
    ],
  };

  // Update the 'LineChartDatacompare' dataset if needed
  const LineChartDatacompare = {
    labels: [
      startMonth?.toLocaleString("en-US", { month: "long" }),
      endMonth?.toLocaleString("en-US", { month: "long" }),
    ], // Replace with actual month names or labels
    datasets: [
      {
        label: "Sales Amount",
        data: [totalSalesMonth1, totalSalesMonth2],
        backgroundColor: [backgroundColorMonth1, backgroundColorMonth2], // You can adjust colors as needed
        borderColor: "blue",
      },
    ],
  };

  return (
    <div className={expanded ? "dashboard" : "dashboardcollapsed"}>
      <div className="container-fluid">
        <button
          className={
            showChart === "sales" ? "btn-active mr-2" : "btn mr-2"
          }
          onClick={() => {
            setshowChart("sales");
          }}
        >
          Sales <FaChartLine />
        </button>
        <button
          className={
            showChart === "comparison" ? "btn-active mx-2" : "btn mx-2"
          }
          onClick={() => {
            setshowChart("comparison");
          }}
        >
          Comparison <FaAdjust />
        </button>
        {/* <button className={showChart==="profit"?"btn-active mx-2":"btn mx-2"} onClick={() => { setshowChart('profit') }}>
          Profit <FaMoneyBillWave/>
        </button> */}
      </div>
      <div>
        {showChart === "sales" && (
          <>
            <div className="d-flex container-fluid mt-4">
              <div className="mr-5">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Start Date"
                  className="form-control"
                />
              </div>
              <div>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="End Date"
                  className="form-control"
                />
              </div>
              <div>
                <button
                  className="btn mx-3 btn text-light my-2"
                  style={{ backgroundColor: "purple" }}
                  disabled={salesDataLoading}
                  onClick={fetchSalesData}
                >
                  <FaDatabase />{" "}
                  {salesDataLoading ? "Fetching... " : "Fetch data"}
                </button>
              </div>
            </div>
          </>
        )}
        {showChart === "comparison" && (
          <>
            <div className="d-flex container-fluid mt-4">
              <div className="mr-5">
                <DatePicker
                  selected={startMonth}
                  onChange={(date) => setStartMonth(date)}
                  placeholderText="Start Month"
                  showMonthYearPicker
                  className="form-control"
                />
              </div>
              <div>
                <DatePicker
                  selected={endMonth}
                  onChange={(date) => setEndMonth(date)}
                  placeholderText="End Month"
                  showMonthYearPicker
                  className="form-control"
                />
              </div>
              <div>
                <button
                  disabled={salesDataLoading}
                  className="btn mx-3 btn text-light my-2"
                  style={{ backgroundColor: "purple" }}
                  onClick={fetchSalesData}
                >
                  <FaDatabase />{" "}
                  {salesDataLoading ? "Fetching... " : "Fetch data"}
                </button>
              </div>
            </div>
          </>
        )}
        <div
          style={{
            display: "flex",
            height: "50%",
            width: "50%",
          }}
        >
          {showChart === "sales" && (
            <>
              <Bar data={barChartData} options={options} title="Sales Amount" />
              <Line
                data={lineChartData}
                options={options}
                title="Sales over Time"
              />
            </>
          )}
          {showChart === "comparison" && (
            <>
              <Bar
                data={barChartDatacompare}
                options={options}
                title="Sales Amount"
              />
              <Line
                data={LineChartDatacompare}
                options={options}
                title="Sales over Time"
              />
            </>
          )}
          {showChart === "profit" && (
            <>
              <div className="" style={{ marginLeft: "70%" }}>
                <Pie
                  data={pieChartData}
                  options={{ responsive: true }}
                  title="Revenue vs. Profit"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
