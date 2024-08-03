import React, { useState } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditCategoryForm = ({ category }) => {
    const [title, setTitle] = useState(category?.title || '');
    const [status, setStatus] = useState(category?.status || '');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState(category?.description || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle update category logic here
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
            />
            <FormControl fullWidth required>
                <InputLabel id="status">Status</InputLabel>
                <Select
                    labelId="status"
                    value={status}
                    label="Status *"
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value='Active'>Active</MenuItem>
                    <MenuItem value='Hidden'>Hidden</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                required
            />
            <Button
                variant="contained"
                component="label"
            >
                Image
                <input
                    type="file"
                    hidden
                    onChange={handleImageChange}
                />
            </Button>
            <Button type="submit" variant="contained" color="primary">
                Update Category
            </Button>
        </Box>
    );
};

export default EditCategoryForm;
