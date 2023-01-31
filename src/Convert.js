import { useState, useEffect, useCallback } from "react";
import * as React from "react";
import {
  Worker,
  Viewer,
  ScrollMode,
  PasswordStatus,
} from "@react-pdf-viewer/core";
import type { RenderProtectedViewProps } from "@react-pdf-viewer/core";
import type { DocumentAskPasswordEvent } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import OpenPDF from "react-password-protected-pdf-viewer";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";
import Base64 from "./Base64.json";
import JSONtest from "./JSONtest.json";
import JSONtestComplex from "./JSONtestComplex.json";
import { Col, Container, FormGroup, Label, Row } from "reactstrap";
import moment from "moment";
import "moment-timezone";

const ProtectedView: React.FC<RenderProtectedViewProps> = ({
  passwordStatus,
  verifyPassword,
}) => {
  const [password, setPassword] = useState("");
  const submit = (): void => verifyPassword(password);

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div style={{ width: "20rem" }}>
        <div style={{ marginBottom: "0.5rem" }}>
          {/* Input to enter the password */}
          <FormGroup>
            <input
              name="password"
              type="password"
              value={password}
              onChange={setPassword}
            />
          </FormGroup>
        </div>

        {/* Tell users if the password is incorrect */}
        {passwordStatus === passwordStatus.WrongPassword && (
          <div style={{ color: "c02424", marginBottom: "0.5rem" }}>
            The password is invalid. Please try again!
          </div>
        )}

        {/* Submit the password */}
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

const Convert = () => {
  const [urlPDF, setUrlPDF] = useState();
  const [filenamePDF, setFilenamePDF] = useState();
  const [listFont, setListFont] = useState();
  const [optFont, setOptFont] = useState();
  const [fontPDF, setFontPDF] = useState();
  const [fontSizePDF, setFontSizePDF] = useState();
  const [imageb64, setImageb64] = useState();
  const [password, setPassword] = useState();
  const [isImage, setIsImage] = useState(false);
  const [isHeader, setIsHeader] = useState(false);
  const [isFooter, setIsFooter] = useState(false);
  const [isAuthenticate, setIsAuthenticate] = useState(false);
  const [isWrongPass, setIsWrongPass] = useState(false);
  const [jsonData, setJsonData] = useState();
  const [isViewPDF, setIsViewPDF] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const pdf = new jsPDF("p", "pt", "a4");

  const handleAskPassword = (e: DocumentAskPasswordEvent) => {
    e.verifyPassword("123456");
  };

  const handleSubmitPassword = () => {
    if (password === "123456") {
      setIsAuthenticate(true);
    } else {
      setIsWrongPass(true);
    }
  };

  const handleChangeFontSize = (fontSize) => {
    setFontSizePDF(fontSize);
    GeneratePDFv2(jsonData, isHeader, isFooter, fontPDF, fontSize);
  };

  const handleChangeFont = (font) => {
    setFontPDF(font);
    GeneratePDFv2(jsonData, isHeader, isFooter, font, fontSizePDF);
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

  const GeneratePDFv2 = (data, isHeader, isFooter, font, fontSize) => {
    let length = 40;
    let initLength = 0;
    pdf.setFont(font, "normal");
    pdf.setFontSize(parseInt(fontSize));
    length = length + 40;
    initLength = length;
    pdf.text(50, length, "Date");
    pdf.text(120, length, ":");
    pdf.text(140, length, data.date);
    length = length + 20;
    pdf.text(50, length, "Name");
    pdf.text(120, length, ":");
    pdf.text(140, length, data.client.contact.name);
    length = length + 20;
    pdf.text(50, length, "Phone");
    pdf.text(120, length, ":");
    pdf.text(140, length, data.client.contact.phone);
    length = length + 20;
    pdf.text(50, length, "Email");
    pdf.text(120, length, ":");
    pdf.text(140, length, data.client.contact.email);
    length = length + 20;
    pdf.text(50, length, "Address");
    pdf.text(120, length, ":");
    pdf.text(
      140,
      length,
      data.client.contact.address.street +
        ", " +
        data.client.contact.address.city +
        ","
    );
    length = length + 20;
    pdf.text(
      140,
      length,
      data.client.contact.address.state + " " + data.client.contact.address.zip
    );

    if (data.pages.length > 1) {
      for (var i = 1; i < data.pages.length; i++) {
        pdf.addPage();
      }
    }
    if (isImage) {
      pdf.addPage();
    }
    data.pages.forEach((pages) => {
      if (pages.page === 1) {
        pdf.setPage(pages.page);
        const columnsMain = Object.keys(pages.data);
        const columns1 = Object.keys(pages.data.cashflow[0]);
        const columns2 = Object.keys(pages.data.networth[0]);
        let rows1 = [];
        pages.data.cashflow.forEach((element) => {
          let tmp1 = [element.income, element.expenses];
          rows1.push(tmp1);
        });
        let rows2 = [];
        pages.data.networth.forEach((element) => {
          let tmp2 = [element.assets, element.liabilities];
          rows2.push(tmp2);
        });
        length = length + 40;
        pdf.text(50, length, columnsMain[0] + ":");
        length = length + 20;
        pdf.autoTable(columns1, rows1, {
          startY: length,
          theme: "grid",
          styles: {
            font: font,
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
            font: font,
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
        length = initLength;
        let columnsMain2 = Object.keys(pages.data);
        let columns3 = Object.keys(pages.data.budget[0]);
        let columns4 = Object.keys(pages.data.insurance[0]);
        let rows3 = [];
        pages.data.budget.forEach((element) => {
          let tmp3 = [
            element.monthly_income,
            element.monthly_expenses,
            element.savings,
          ];
          rows3.push(tmp3);
        });
        let rows4 = [];
        pages.data.insurance.forEach((element) => {
          let tmp4 = [element.product, element.coverage, element.premium];
          rows4.push(tmp4);
        });
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
            font: font,
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
            font: font,
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
        length = initLength;
        pdf.addImage(imageb64, "JPEG", 30, length, 300, 0);
      }
    });

    const pageCount = pdf.internal.getNumberOfPages();
    const pageSize = pdf.internal.pageSize;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      if (isHeader) {
        const header = data.title;
        pdf.text(50, 40, header, { baseline: "top" });
      }
      if (isFooter) {
        const footer = `Page ${i} of ${pageCount}`;
        pdf.text(
          pageWidth / 2 - pdf.getTextWidth(footer) / 2,
          pageHeight - 15,
          footer,
          { baseline: "bottom" }
        );
      }
    }
    setUrlPDF(pdf.output("dataurlstring", "filename"));
  };

  const Print = async (filename) => {
    GeneratePDFv2(jsonData, isHeader, isFooter, fontPDF, fontSizePDF);
    let name_file;
    if (filename) {
      name_file = filename;
    } else {
      name_file =
        "convert_json_to_pdf_" +
        moment(new Date()).tz("Asia/Jakarta").format("DD-MM-YYYY HH:mm:ss.SSS");
    }
    pdf.save(name_file + ".pdf");
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
    setFontSizePDF(16);
    setJsonData(JSONtestComplex.report);
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
              <Row>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.2.146/build/pdf.worker.min.js">
                  {isViewPDF && (
                    <div>
                      {!isAuthenticate && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <div style={{ width: "20rems" }}>
                            <div style={{ marginBottom: "0.5rem" }}>
                              <label>PASSWORD</label>
                              <FormGroup>
                                <input
                                  name="password"
                                  type={"password"}
                                  value={password}
                                  onChange={(event) => {
                                    setPassword(event.target.value);
                                  }}
                                />
                              </FormGroup>
                            </div>
                            {isWrongPass && (
                              <div
                                style={{
                                  color: "c02424",
                                  marginBottom: "0.5rem",
                                }}
                              >
                                The password is invalid. Please try again!
                              </div>
                            )}
                            <button onClick={() => handleSubmitPassword()}>
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                      {isAuthenticate && (
                        <div style={{ height: "750px" }}>
                          <Viewer
                            fileUrl={urlPDF}
                            renderProtectedView={(renderProps) => (
                              <ProtectedView {...renderProps} />
                            )}
                            onDocumentAskPassword={handleAskPassword}
                            // plugins={[defaultLayoutPluginInstance]}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {!isViewPDF && <div></div>}
                </Worker>
              </Row>
              {jsonData && (
                <Row>
                  <Editor
                    value={jsonData}
                    onChange={(event) => {
                      setJsonData(event);
                      GeneratePDFv2(
                        event,
                        isHeader,
                        isFooter,
                        fontPDF,
                        fontSizePDF
                      );
                    }}
                  />
                </Row>
              )}
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
                          accept="image/*"
                          onChange={(event) => {
                            handleChangeAttachment(event.target.files[0]);
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {isViewPDF && (
                    <div>
                      <Row
                        style={{
                          display: "flex",
                          columnGap: "20px",
                          marginTop: "0.5rem",
                        }}
                      >
                        <Col>
                          <label>
                            <input
                              name="header"
                              type={"checkbox"}
                              checked={isHeader}
                              onChange={(event) => {
                                setIsHeader(event.target.checked);
                                GeneratePDFv2(
                                  jsonData,
                                  event.target.checked,
                                  isFooter,
                                  fontPDF,
                                  fontSizePDF
                                );
                              }}
                            />
                            HEADER
                          </label>
                        </Col>
                        <Col>
                          <label>
                            <input
                              name="footer"
                              type={"checkbox"}
                              checked={isFooter}
                              onChange={(event) => {
                                setIsFooter(event.target.checked);
                                GeneratePDFv2(
                                  jsonData,
                                  isHeader,
                                  event.target.checked,
                                  fontPDF,
                                  fontSizePDF
                                );
                              }}
                            />
                            FOOTER
                          </label>
                        </Col>
                      </Row>
                    </div>
                  )}
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
                      GeneratePDFv2(
                        jsonData,
                        isHeader,
                        isFooter,
                        fontPDF,
                        fontSizePDF
                      );
                    }}
                  >
                    GENERATE
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Convert;
