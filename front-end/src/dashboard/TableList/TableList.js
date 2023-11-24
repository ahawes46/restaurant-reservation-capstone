import React from "react";
import TableInfo from "./TableInfo";

function TableList({ tables, loadDashboard }) {
  if (!tables) {
    return null;
  }

  const formattedTables = tables.map((table) => (
    <TableInfo
      key={table.id}
      table={table}
      loadDashboard={loadDashboard}
    />
  ));

  return (
    <table className="table table-sm table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Table</th>
          <th scope="col">Capacity</th>
          <th scope="col">Status</th>
          <th scope="col">Finish</th>
        </tr>
      </thead>
      <tbody>{formattedTables}</tbody>
    </table>
  );
}

export default TableList;