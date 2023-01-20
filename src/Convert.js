import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Base64 from "./Base64.json";
import JSONtest from "./JSONtest.json";
import { Col, Container, FormGroup, Row } from "reactstrap";
// var qpdf = require("node-qpdf");

function Convert() {
  const [urlPDF, setUrlPDF] = useState();
  const [filenamePDF, setFilenamePDF] = useState();
  const [listFont, setListFont] = useState();
  const [optFont, setOptFont] = useState();
  const [fontPDF, setFontPDF] = useState();
  const [fontSizePDF, setFontSizePDF] = useState();
  const [isViewPDF, setIsViewPDF] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdf = new jsPDF("p", "pt", "a4");
  const options = {
    keyLength: 128,
    password: "007007",
  };

  const handleChangeFontSize = (fontSize) => {
    pdf.setFontSize(parseInt(fontSize));
    GeneratePDF();
  };

  const handleChangeFont = (font) => {
    setFontPDF(font);
    pdf.setFont(font, "normal");
    GeneratePDF();
  };

  const GeneratePDF = () => {
    pdf.text(200, 40, JSONtest.report.title);
    pdf.text(50, 80, "Date");
    pdf.text(180, 80, ":");
    pdf.text(190, 80, JSONtest.report.date);
    pdf.text(50, 100, "Name");
    pdf.text(180, 100, ":");
    pdf.text(190, 100, JSONtest.report.client.name);
    pdf.text(50, 120, "Account Number");
    pdf.text(180, 120, ":");
    pdf.text(190, 120, JSONtest.report.client.account_number);

    if (JSONtest.report.pages.length > 1) {
      for (var i = 1; i < JSONtest.report.pages.length; i++) {
        pdf.addPage();
      }
    }
    JSONtest.report.pages.forEach((pages) => {
      if (pages.page === 1) {
        pdf.setPage(pages.page);
        const columns = Object.keys(pages.data[0]);
        let rows = [];
        pages.data.forEach((element) => {
          let tmp = [element.category, element.amount];
          rows.push(tmp);
        });
        pdf.autoTable(columns, rows, {
          startY: 140,
          theme: "grid",
          styles: {
            font: "times",
            halign: "center",
            cellPadding: 3.5,
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            textColor: [0, 0, 0],
          },
          headStyles: {
            textColor: [0, 0, 0],
            fontStyle: "normal",
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            fillColor: [166, 204, 247],
          },
          alternateRowStyles: {
            fillColor: [212, 212, 212],
            textColor: [0, 0, 0],
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
          },
          rowStyles: {
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
          },
          tableLineColor: [0, 0, 0],
        });
      } else if (pages.page === 2) {
        pdf.setPage(pages.page);
        // pdf.text(50, 140, "Recommendation");
        // pdf.text(180, 140, ":");
        pdf.text(30, 140, pages.summary.recommendations);
      }
    });
    setUrlPDF(pdf.output("datauri", "filename"));
  };

  const Print = (filename) => {
    GeneratePDF();
    // if (filename) {
    //   pdf.save(filename);
    // } else {
    //   pdf.save(" ");
    // }
    // qpdf.encrypt(urlPDF, options);
  };

  useEffect(() => {
    if (listFont) {
      let tmp = [];
      Object.keys(listFont).forEach((font) => {
        let tmpFont = font.toUpperCase();
        if (
          !tmp.find((value) => value.fontName === tmpFont) &&
          tmpFont !== "SYMBOL" &&
          tmpFont !== "ZAPFDINGBATS"
        ) {
          tmp.push({ fontName: tmpFont });
        }
      });
      setOptFont(tmp);
    }
  }, [listFont]);

  useEffect(() => {
    setIsViewPDF(false);
    setListFont(pdf.getFontList());
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Row style={{ textAlign: "center" }}>
                <h2>CONVERT JSON TO PDF</h2>
              </Row>
              <Row style={{ justifyContent: "center" }}>
                <Col md={8}>
                  <Row>
                    <Col>
                      <label>FILENAME </label>
                      <FormGroup>
                        <input
                          name="filename"
                          type={"text"}
                          onChange={(event) => {
                            setFilenamePDF(event.target.value);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={5}>
                      <label>FONT</label>
                      <FormGroup>
                        <select
                          defaultValue={""}
                          value={fontPDF}
                          onChange={(event) => {
                            handleChangeFont(event.target.value);
                          }}
                        >
                          <option value={""} disabled>
                            ...
                          </option>
                          {optFont &&
                            optFont.map((value, index) => (
                              <option
                                key={index}
                                value={value.fontName.toLowerCase()}
                              >
                                {value.fontName}
                              </option>
                            ))}
                        </select>
                      </FormGroup>
                    </Col>
                    <Col md={5}>
                      <label>FONT SIZE</label>
                      <FormGroup>
                        <select
                          defaultValue={""}
                          value={fontSizePDF}
                          onChange={(event) => {
                            handleChangeFontSize(event.target.value);
                          }}
                        >
                          <option value={""} disabled>
                            ...
                          </option>
                          <option value={8}>8</option>
                          <option value={10}>10</option>
                          <option value={12}>12</option>
                          <option value={14}>14</option>
                          <option value={16}>16</option>
                          {/* {optFont &&
                            optFont.map((value, index) => (
                              <option
                                key={index}
                                value={value.fontName.toLowerCase()}
                              >
                                {value.fontName}
                              </option>
                            ))} */}
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row></Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button
                    onClick={() => {
                      setIsViewPDF(true);
                      Print(filenamePDF);
                    }}
                  >
                    PRINT
                  </button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button
                    onClick={() => {
                      setIsViewPDF(true);
                      GeneratePDF();
                    }}
                  >
                    GENERATE
                  </button>
                </Col>
              </Row>
              <Row>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
                  {isViewPDF && (
                    <div>
                      <Viewer
                        fileUrl={urlPDF}
                        plugins={[defaultLayoutPluginInstance]}
                      />
                    </div>
                  )}
                  {!isViewPDF && <div>No PDF</div>}
                </Worker>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Convert;
