import { useEffect, useState } from "react";
import "./App.css";
import Table from "./Pages/Components/Table";
import Chart from "./Pages/Components/Chart";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch("https://erp.seopage1.net/api/leads")
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      });
  }, []);
  return (
    <div className="container mx-auto flex flex-col gap-10">
      <Table data={data} isLoading={isLoading} />
      <Chart data={data} />
    </div>
  );
}

export default App;
