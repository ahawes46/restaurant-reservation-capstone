import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationTable from "./reservationTable/ReservationTable";
import TableList from "./TableList/TableList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
 function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(listTables)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1 className="d-flex justify-content-center">Dashboard</h1>
      <div className="d-md-flex mb-3 d-flex justify-content-center">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-primary mr-2 mb-3" type="today" onClick={handleToday}>Today</button>
        <button className="btn btn-primary mr-2 mb-3" type="previous" onClick={handlePrev}>Previous</button>
        <button className="btn btn-primary mr-2 mb-3" type="next" onClick={handleNext}>Next</button>
      </div>
      <div>
        <ErrorAlert error={reservationsError} />
        <ReservationTable
          reservations={reservations}
          setReservations={setReservations}
          setError={setReservationsError}
        />
        <TableList 
          tables={tables}
          loadDashboard={loadDashboard}
        />
      </div>
    </main>
  );
}

export default Dashboard;
