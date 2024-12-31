"use client";
// Remove the import if not explicitly using React
import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useFormik } from "formik";


export default function Home() {
  const InvoiceForm = () => {
    const [activeTab, setActiveTab] = useState("vendor");
    const vendorRef = useRef(null);
    const invoiceRef = useRef(null);
    const commentsRef = useRef(null);
    const [comments, setComments] = useState("");
    const [setUploadedFile] = useState(null);

    const scrollToSection = (useRef) => {
      useRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setUploadedFile(file);
        alert(`File uploaded: ${file.name}`);
      }
    };

    const initialValues = {
      vendor: "",
      purchaseOrderNumber: "",
      invoiceNumber: "",
      totalAmount: "",
      invoiceDate: "",
      dueDate: "",
      postDate: "",
      terms: "",
      description: "",
      comments: "",
    };

    const handleCommentSubmit = () => {
      if (comments.trim()) {
        alert(`Comment submitted: ${comments}`);
        setComments("");
        localStorage.setItem("invoiceComments", comments);
      } else {
        alert("Please enter a comment.");
      }
    };

    const validationSchema = Yup.object({
      vendor: Yup.string().required("Vendor is required"),
      purchaseOrderNumber: Yup.string().required(
        "Purchase Order Number is required"
      ),
      invoiceNumber: Yup.string().required("Invoice Number is required"),
      totalAmount: Yup.number().required("Total Amount is required").positive(),
      terms: Yup.string().required("Payment terms is required"),
      dueDate: Yup.date().required("Due Date is required"),
      postDate: Yup.date().required("GL Post Date is required"),
      invoiceDate: Yup.date().required("Invoice Date is required"),
      description: Yup.string().required("Description is required"),
      comments: Yup.string().required("Comments are required"),
    });

    const handleSubmit = (values, { resetForm }) => {
      console.log("Form Data:", values);
      localStorage.setItem("invoicedata", JSON.stringify(values));
      resetForm({ values: initialValues });
      alert("Invoice form submitted");
    };

    const [isDollarActive, setIsDollarActive] = useState(true);

    const [fields, setFields] = useState([]);

    const addFields = () => {
      setFields([...fields, { field1: "", field2: "" }]);
    };

    const handleInputChange = (index, field, value) => {
      const updatedFields = [...fields];
      updatedFields[index][field] = value;
      setFields(updatedFields);
    };
    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    };

    const handleSaveDraft = (values) => {
      console.log("Draft saved:", values);
      alert("Your data has been saved as a draft!");
    };

    const handleSubmitAndNew = (values, resetForm) => {
      console.log("Form submitted:", values);
      alert("Form submitted successfully!");
      resetForm();
    };

    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      onSubmit: (values, { resetForm }) => {
        console.log("Form submitted:", values);
        alert("Form submitted successfully!");
        resetForm();
      },
    });
    return (
      <div className="flex gap-3 w-full h-full bg-black p-5 justify-center items-center">
        <div className="grid grid-cols-2 w-[1440px] bg-white h-full">
          <div className=" w-[684px] ">
            <div className="flex flex-col gap-4 ml-7">
              <div className="flex items-center gap-5 pt-8 pb-4">
                <img
                  src="/ba.png"
                  alt="left-arrow"
                  width={24}
                  height={24}
                />
                <h5 className="text-[20px] font-semibold leading-[28px] tracking-[-2%]">
                  Create New Invoice
                </h5>
              </div>

              <div className="border-2 border-dashed border-[#64748B] flex flex-col h-[844px] w-[684px] rounded-lg justify-center items-center gap-5 p-3">
                <div className="flex flex-col items-center gap-2">
                  <p className="font-semibold text-[20px]">
                    Upload your Invoice
                  </p>
                  <span className="font-normal text-[16px]">
                    To auto-populate fields and save time
                  </span>
                  <img
                    src="/gif.gif"
                    alt="alt"
                    width={320}
                    height={320}
                  />
                </div>

                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="border p-3 rounded-lg flex items-center justify-center gap-2 w-[153px] h-[48px] hover:bg-gray-200 cursor-pointer"
                >
                  <span className="text-[16px]">Upload File</span>
                  <img
                    src="/ul.png"
                    alt="upload-icon"
                    width="20"
                    height="20"
                  />
                </label>
                <span className="text-[14px] font-normal text-center">
                  <span className="text-blue-500 font-semibold">
                    Click to upload
                  </span>{" "}
                  or Drag and drop
                </span>
              </div>
            </div>
          </div>

          <div className="h-full w-full overflow-hidden">
            <div className="invoice-form-container flex flex-col justify-center h-full ">
              <div className="tabs flex items-center ml-3 pt-6 pb-4">
                <button
                  type="button"
                  className={`p-3 ${
                    activeTab === "vendor"
                      ? "text-blue-500 border-b border-blue-500"
                      : "text-gray-500 border-none"
                  }`}
                  onClick={() => {
                    setActiveTab("vendor");
                    scrollToSection(vendorRef);
                  }}
                >
                  Vendor Details
                </button>
                <button
                  type="button"
                  className={`p-3 ${
                    activeTab === "invoice"
                      ? "text-blue-500 border-b border-blue-500"
                      : "text-gray-500 border-none"
                  }`}
                  onClick={() => {
                    setActiveTab("invoice");
                    scrollToSection(invoiceRef);
                  }}
                >
                  Invoice Details
                </button>
                <button
                  type="button"
                  className={`p-3 ${
                    activeTab === "comments"
                      ? "text-blue-500 border-b border-blue-500"
                      : "text-gray-500 border-none"
                  }`}
                  onClick={() => {
                    setActiveTab("comments");
                    scrollToSection(commentsRef);
                  }}
                >
                  Comments
                </button>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex items-center mr-5 gap-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  <FiLogOut size={20} />
                </button>
              </div>

              <div className="ml-3 overflow-y-auto h-[calc(100vh-80px)]">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div ref={vendorRef} className="section  pb-3 w-[684px]">
                        <div className="flex items-center">
                          <img
                            src="/ic-1.png?v=1"
                            width={50}
                            height={50}
                            alt="vendor"
                          ></img>
                          <h2 className="text-[24px]  font-semibold ml-4 leading-[32px] tracking-[-2%]">
                            Vendor Details
                          </h2>
                        </div>

                        <h5 className="font-semibold text-[20px] pt-5 leading-[28px] tracking-[-2%]">
                          Vendor Information
                        </h5>
                        <div className="flex flex-col gap-2 pt-2">
                          <label className="text-[14px] font-normal text-gray-400 leading-[16px]">
                            Vendor <span className="text-red-500">*</span>{" "}
                          </label>
                          <Field
                            name="vendor"
                            as="select"
                            className="w-[684px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                            style={{
                              backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 12px center",
                              backgroundSize: "16px",
                            }}
                          >
                            <option value="" disabled>
                              Select Vendor
                            </option>
                            <option value="vendor1">Vendor 1</option>
                            <option value="vendor2">Vendor 2</option>
                            <option value="vendor3">Vendor 3</option>
                          </Field>

                          {errors.vendor && touched.vendor && (
                            <div className="error">{errors.vendor}</div>
                          )}
                          <label className="text-[14px] font-normal p-0 m-0 text-gray-400 leading-[16px]">
                            550 main St., Lynn
                          </label>
                        </div>
                        <div className="flex justify-center">
                          <details className="p-3 rounded-lg">
                            <summary className="cursor-pointer text-[14px] font-normal text-blue-500 list-none leading-[16px]">
                              <span className="mr-2 text-blue-500">▼</span>
                              View Vendor Details
                            </summary>
                            <div className="mt-3 text-[14px]">
                              <p>
                                <strong>Vendor Name:</strong> Vendor 1
                              </p>
                              <p>
                                <strong>Contact:</strong> 123-456-7890
                              </p>
                              <p>
                                <strong>Address:</strong> 550 Main St., Lynn
                              </p>
                              <p>
                                <strong>Email:</strong> vendor1@example.com
                              </p>
                            </div>
                          </details>
                        </div>
                      </div>

                      <div ref={invoiceRef} className="section pb-3 w-[684px] ">
                        <div className="flex gap-5 items-center">
                          <img
                            src="/ic-2.png"
                            width={50}
                            height={50}
                            alt="invoice"
                          ></img>
                          <h2 className="text-[24px] font-semibold leading-[32px]  tracking-[-2%]">
                            Invoice Details
                          </h2>
                        </div>
                        <h5 className="font-semibold text-[20px] pt-5">
                          General Information
                        </h5>

                        <div className="flex flex-col gap-2 mt-3">
                          <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                            Purchase Order Number{" "}
                            <span className="text-red-500">*</span>{" "}
                          </label>
                          <Field
                            name="purchaseOrderNumber"
                            as="select"
                            className="w-[332px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                            style={{
                              backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 12px center",
                              backgroundSize: "16px",
                            }}
                          >
                            <option value="" disabled>
                              Select PO Number
                            </option>
                            <option value="po1">PO 1</option>
                            <option value="po2">PO 2</option>
                            <option value="po3">PO 3</option>
                          </Field>
                          {errors.vendor && touched.vendor && (
                            <div className="error">{errors.vendor}</div>
                          )}
                        </div>

                        <h5 className="font-semibold text-[20px] mt-5">
                          Invoice Details
                        </h5>
                        <div className="grid grid-cols-2">
                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Invoice Number{" "}
                              <span className="text-red-500">*</span>{" "}
                            </label>
                            <Field
                              name="invoiceNumber"
                              as="select"
                              className="w-[332px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                              style={{
                                backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                              }}
                            >
                              <option value="" disabled>
                                Select Invoice Number
                              </option>
                              <option value="po1">Invoice 1</option>
                              <option value="po2">Invoice 2</option>
                              <option value="po3">Invoice 3</option>
                            </Field>
                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Invoice Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-lg w-[332px] h-[40px] px-2">
                              <Field
                                name="invoiceDate"
                                type="date"
                                className="w-full h-full border px-1 text-sm focus:outline-none bg-transparent text-gray-500 rounded-lg"
                                style={{
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  appearance: "none",
                                }}
                              />
                            </div>
                            {errors.invoiceDate && touched.invoiceDate && (
                              <div className="error text-red-500">
                                {errors.invoiceDate}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3 w-full">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Total Amount{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border rounded-lg h-[40px] overflow-visible w-full max-w-[332px]">
                              <span className="bg-gray-300 px-3 text-gray-400 h-full flex items-center">
                                $
                              </span>
                              <Field
                                name="totalAmount"
                                type="number"
                                className="flex-grow px-2 h-full text-sm "
                                placeholder="0.00"
                              />
                              <span className="text-gray-400 px-3 text-xs h-full flex items-center">
                                USD
                              </span>
                            </div>

                            {errors.totalAmount && touched.totalAmount && (
                              <div className="error text-red-500">
                                {errors.totalAmount}
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Payment Terms{" "}
                              <span className="text-red-500">*</span>{" "}
                            </label>
                            <Field
                              name="terms"
                              as="select"
                              className="w-[332px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                              style={{
                                backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                              }}
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              <option value="po1">Payment term 1</option>
                              <option value="po2">Payment term 2</option>
                              <option value="po3">Payment 3</option>
                            </Field>
                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Invoice Due Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-lg w-[332px] h-[40px] px-2">
                              <Field
                                name="dueDate"
                                type="date"
                                className="w-full h-full border px-1 text-sm focus:outline-none bg-transparent text-gray-500 rounded-lg"
                                style={{
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  appearance: "none",
                                }}
                              />
                            </div>
                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              GL Post Date{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="relative rounded-lg w-[332px] h-[40px] px-2">
                              <Field
                                name="dueDate"
                                type="date"
                                className="w-full h-full border px-1 text-sm focus:outline-none bg-transparent text-gray-500 rounded-lg"
                                style={{
                                  WebkitAppearance: "none",
                                  MozAppearance: "none",
                                  appearance: "none",
                                }}
                              />
                            </div>
                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>
                        </div>

                        <div className="mt-3">
                          <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                            Invoice Description{" "}
                            <span className="text-red-500">*</span>{" "}
                          </label>
                          <Field
                            name="description"
                            className="w-[684px] h-[40px] p-2 border rounded-lg"
                          />
                          {errors.description && touched.description && (
                            <div className="error">{errors.description}</div>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-5">
                          <h5 className="font-semibold text-[20px]">
                            Expense Details
                          </h5>
                          <div className="flex items-center space-x-2">
                            <span className="text-black font-normal text-[18px]">
                              $ 0.00
                            </span>
                            <span className="text-blue-500 font-normal text-[18px]">
                              / $ 0.00
                            </span>
                            <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-full">
                              <button
                                className={`px-3 py-1 rounded-full  ${
                                  isDollarActive
                                    ? "bg-blue-500 text-white"
                                    : "bg-transparent text-gray-500"
                                }`}
                                onClick={() => setIsDollarActive(true)}
                              >
                                $
                              </button>
                              <button
                                className={`px-3 py-1 rounded-full ${
                                  !isDollarActive
                                    ? "bg-blue-500 text-white"
                                    : "bg-transparent text-gray-500"
                                }`}
                                onClick={() => setIsDollarActive(false)}
                              >
                                %
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2">
                          <div className="flex flex-col gap-2 mt-3 w-full">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Line Amount{" "}
                              <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center border rounded-lg h-[40px] overflow-visible w-full max-w-[332px]">
                              <span className="bg-gray-300 px-3 text-gray-400 h-full flex items-center">
                                $
                              </span>
                              <Field
                                name="totalAmount"
                                type="number"
                                className="flex-grow px-2 h-full text-sm "
                                placeholder="0.00"
                              />
                              <span className="text-gray-400 px-3 text-xs h-full flex items-center">
                                USD
                              </span>
                            </div>

                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Department <span className="text-red-500">*</span>{" "}
                            </label>
                            <Field
                              name="department"
                              as="select"
                              className="w-[332px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                              style={{
                                backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                              }}
                            >
                              <option value="" disabled>
                                Select Department
                              </option>
                              <option value="po1">Department 1</option>
                              <option value="po2">Department 2</option>
                              <option value="po3">Department 3</option>
                            </Field>

                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Account <span className="text-red-500">*</span>{" "}
                            </label>
                            <Field
                              name="account"
                              as="select"
                              className="w-[332px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                              style={{
                                backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                              }}
                            >
                              <option value="" disabled>
                                Select Account Number
                              </option>
                              <option value="po1">Account 1</option>
                              <option value="po2">Account 2</option>
                              <option value="po3">Account 3</option>
                            </Field>
                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 mt-3">
                            <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                              Location<span className="text-red-500">*</span>{" "}
                            </label>
                            <Field
                              name="location"
                              as="select"
                              className="w-[332px] h-[40px] p-2 pr-8 border rounded-lg text-sm appearance-none"
                              style={{
                                backgroundImage: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5H7z"/></svg>')`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 12px center",
                                backgroundSize: "16px",
                              }}
                            >
                              <option value="" disabled>
                                Select Location
                              </option>
                              <option value="po1">location 1</option>
                              <option value="po2">location 2</option>
                              <option value="po3">location 3</option>
                            </Field>
                            {errors.vendor && touched.vendor && (
                              <div className="error">{errors.vendor}</div>
                            )}
                          </div>
                        </div>
                        <div className="mt-3">
                          <label className="text-[14px] font-normal text-[#4B5768] leading-[16px]">
                            Description <span className="text-red-500">*</span>{" "}
                          </label>
                          <Field
                            name="description"
                            className="w-[684px] h-[40px] p-2 border rounded-lg"
                          />
                          {errors.description && touched.description && (
                            <div className="error">{errors.description}</div>
                          )}
                        </div>

                        <div>
                          {fields.map((field, index) => (
                            <div
                              key={index}
                              className="flex flex-col gap-2 mt-3"
                            >
                              <input
                                type="text"
                                value={field.text1}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "text1",
                                    e.target.value
                                  )
                                }
                                placeholder="Text 1"
                                className="border rounded p-2"
                              />
                              <input
                                type="text"
                                value={field.text2}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "text2",
                                    e.target.value
                                  )
                                }
                                placeholder="Text 2"
                                className="border rounded p-2"
                              />
                            </div>
                          ))}
                          <div className="flex justify-end mt-3">
                            <button
                              onClick={addFields}
                              className="border rounded-lg p-2 text-black text-[14px] font-normal w-[195px] h-[36px]"
                            >
                              <b>+</b> Add Expense Coding
                            </button>
                          </div>
                        </div>
                      </div>
                      <div ref={commentsRef} className="section pb-[10%]">
                        <div className="flex gap-5 items-center">
                          <img
                            src="/ic-3.png"
                            width={50}
                            height={50}
                            alt="comt"
                          />
                          <h2 className="text-[24px] font-semibold">
                            Comments
                          </h2>
                        </div>

                        <div className="pt-5 pb-5 relative">
                          <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            className="w-[684px] h-[40px] border rounded-lg text-sm p-2"
                            placeholder="Add a comment and use @Name to tag someone"
                          />
                          <button
                            type="button"
                            onClick={handleCommentSubmit}
                            className="absolute right-10 top-1/2 transform -translate-y-1/2"
                          >
                            <img
                              src="/send.png"
                              alt="send"
                              width={20}
                              height={20}
                              className="cursor-pointer"
                            />
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="relative top-2">
            <div className="absolute bottom-0 right-0 left-[98%] bg-white border-t border-[#E7EAEE] rounded-lg flex justify-between items-center p-4 w-[732px] h-[80px] shadow-lg">
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="text-xl flex justify-center items-center p-2 h-[48px] w-[48px]"
                >
                  &#8942;
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="border border-[#64748B] p-2 w-[298px] h-[48px] rounded-lg text-black bg-white"
                  onClick={() => handleSaveDraft(formik.values)}
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="border border-transparent p-2 w-[298px] h-[48px] rounded-lg text-white bg-blue-500"
                  onClick={() =>
                    handleSubmitAndNew(formik.values, formik.resetForm)
                  }
                >
                  Submit & New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return <InvoiceForm />;
}
