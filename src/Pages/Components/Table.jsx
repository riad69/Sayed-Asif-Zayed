import React, { useState } from "react";
import { RxDotsVertical } from "react-icons/rx";
import { TfiMenuAlt } from "react-icons/tfi";
import Button from "./Button";
import Loading from "./Loading";
import Pagination from "./Pagination";
import SidebarSelectionMenu from "./SidebarSelectionMenu";

const Table = ({ data, isLoading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState(
    JSON.parse(localStorage.getItem("checkedItems")) || {}
  );
  const itemsPerPage = 10;
  const handlePaginationChecked = (page) => {
    setCurrentPage(page);
  };
  const paginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };
  const handleSidebarButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleCheckboxChange = (checkedItems) => {
    setVisibleColumns(checkedItems);
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
  };
  const getVisibleColumns = () => {
    return Object.keys(visibleColumns).filter((col) => visibleColumns[col]);
  };
  const convertedToDealButtonClassNames =
    "bg-green-500 text-xs font-bold px-1 text-white rounded";
  const notConvertedToDealButtonClassNames =
    "bg-red-500 text-xs font-bold px-1 text-white rounded";
  const notApplicableButtonClassNames = "";
  const noActivityYetButtonClassNames =
    "bg-yellow-500 text-[10px] font-bold px-1 rounded";
  const actionsButtonClassNames = "p-1 border-2 rounded-md";
  const selectionMenuClassNames =
    "p-2 bg-black bg-opacity-50 text-white rounded-md relative";

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3 my-10 bg-white drop-shadow-lg p-5  rounded-md">
          <div className="flex justify-between items-center">
            <div></div>
            <Button
              onClick={handleSidebarButtonClick}
              classNames={selectionMenuClassNames}
              type={"button"}
              text={<TfiMenuAlt size={20} />}
            />
          </div>
          <div
            className={`overflow-x-auto flex flex-col items-end gap-4 ${
              isSidebarOpen === true ? "opacity-50" : "opacity-100"
            }`}
          >
            <table className="table table-xs">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>#</th>
                  {getVisibleColumns().map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData()?.map((row, index) => (
                  <tr key={index}>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th>{row?.id}</th>
                    <td>{row?.client_name.slice(0, 30)}...</td>
                    <td
                      title={row?.project_link}
                      className="hover:cursor-pointer"
                    >
                      <a
                        href={row?.project_link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row?.project_link.slice(0, 40)}...
                      </a>
                    </td>
                    <td>
                      {row?.project_id === null
                        ? "No Project Id Assigned"
                        : row?.project_id}
                    </td>
                    <td>{row?.value ? row?.value : "No Budget Found"}</td>
                    <td>{row?.bid_value}</td>
                    <td>
                      {row?.created ? (
                        row?.created
                      ) : (
                        <>
                          {new Date().toJSON().split("T")[0]}{" "}
                          {new Date().toJSON().split("T")[1].split(".")[0]}
                        </>
                      )}
                    </td>
                    <td>{row?.created ? row?.created : "Zayed Fahim"}</td>
                    <td>
                      {row?.bidding_delay
                        ? row?.bidding_delay
                        : "No Data Found"}
                    </td>
                    <td>
                      {row?.deal_status === 1 ? (
                        <Button
                          classNames={convertedToDealButtonClassNames}
                          type={"button"}
                          text={"Converted to Deal"}
                        />
                      ) : (
                        <Button
                          classNames={notConvertedToDealButtonClassNames}
                          type={"button"}
                          text={"Not Converted to Deal"}
                        />
                      )}
                    </td>
                    <td>
                      {" "}
                      {row?.deal_status === 1 ? (
                        <Button
                          classNames={noActivityYetButtonClassNames}
                          type={"button"}
                          text={"No Activity Yet"}
                        />
                      ) : (
                        <Button
                          classNames={notApplicableButtonClassNames}
                          type={"button"}
                          text={"Not Applicable"}
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        type={"button"}
                        text={<RxDotsVertical size={15} />}
                        classNames={actionsButtonClassNames}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              data={data}
              handlePaginationChecked={handlePaginationChecked}
              currentPage={currentPage}
            />
          </div>
          {isSidebarOpen && (
            <SidebarSelectionMenu
              handleCheckboxChange={handleCheckboxChange}
              visibleColumns={visibleColumns}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Table;
