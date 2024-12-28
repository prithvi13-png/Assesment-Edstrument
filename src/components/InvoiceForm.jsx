import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/InvoiceForm.css";
import { useEffect } from "react";

const InvoiceForm = () => {
  const initialData = JSON.parse(localStorage.getItem("invoiceData")) || {
    vendor: "",
    purchaseOrder: "",
    invoiceNumber: "",
    invoiceDate: "",
    totalAmount: "",
    paymentTerms: "",
    dueDate: "",
    postDate: "",
    description: "",
    lineAmount: "",
    department: "",
    account: "",
    location: "",
    comments: "",
  };

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      vendor: Yup.string().required("Vendor is required"),
      invoiceNumber: Yup.string().required("Invoice Number is required"),
      invoiceDate: Yup.date().required("Invoice Date is required"),
      totalAmount: Yup.number().required("Total Amount is required"),
      dueDate: Yup.date().required("Invoice Due Date is required"),
      lineAmount: Yup.number().required("Line Amount is required"),
      department: Yup.string().required("Department is required"),
      account: Yup.string().required("Account is required"),
      location: Yup.string().required("Location is required"),
    }),
    onSubmit: (values) => {
      localStorage.setItem("invoiceData", JSON.stringify(values));
      alert("Invoice data saved!");
    },
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) =>
        formik.setFieldValue(key, initialData[key])
      );
    }
  }, []);

  return (
    <div className="invoice-form-container">
      <h1>Create New Invoice</h1>
      <form onSubmit={formik.handleSubmit} className="invoice-form">
        {/* Vendor Details */}
        <div className="section">
          <h2>Vendor Information</h2>
          <label>
            Vendor
            <select
              name="vendor"
              onChange={formik.handleChange}
              value={formik.values.vendor}
            >
              <option value="">Select Vendor</option>
              <option value="Vendor 1">Vendor 1</option>
              <option value="Vendor 2">Vendor 2</option>
            </select>
            {formik.errors.vendor && <p className="error">{formik.errors.vendor}</p>}
          </label>
        </div>

        {/* Invoice Details */}
        <div className="section">
          <h2>Invoice Details</h2>
          <label>
            Invoice Number
            <input
              name="invoiceNumber"
              onChange={formik.handleChange}
              value={formik.values.invoiceNumber}
            />
            {formik.errors.invoiceNumber && <p className="error">{formik.errors.invoiceNumber}</p>}
          </label>
          <label>
            Invoice Date
            <input
              type="date"
              name="invoiceDate"
              onChange={formik.handleChange}
              value={formik.values.invoiceDate}
            />
            {formik.errors.invoiceDate && <p className="error">{formik.errors.invoiceDate}</p>}
          </label>
          <label>
            Total Amount
            <input
              type="number"
              name="totalAmount"
              onChange={formik.handleChange}
              value={formik.values.totalAmount}
            />
            {formik.errors.totalAmount && <p className="error">{formik.errors.totalAmount}</p>}
          </label>
        </div>

        {/* Expense Details */}
        <div className="section">
          <h2>Expense Details</h2>
          <label>
            Line Amount
            <input
              type="number"
              name="lineAmount"
              onChange={formik.handleChange}
              value={formik.values.lineAmount}
            />
            {formik.errors.lineAmount && <p className="error">{formik.errors.lineAmount}</p>}
          </label>
          <label>
            Department
            <input
              name="department"
              onChange={formik.handleChange}
              value={formik.values.department}
            />
            {formik.errors.department && <p className="error">{formik.errors.department}</p>}
          </label>
          <label>
            Account
            <input
              name="account"
              onChange={formik.handleChange}
              value={formik.values.account}
            />
            {formik.errors.account && <p className="error">{formik.errors.account}</p>}
          </label>
        </div>

        {/* Comments */}
        <div className="section">
          <label>
            Comments
            <textarea
              name="comments"
              onChange={formik.handleChange}
              value={formik.values.comments}
            />
          </label>
        </div>

        <button type="submit">Submit & Save</button>
      </form>
    </div>
  );
};

export default InvoiceForm;
