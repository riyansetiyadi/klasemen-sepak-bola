import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NavbarSepakBola from "../Navbar/Navbar";

export default function Klub() {
  const [klubInputs, setklubInputs] = useState({});
  const [klubs, setKlub] = useState([]);

  useEffect(() => {
    fetchClub();
  }, []);

  const fetchClub = () => {
    fetch(process.env.REACT_APP_API_DOMAIN + "/klub")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKlub(data["data"]);
      });
  };

  const handleChangeKlub = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setklubInputs((values) => ({ ...values, [name]: value }));
  };

  const addKlub = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!("nama_klub" in klubInputs) || klubInputs.nama_klub.trim() === "") {
      alert("Masukkan Nama Klub");
    } else if (
      !("nama_kota" in klubInputs) ||
      klubInputs.nama_kota.trim() === ""
    ) {
      alert("Masukkan Kota Klub");
    } else {
      const postData = {
        nama: klubInputs.nama_klub,
        kota: klubInputs.nama_kota,
      };

      fetch(process.env.REACT_APP_API_DOMAIN + "/klub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Data berhasil di simpan");
          setklubInputs({});
          fetchClub();
        })
        .catch((error) => {
          alert("Terjadi kesalahan");
        });
    }
  };

  return (
    <div>
      <NavbarSepakBola />
      <div>
        <Form onSubmit={addKlub}>
          <Form.Group className="mb-3">
            <Form.Label>Nama Klub</Form.Label>
            <Form.Control
              type="text"
              name="nama_klub"
              value={klubInputs.nama_klub || ""}
              placeholder="Masukkan Nama Klub"
              required
              onChange={handleChangeKlub}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nama Kota Klub</Form.Label>
            <Form.Control
              type="text"
              name="nama_kota"
              value={klubInputs.nama_kota || ""}
              placeholder="Masukkan Nama Kota Klub"
              required
              onChange={handleChangeKlub}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Klub</th>
            <th scope="col">Kota</th>
          </tr>
        </thead>
        <tbody>
          {klubs.map((klub, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{klub.nama}</td>
              <td>{klub.kota}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
