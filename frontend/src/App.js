import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [title, settitle] = useState("");
  const [file, setfile] = useState(null);
  const [allImage, setallImage] = useState([]);

  useEffect(() => {
    getPdf();
  }, []);

  
  const getPdf = async () => {
    const result = await axios.get("http://localhost:8000/get-files");
    setallImage(result.data.data);
  };

  
  const showPdf = (pdf) => {
    window.open(`http://localhost:8000/files/${pdf}`, "_blank", "noreferrer");
  };

  
  const downloadFile = (pdf) => {
    window.open(`http://localhost:8000/download/${pdf}`, "_blank", "noreferrer");
  };

  
  const deleteFile = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    await axios.delete(`http://localhost:8000/delete-file/${id}`);
    alert("File deleted successfully!");
    getPdf(); 
  };

 
  const submitChange = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a PDF file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const result = await axios.post("http://localhost:8000/upload-files", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (result.data.status === "ok") {
      alert("Uploaded successfully!");
      settitle("");
      setfile(null);
      getPdf(); 
    } else {
      alert("Upload failed!");
    }
  };

  return (
    <div className="App">
      <form className="formstyle" onSubmit={submitChange}>
        <h4>Upload PDF in React</h4>

        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          required
          onChange={(e) => settitle(e.target.value)}
        />

        <input
          type="file"
          className="form-control"
          
          accept="application/pdf"
          onChange={(e) => setfile(e.target.files[0])}
        />

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>

      <div className="uploaded">
        <h4>Uploaded PDFs:</h4>
        <div className="output-div">
          {allImage.length === 0 ? (
            <p>No files uploaded yet.</p>
          ) : (
            allImage.map((data) => (
              <div key={data._id} className="inner-div">
                <h5>Title: {data.title}</h5>

                <button
                  className="btn btn-primary"
                  onClick={() => showPdf(data.pdf)}
                >
                  Show PDF
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => downloadFile(data.pdf)}
                >
                  Download
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => deleteFile(data._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
