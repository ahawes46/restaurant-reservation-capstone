import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import { listTables, seatReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Seat() {
    const { reservation_id } = useParams();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [seatTable, setSeatTable] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const c = new AbortController();
      setError(null);
      try {
        const response = await listTables(c.signal);
        setTables((prev) => response);
      } catch (error) {
        setError(error);
      }
      return () => c.abort();
    }
    loadTables();
  }, [reservation_id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const c = new AbortController();
    try {
      const response = await seatReservation(
        seatTable,
        reservation_id,
        c.signal
      );
      if (response) {
        history.push(`/dashboard`);
      }
    } catch (error) {
      setError(error);
    }
    return () => c.abort();
  }

  function handleCancel() {
    history.goBack();
  }

  function handleSelectTable(e) {
    setSeatTable(e.target.value);
  }

  const options = tables.map((table) => (
    <option
      key={table.table_id}
      value={table.table_id}
    >{`${table.table_name} - ${table.capacity}`}</option>
  ));

    return (
        <>
        <div>
            <h1>Select Table for Reservation</h1>
        </div>
        <ErrorAlert error={error} />
        <form onSubmit={handleSubmit}>
            <label htmlFor="seat_reservation">
                <select 
                 id="table_id"
                 name="table_id"
                 onChange={handleSelectTable}
                 required
                >
                <option defaultValue>Select a table</option>
                {options}
                </select>
            </label>
            <button type="submit" className="btn btn-primary">Submit</button>
            <button type="cancel" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        </>
    );
}

export default Seat;