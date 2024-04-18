import React, { useEffect, useState } from "react";
import { categoriesTableMap } from "../../constants/CategoiesCommandMap.js";
import MatTable from "../../components/table/MatTable.jsx";
import {toast} from "react-toastify";

// GET_ALL_CATEGORIES
export default function Category({ command }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategoryData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:8080/controller?" +
          new URLSearchParams({
            command_name: command,
          })
      );
      const data = await response.json();
      setData(data);
      setIsLoading(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [command]);

  const deleteCategory = async (categoryId) => {
    console.log("deleting CATEGORY");
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        command_name: "DELETE_CATEGORY",
      },
      body: JSON.stringify({
        category_number: categoryId,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:8080/controller",
        requestOptions
      );
      const data = await response.json();
      fetchCategoryData();
      console.log(data);
      toast.success("Category was removed!")
    } catch (err) {
      toast.error(`ERROR: ${err}`)
    }
  };

  return (
    <main className="px-8 py-4 h-screen bg-gradient-to-r from-violet-200 to-pink-200">
      <div className="grid">
        {!isLoading && (
          <MatTable
            columnNames={categoriesTableMap.get(command)}
            rows={data}
            deleteFunc={deleteCategory}
            deleteProperty={"number"}
            pathToCreateUpdate={"/post_update_category"}
          ></MatTable>
        )}
      </div>
    </main>
  );
}
