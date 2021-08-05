import React, { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "../useLocalStorage";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function ReceivedSlotLinking(props) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState([]);
  const [id, setId] = useState([]);
  const [statusrefresh, setStatusrefresh] = useState("");

  useEffect(async () => {
    var x = await axios.get(
      `http://localhost:4000/viewReceivedSlotLinkingRequest/` + props.status
    );
    if (x.data != "No requests found") setData(x.data);
  }, []);

  function handleAccept(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:4000/slotsAcceptance`, { id: event.target.value })
      .then((res) => {
        setMessage(res.data);
        setId(event.target.value);
        setStatusrefresh("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleReject(event) {
    event.preventDefault();
    axios
      .post(`http://localhost:4000/slotsRejection`, { id: event.target.value })
      .then((res) => {
        setMessage(res.data);
        setId(event.target.value);
        setStatusrefresh("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <NavBar />
      <h3 style={{ textAlign: "center" }}>recieved SlotLinking requests</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Request</th>
            <th scope="col">slot</th>
            <th scope="col">day</th>
            <th scope="col">course</th>
            <th scope="col">status</th>
            <th scope="col">from</th>
            {(props.status == "Pending" || props.status == "") && (
              <th scope="col">Message</th>
            )}
            {(props.status == "Pending" || props.status == "") && (
              <th scope="col">accept</th>
            )}
            {(props.status == "Pending" || props.status == "") && (
              <th scope="col">reject</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((y, idx) => {
            return (
              <tr>
                <th scope="row">{idx + 1}</th>
                <td>{y.request}</td>
                <td>{y.slot}</td>
                <td>{y.day}</td>
                <td>{y.course}</td>
                <td>
                  {y.status}
                  {statusrefresh}
                </td>
                <td>{y.from}</td>
                {(props.status == "Pending" || props.status == "") && (
                  <td> {y.id == id ? "   " + message : ""}</td>
                )}
                {(props.status == "Pending" || props.status == "") && (
                  <td>
                    {" "}
                    <button
                      type="button"
                      class="btn btn-outline-success"
                      onClick={handleAccept}
                      value={y.id}
                    >
                      Accept
                    </button>
                  </td>
                )}
                {(props.status == "Pending" || props.status == "") && (
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReceivedSlotLinking;