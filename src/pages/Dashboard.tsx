import { useSelector } from "react-redux";
import { selectHeader } from "../features/header/header_slice";
import Monitoring from "../components/monitoring/Monitoring";
import Calculator from "../components/calculator/Calculator";
import PurchaseManageMent from "../components/purchase managment/PurchaseManageMent";

const Dashboard = () => {
  const headerSelector = useSelector(selectHeader);
  return (
    <div className="dashboard-page">
      {headerSelector.displayDashboardSection === "Monitoring" && (
        <Monitoring />
      )}
      {headerSelector.displayDashboardSection === "calculator" && (
        <Calculator />
      )}{" "}
      {headerSelector.displayDashboardSection === "Purchase management" && (
        <PurchaseManageMent />
      )}
    </div>
  );
};

export default Dashboard;
