Invoice Management Application

This repository contains the Invoice Management Application, a comprehensive tool for creating, uploading, and managing invoices. The application enables users to upload invoice files, input detailed invoice information, save drafts, submit invoices, and provide comments, offering an efficient solution for invoice handling.

Features
1. File Upload
Upload invoice files.
Display uploaded file names for user reference.
2. Invoice Details
Add vendor details, purchase order numbers, total amounts, and important dates.
Include dynamic fields for additional expense coding.
3. Comments Section
Add comments about the invoice.
Save comments to local storage for persistence.
4. Save as Draft
Save incomplete forms as drafts.
Retrieve drafts from local storage for future use.
5. Submit & New
Submit the current form data.
Automatically reset the form for a new invoice entry.
6. Logout Functionality
Clear session and local storage on logout.
Redirect users to the login page for security.

UAT Environment Link : https://assesment-edstrument-j9r4mtvyp-prithvis-projects-e2014edf.vercel.app

Technologies Used
React: For building the user interface.
Formik: For managing and validating forms.
Yup: For schema-based form validation.
React Icons: For enhanced UI/UX.
Local Storage: For saving drafts and comments temporarily.
File Structure
project-root/
├── components/
│   ├── InvoiceForm.js   # Main component for invoice management.
├── public/
│   ├── icons/           # Icons used in the application.
├── src/
│   ├── App.js           # Main application entry point.
│   ├── index.js         # Renders the application.
├── README.md            # Project documentation.
Installation
Follow these steps to set up the project locally:

Clone the repository:

git clone https://github.com/your-repo/invoice-management.git
Navigate to the project directory:

cd invoice-management
Install dependencies:

npm install
Start the development server:

npm start
Usage
Upload Files: Use the "Upload File" button to upload invoice files.
Input Invoice Details: Fill out the required fields for invoices.
Save Drafts: Save incomplete forms using the "Save as Draft" button.
Submit Invoices: Submit completed forms and reset for new entries.
Add Comments: Provide comments about invoices in the comments section.
Logout: Securely log out by clicking the logout button.
Contribution Guidelines
We welcome contributions to improve this project. To contribute:

Fork the repository.
Create a new branch for your feature or bugfix.
git checkout -b feature-name
Commit your changes with meaningful commit messages.
git commit -m "Add feature-name"
Push your branch to your forked repository.
git push origin feature-name
Open a pull request to the main repository.
Future Enhancements
Backend integration for storing and retrieving invoices.
User authentication and role-based access control.
Dashboard for viewing saved drafts and submitted invoices.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or support, contact:

Email: prithviprabhakarh13@gmail.com
