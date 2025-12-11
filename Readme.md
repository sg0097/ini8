Patient Portal PDF Management
Project Overview

This is a simple full-stack web application that allows a user to upload, view, download, and delete PDF documents such as prescriptions, test results, or referral notes.

Features:

Upload PDF files with a title.

View all uploaded files.

Download individual files.

Delete files when no longer needed.

The backend uses Node.js with Express and MongoDB to store file metadata, while uploaded files are saved locally in a files/ folder. The frontend is built with React for a clean and interactive interface.

Tech Stack

Frontend: React, Axios, CSS

Backend: Node.js, Express, Multer, MongoDB, CORS

Database: MongoDB (for file metadata)

File Storage: Local files/ directory

How to Run Locally
Prerequisites

Node.js & npm installed

MongoDB installed and running locally

Git (optional)

Steps

Clone the repository

git clone https://github.com/sg0097/init_assign
cd https://github.com/sg0097/init_assign


Backend setup

cd backend
npm install
mkdir files   # create folder for uploads
node index.js # or nodemon index.js


Backend runs at: http://localhost:8000

Frontend setup

cd frontend
npm install
npm start


Frontend runs at: http://localhost:3000

Access the application
Open http://localhost:3000 in your browser.

API Endpoints
1. Upload PDF

URL: /upload-files

Method: POST

Request (FormData):

title: "Prescription Jan 2025"
file: <PDF file>


Response:

{
  "status": "ok",
  "message": "File uploaded successfully"
}

2. Get All Files

URL: /get-files

Method: GET

Response:

{
  "status": "ok",
  "data": [
    {
      "_id": "64a12345b6c7d89e0f123456",
      "title": "Prescription Jan 2025",
      "pdf": "1691781234567-Prescription.pdf"
    }
  ]
}

3. Download a File

URL: /download/:filename

Method: GET

Example:

curl -O http://localhost:8000/download/1691781234567-Prescription.pdf


Response: Initiates file download.

4. Delete a File

URL: /delete-file/:id

Method: DELETE

Example:

curl -X DELETE http://localhost:8000/delete-file/64a12345b6c7d89e0f123456


Response:

{
  "message": "File deleted successfully"
}

Folder Structure
project/
│
├─ backend/
│   ├─ index.js
│   ├─ pdfDetails.js
│   └─ files/        # Uploaded PDFs
│
├─ frontend/
│   ├─ src/
│   │   ├─ App.js
│   │   └─ App.css
│   └─ package.json