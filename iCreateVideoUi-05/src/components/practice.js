import React, { useState } from 'react';
import { InputLabel,Button, TextField } from "@mui/material";
import axios from 'axios';

const Practice = () => {

    // Input handle..
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: null,  // Change to null for file input
    });

    // Input change
    const handleChange = (e) => {
        if (e.target.name === "image") {
            // If the target is the image input, use e.target.files[0] to get the selected file
            setInputs(prevState => ({
                ...prevState,
                [e.target.name]: e.target.files[0]
            }));
        } else {
            // For other inputs, use e.target.value
            setInputs(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    }

    // Form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', inputs.title);
            formData.append('image', inputs.image);

            const { data } = await axios.post("http://localhost:8050/api/auth/image", formData);

            if (data?.success) {
                console.log("done..");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputLabel sx={{ mb: 0, mt: 0, fontSize: '20px', fontWeight: "bold" }}>Title :--</InputLabel>
                    <TextField
                        name="title"
                        value={inputs.title}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        required
                        sx={{ fontSize: '14px' }}
                    />
                    <InputLabel sx={{ mb: 0, mt: 0, fontSize: "20px", fontWeight: "bold" }} >
                        Image :--
                    </InputLabel>
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleChange}
                        required
                        sx={{ fontSize: '14px' }}
                    />
                    <Button sx={{ borderRadius: 3 }} type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    )
};

export default Practice;
