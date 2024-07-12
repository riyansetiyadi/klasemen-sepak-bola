import React, { useState, useEffect } from "react";
import NavbarSepakBola from "../Navbar/Navbar";

export default function Klasemen() {
  const [klasemen, setKlasemen] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_DOMAIN + "/klasemen")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKlasemen(data["data"]);
      });
  }, []);

  return (
    <div>
      <NavbarSepakBola />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Klub</th>
            <th scope="col">Ma</th>
            <th scope="col">Me</th>
            <th scope="col">S</th>
            <th scope="col">K</th>
            <th scope="col">GM</th>
            <th scope="col">GK</th>
            <th scope="col">Point</th>
          </tr>
        </thead>
        <tbody>
          {klasemen.map((klub, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{klub.nama_klub}</td>
              <td>{klub.total_main}</td>
              <td>{klub.total_menang}</td>
              <td>{klub.total_seri}</td>
              <td>{klub.total_kalah}</td>
              <td>{klub.total_goal}</td>
              <td>{klub.total_kebobolan}</td>
              <td>{klub.total_poin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
