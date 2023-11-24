import React from "react";
import ReservationRow from "./ReservationRow";
import { cancelReservation } from "../../utils/api";
import { useHistory } from "react-router-dom";

function ReservationTable({ 
    reservations,
    setReservations,
    setError,
}) {
    const history = useHistory();
    if(!reservations) {
        return null;
    }

    async function cancelRes(reservation) {
        try {
            const { status } = await cancelReservation(reservation.reservation_id);
            const updated = reservations.map((res) => {
              if (res.reservation_id === reservation.reservation_id) {
                res.status = status;
              }
              return res;
            });
            setReservations(updated);
            if(status === "200") {
                history.goBack();
            } 
          } catch (error) {
            setError(error);
          }
    }

    const formatted = reservations.map((res) => {
        return(
            <ReservationRow 
                key={res.reservation_id}
                reservation={res}
                cancelRes={cancelRes}
            />
        );
    });

    return (
    <>
        <table className="table table-sm table-striped table-bordered">
            <thead>
            <tr>
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Number</th>
                <th>Guests</th>
                <th>Time</th>
                <th>Status</th>
                <th>Seat</th>
                <th>Edit</th>
                <th>Cancel</th>
            </tr>
            </thead>
            <tbody>{formatted}</tbody>
        </table>
    </>
    );
}

export default ReservationTable;