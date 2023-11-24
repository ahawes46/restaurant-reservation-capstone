
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./Form";


/* Allows the user to create a new reservation */

function Reservations() {
    const history = useHistory();
    const [reservationsError, setReservationsError] = useState(null);
    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };

    const [formData, setFormData] = useState({ ...initialFormData });

    function formatDate(date) {
        let formatedDate = date.split("");
        formatedDate.splice(10);
        formatedDate = formatedDate.join("");
        return formatedDate;
    }
    
      function formatTime(time) {
        let formatedTime = time.split("");
        formatedTime.splice(5);
        formatedTime = formatedTime.join("");
        return formatedTime;
    }

    function handleChange({ target }) {
        const { name, value } = target;
        switch (name) {
          case "people":
            setFormData({ ...formData, [name]: parseInt(value) });
            break;
          case "reservation_date":
            setFormData({ ...formData, [name]: formatDate(value) });
            break;
          case "reservation_time":
            setFormData({ ...formData, [name]: formatTime(value) });
            break;
          default:
            setFormData({ ...formData, [name]: value });
            break;
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const { first_name, last_name, mobile_number, reservation_date, reservation_time, people } = formData;
        const newReservation = { first_name, last_name, mobile_number, reservation_date, reservation_time, people, status: "booked" }
        try {
            await createReservation(newReservation)
            setFormData(initialFormData)
            const date = newReservation.reservation_date;
            console.log(date);
            history.push(`/dashboard?date=${date}`);
          } catch(error) {
            setReservationsError(error);
          }
        console.log(formData);
        console.log(newReservation);
    };



    return (
        <>
            <h1>Create Reservation</h1>
            <ErrorAlert error={reservationsError} />
            <Form
                initialformData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default Reservations;