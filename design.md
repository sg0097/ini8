1.
Q1. Frontend Framework:
Ans- React
     reason -

Q2. Backend Framework:-
Ans- Express
     reason -

Q3. Database:-
Ans - MongoDB
     reason - 

Q4. Scale to 1000 users :-
Ans - 1. Implement cloud storage database like (MongoDB Atlas)
      2. Move file storage from local filesystem to cloud storage (AWS S3) 
      3. Implement authentication & authorization for multiple users.




2.Architecture Overview:-

[Frontend React App] 
       |
       | HTTP requests (Axios)
       v
[Backend Express API] 
   |       |       |
   |       |       |
MongoDB   File Storage (uploads/) 
  Metadata    PDF Files


3.API Specification
1. Upload PDF

URL: /upload-files

Method: POST

Description: Upload a single PDF file along with a title. Stores file in ./files and metadata in MongoDB.

title: "Prescription Jan 2025"
file: <PDF file>

Response (Success):

{
  "status": "ok",
  "message": "File uploaded successfully"
}


2. Get All Files

URL: /get-files

Method: GET

Description: Fetch all uploaded PDF metadata.



3. Download PDF

URL: /download/:filename

Method: GET

Description: Download a PDF file by filename.

Response (Success):

File is sent as download stream (browser prompts download).

Response (Error):

{
  "message": "File not found"
}

4. Delete PDF

URL: /delete-file/:id

Method: DELETE

Description: Delete a PDF file and its metadata by ID.


Response (Success):

{
  "message": "File deleted successfully"
}

4. Data Flow Description

File Upload:

-> User selects a PDF and submits form.

-> Frontend sends POST /documents/upload with FormData (title, file).

-> Backend saves the file in uploads/ folder.

-> Backend stores metadata in database (filename, filepath, filesize, createdAt).

-> Backend responds with success message.

Frontend refreshes the list of uploaded files.

File Download:

-> User clicks Download button.

-> Frontend sends GET /documents/:id request.

-> Backend finds metadata in database, locates file in uploads/.

-> Backend sends file stream to frontend.

-> Browser initiates file download.

File Delete:

-> User clicks Delete button.

-> Frontend sends DELETE /documents/:id.

-> Backend deletes file from uploads/ folder.

-> Backend deletes metadata from database.

-> Backend responds with success message.

-> Frontend refreshes list of files.



5.Assumptions made:


Only PDF files are allowed.

Maximum file size: 10 MB (can be configured in multer).

No user authentication (single-user system).

Only one user can upload files at a time (no concurrency issues expected for local setup).

Files stored locally in uploads/.

Metadata stored in documents table/collection with fields: id, title, filename, filepath, filesize, created_at.
