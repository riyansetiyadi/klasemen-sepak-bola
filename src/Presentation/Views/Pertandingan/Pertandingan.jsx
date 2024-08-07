import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import NavbarSepakBola from "../Navbar/Navbar";

export default function Pertandingan() {
  const [pertandinganInputs, setPertandinganInputs] = useState([{}]);
  const [pertandingan, setPertandingan] = useState([]);
  const [klubs, setKlub] = useState([]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_DOMAIN + "/klub")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setKlub(data["data"]);
      });
  }, []);

  useEffect(() => {
    getHasilPertandingan();
  }, []);

  const getHasilPertandingan = () => {
    fetch(process.env.REACT_APP_API_DOMAIN + "/hasil-pertandingan")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPertandingan(data["data"]);
      });
  };

  const handleChangePertandingan = (index, event) => {
    const name = event.target.name;
    const value = event.target.value;
    const newPertandingan = [...pertandinganInputs];
    newPertandingan[index] = { ...newPertandingan[index], [name]: value };
    newPertandingan[index][name] = value;
    setPertandinganInputs(newPertandingan);
  };

  const handleAddInput = () => {
    setPertandinganInputs([...pertandinganInputs, {}]);
  };

  const addAllPertandingan = () => {
    const pertandinganInputGagalTersimpan = [];
    pertandinganInputs.map((val, index) => {
      if (
        "klub_tuan_rumah_id" in val &&
        val.klub_tuan_rumah_id.trim() !== "" &&
        "klub_tamu_id" in val &&
        val.klub_tamu_id.trim() !== "" &&
        "skor_tuan_rumah" in val &&
        val.skor_tuan_rumah.trim() !== "" &&
        "skor_tamu" in val &&
        val.skor_tamu.trim() !== "" &&
        val.klub_tuan_rumah_id !== val.klub_tamu_id
      ) {
        fetch(process.env.REACT_APP_API_DOMAIN + "/hasil-pertandingan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(val),
        })
          .then((response) => response.json())
          .catch((error) => {
            if (!pertandinganInputGagalTersimpan.includes(index)) {
              pertandinganInputGagalTersimpan.push(index);
            }
          });
      } else {
        if (!pertandinganInputGagalTersimpan.includes(index)) {
          pertandinganInputGagalTersimpan.push(index);
        }
      }
    });

    setPertandinganInputs(pertandinganInputGagalTersimpan);
    if (pertandinganInputs.length === 0) {
      alert("Data berhasil di simpan semua");
      setPertandinganInputs([{}]);
    } else {
      alert("Data berhasil disimpan sebagian");
      setPertandinganInputs(
        pertandinganInputGagalTersimpan.map(
          (index) => pertandinganInputs[index]
        )
      );
    }

    getHasilPertandingan();
  };

  const addOnePertandingan = (index) => {
    const dataPertandingan = pertandinganInputs[index];
    if (
      "klub_tuan_rumah_id" in dataPertandingan &&
      dataPertandingan.klub_tuan_rumah_id.trim() !== "" &&
      "klub_tamu_id" in dataPertandingan &&
      dataPertandingan.klub_tamu_id.trim() !== "" &&
      "skor_tuan_rumah" in dataPertandingan &&
      dataPertandingan.skor_tuan_rumah.trim() !== "" &&
      "skor_tamu" in dataPertandingan &&
      dataPertandingan.skor_tamu.trim() !== "" &&
      dataPertandingan.klub_tuan_rumah_id !== dataPertandingan.klub_tamu_id
    ) {
      fetch(process.env.REACT_APP_API_DOMAIN + "/hasil-pertandingan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPertandingan),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Data berhasil di simpan");
          const newPertandinganInputs = [...pertandinganInputs];
          if (newPertandinganInputs.length > 1) {
            newPertandinganInputs.splice(index, 1);
            setPertandinganInputs(newPertandinganInputs);
          } else {
            setPertandinganInputs([{}]);
          }
          getHasilPertandingan();
        })
        .catch((error) => {
          alert("Terjadi kesalahan");
          console.log(error);
        });
    } else {
      alert("Pastikan data pertandingan lengkap dan benar");
    }
  };

  return (
    <div>
      <NavbarSepakBola />
      <div>
        <Form>
          {pertandinganInputs.map((pertandinganInput, index) => (
            <Row key={index}>
              <Col>
                <Form.Select
                  name="klub_tuan_rumah_id"
                  value={pertandinganInput.klub_tuan_rumah_id || ""}
                  required
                  onChange={(e) => handleChangePertandingan(index, e)}
                >
                  <option>Pilih Klub</option>
                  {klubs.map((klub, index) => (
                    <option key={index} value={klub.id}>
                      {klub.nama}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    name="skor_tuan_rumah"
                    value={pertandinganInput.skor_tuan_rumah || ""}
                    placeholder="Skor"
                    required
                    onChange={(e) => handleChangePertandingan(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    name="skor_tamu"
                    value={pertandinganInput.skor_tamu || ""}
                    placeholder="Skor"
                    required
                    onChange={(e) => handleChangePertandingan(index, e)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Select
                  name="klub_tamu_id"
                  value={pertandinganInput.klub_tamu_id || ""}
                  required
                  onChange={(e) => handleChangePertandingan(index, e)}
                >
                  <option>Pilih Klub</option>
                  {klubs.map((klub, index) => (
                    <option key={index} value={klub.id}>
                      {klub.nama}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <div>
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => addOnePertandingan(index)}
                  >
                    Submit Pertandingan {index + 1}
                  </Button>
                </div>
              </Col>
            </Row>
          ))}
          <div className="mb-3">
            <Button variant="primary" type="button" onClick={handleAddInput}>
              Tambah Form Hasil Pertandingan
            </Button>
          </div>
          <div className="mb-3">
            <Button
              variant="primary"
              type="button"
              onClick={addAllPertandingan}
            >
              Submit Semua
            </Button>
          </div>
        </Form>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Klub Tuan Rumah</th>
            <th scope="col">Skor</th>
            <th scope="col">Klub Away</th>
          </tr>
        </thead>
        <tbody>
          {pertandingan.map((hasil, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{hasil.klub_tuan_rumah_nama || "Loading"}</td>
              <td>
                {hasil.skor_tuan_rumah} - {hasil.skor_tamu}
              </td>
              <td>{hasil.klub_tamu_nama || "Loading"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
