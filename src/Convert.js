import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Base64 from "./Base64.json";
import JSONtest from "./JSONtest.json";
import JSONtestComplex from "./JSONtestComplex.json";
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import moment from "moment";
import "moment-timezone";
// var qpdf = require("node-qpdf");

function Convert() {
  const [urlPDF, setUrlPDF] = useState();
  const [filenamePDF, setFilenamePDF] = useState();
  const [listFont, setListFont] = useState();
  const [optFont, setOptFont] = useState();
  const [fontPDF, setFontPDF] = useState();
  const [imageb64, setImageb64] = useState();
  const [isImage, setIsImage] = useState(false);
  const [imageType, setImageType] = useState();
  const [isViewPDF, setIsViewPDF] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdf = new jsPDF("p", "pt", "a4");

  const handleChangeFontSize = (fontSize) => {
    pdf.setFontSize(parseInt(fontSize));
    GeneratePDFv2();
  };

  const handleChangeFont = (font) => {
    setFontPDF(font);
    pdf.setFont(font, "normal");
    GeneratePDFv2();
  };

  const handleChangeAttachment = async (attachment) => {
    await getBase64(attachment);
  };

  const getBase64 = (file) => {
    let resultBase64 = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resultBase64 = reader.result;
      setImageb64(resultBase64);
    };
  };

  const GeneratePDF = () => {
    let length = 0;
    let initLength = 0;
    length = length + 40;
    pdf.text(200, length, JSONtest.report.title);
    length = length + 40;
    initLength = length;
    pdf.text(50, length, "Date");
    pdf.text(180, length, ":");
    pdf.text(190, length, JSONtest.report.date);
    length = length + 20;
    pdf.text(50, length, "Name");
    pdf.text(180, length, ":");
    pdf.text(190, length, JSONtest.report.client.name);
    length = length + 20;
    pdf.text(50, length, "Account Number");
    pdf.text(180, length, ":");
    pdf.text(190, length, JSONtest.report.client.account_number);

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
        length = length + 40;
        pdf.autoTable(columns, rows, {
          startY: length,
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
        length = initLength;
        let tmpRecommend = pages.summary.recommendations.split(",");
        pdf.text(50, length, "Recommendations:");
        length = length + 20;
        pdf.text(30, length, tmpRecommend[0] + ",");
        length = length + 20;
        pdf.text(30, length, tmpRecommend[1].slice(1));
      }
      if (isImage) {
        pdf.addPage();
        pdf.setPage(3);
        length = initLength;
        pdf.addImage(imageb64, "JPEG", 30, length, 450, 0);
      }
    });
    setUrlPDF(pdf.output("datauri", "filename"));
  };

  const GeneratePDFv2 = () => {
    let length = 0;
    let initLength = 0;
    length = length + 40;
    pdf.text(200, length, JSONtestComplex.report.title);
    length = length + 40;
    initLength = length;
    pdf.text(50, length, "Date");
    pdf.text(120, length, ":");
    pdf.text(140, length, JSONtestComplex.report.date);
    length = length + 20;
    pdf.text(50, length, "Name");
    pdf.text(120, length, ":");
    pdf.text(140, length, JSONtestComplex.report.client.contact.name);
    length = length + 20;
    pdf.text(50, length, "Phone");
    pdf.text(120, length, ":");
    pdf.text(140, length, JSONtestComplex.report.client.contact.phone);
    length = length + 20;
    pdf.text(50, length, "Email");
    pdf.text(120, length, ":");
    pdf.text(140, length, JSONtestComplex.report.client.contact.email);
    length = length + 20;
    pdf.text(50, length, "Address");
    pdf.text(120, length, ":");
    pdf.text(
      140,
      length,
      JSONtestComplex.report.client.contact.address.street +
        ", " +
        JSONtestComplex.report.client.contact.address.city +
        ","
    );
    length = length + 20;
    pdf.text(
      140,
      length,
      JSONtestComplex.report.client.contact.address.state +
        " " +
        JSONtestComplex.report.client.contact.address.zip
    );

    if (JSONtestComplex.report.pages.length > 1) {
      for (var i = 1; i < JSONtestComplex.report.pages.length; i++) {
        pdf.addPage();
      }
    }
    if (isImage) {
      pdf.addPage();
    }
    JSONtestComplex.report.pages.forEach((pages) => {
      if (pages.page === 1) {
        pdf.setPage(pages.page);
        pdf.text(250, 820, "page " + pages.page);
        const columnsMain = Object.keys(pages.data);
        const columns1 = Object.keys(pages.data.cashflow);
        const columns2 = Object.keys(pages.data.networth);
        let rows1 = [];
        let tmp1 = [pages.data.cashflow.income, pages.data.cashflow.expenses];
        rows1.push(tmp1);
        let rows2 = [];
        let tmp2 = [
          pages.data.networth.assets,
          pages.data.networth.liabilities,
        ];
        rows2.push(tmp2);
        length = length + 40;
        pdf.text(50, length, columnsMain[0] + ":");
        length = length + 20;
        pdf.autoTable(columns1, rows1, {
          startY: length,
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
          didDrawPage: (d) => (length = d.cursor.y),
        });
        length = length + 40;
        pdf.text(50, length, columnsMain[1] + ":");
        length = length + 20;
        pdf.autoTable(columns2, rows2, {
          startY: length,
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
          didDrawPage: (d) => (length = d.cursor.y),
        });
      } else if (pages.page === 2) {
        pdf.setPage(pages.page);
        pdf.text(250, 820, "page " + pages.page);
        length = initLength;
        let columnsMain2 = Object.keys(pages.data);
        let columns3 = Object.keys(pages.data.budget);
        let columns4 = Object.keys(pages.data.insurance);
        let rows3 = [];
        let tmp3 = [
          pages.data.budget.monthly_income,
          pages.data.budget.monthly_expenses,
          pages.data.budget.savings,
        ];
        rows3.push(tmp3);
        let rows4 = [];
        let tmp4 = [
          pages.data.insurance.product,
          pages.data.insurance.coverage,
          pages.data.insurance.premium,
        ];
        rows4.push(tmp4);
        pdf.text(50, length, columnsMain2[0] + ":");
        pages.data.priorities.forEach((element) => {
          length = length + 20;
          pdf.text(50, length, "- " + element);
        });
        length = length + 40;
        pdf.text(50, length, columnsMain2[1] + ":");
        length = length + 20;
        pdf.autoTable(columns3, rows3, {
          startY: length,
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
          didDrawPage: (d) => (length = d.cursor.y),
        });
        length = length + 40;
        pdf.text(50, length, columnsMain2[2] + ":");
        length = length + 20;
        pdf.autoTable(columns4, rows4, {
          startY: length,
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
          didDrawPage: (d) => (length = d.cursor.y),
        });
        length = length + 40;
        let tmpRecommend = pages.data.recommendations.split(",");
        pdf.text(50, length, columnsMain2[3] + ":");
        length = length + 20;
        pdf.text(30, length, tmpRecommend[0] + ",");
        length = length + 20;
        pdf.text(30, length, tmpRecommend[1].slice(1));
      }
      if (isImage) {
        pdf.setPage(3);
        pdf.text(250, 820, "page " + 3);
        length = initLength;
        pdf.addImage(imageb64, "JPEG", 30, length, 300, 0);
      }
    });
    setUrlPDF(pdf.output("datauri", "filename"));
  };

  const Print = async (filename) => {
    GeneratePDFv2();
    let name_file;
    if (filename) {
      name_file = filename;
    } else {
      name_file =
        "convert_json_to_pdf_" +
        moment(new Date()).tz("Asia/Jakarta").format("DD-MM-YYYY HH:mm:ss.SSS");
    }
    pdf.save(name_file + ".pdf");
    // var options = {
    //   keyLength: 40,
    //   password: "007007007",
    // };
    // await qpdf.encrypt(
    //   "C:/Users/user/Downloads/" + name_file + ".pdf",
    //   options,
    //   "C:/Users/user/Downloads/" + name_file + "_encrypted.pdf"
    // );
  };

  useEffect(() => {
    if (imageb64) {
      setIsImage(true);
    } else {
      setIsImage(false);
    }
  }, [imageb64]);

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
    pdf.setFontSize(16);
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
              <Row style={{ display: "flex", justifyContent: "center" }}>
                <Col>
                  <Row>
                    <Col>
                      <label>FILENAME</label>
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
                  <Row
                    style={{
                      display: "flex",
                      columnGap: "20px",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Col>
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
                    <Col>
                      <label>SIZE</label>
                      <FormGroup>
                        <select
                          defaultValue={""}
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
                        </select>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      marginTop: "0.5rem",
                    }}
                  >
                    <Col>
                      <label>IMAGE ATTACHMENT</label>
                      <FormGroup>
                        <input
                          name="attachment"
                          type={"file"}
                          accept=".jpeg, .png"
                          onChange={(event) => {
                            handleChangeAttachment(event.target.files[0]);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row
                style={{
                  display: "flex",
                  columnGap: "20px",
                  marginTop: "1rem",
                  marginBottom: "3rem",
                  justifyContent: "center",
                }}
              >
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
                <Col>
                  <button
                    onClick={() => {
                      setIsViewPDF(true);
                      GeneratePDFv2();
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
                      <Row>
                        <h4 style={{ fontWeight: "bold" }}>JSON VIEW:</h4>
                      </Row>
                      <Row>
                        <pre>{JSON.stringify(JSONtestComplex, null, 2)}</pre>
                      </Row>
                      <Row>
                        <h4 style={{ fontWeight: "bold" }}>PDF VIEW:</h4>
                      </Row>
                      <Row>
                        <Viewer
                          fileUrl={urlPDF}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      </Row>
                    </div>
                  )}
                  {!isViewPDF && <div></div>}
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
