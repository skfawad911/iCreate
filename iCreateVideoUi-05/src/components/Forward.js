import axios from 'axios';
import React, { useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Forward = () => {

  //Store the video...
  const [data, setData] = useState(null);

  //After video send redirect to overlap page..
  const navigate = useNavigate();

  //Handle the form data...
  const handlesubmit = async (e) => {
    const formdata = new FormData();
    formdata.append('file', data);
    const response = await axios.post("/api/auth/upload", formdata);
    if (response) {
      console.log("Video send using multer...");
      // navigate("/temp");
    } else {
      console.log("Video is not sent!");
    }
  }

  return (
    <div>
      <Label for="exampleFile">
        Selected Video :-
      </Label>
      <br />
      <Input
        id="exampleFile"
        name="file"
        type="file"
        onChange={(e) => setData(e.target.files[0])}
      /><br />
      <Button onClick={handlesubmit} color='info'>Submit</Button>
    </div>
  )
}

export default Forward;
