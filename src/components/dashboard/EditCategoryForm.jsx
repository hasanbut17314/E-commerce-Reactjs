import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogContent, CircularProgress } from '@mui/material';
import AddImageField from './AddImageField';
import { useUpdateCategoryMutation } from '../../services/categoryApi';
import notify from '../../utils/notify';

const EditCategoryForm = ({ category, open, close }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');

    const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

    useEffect(() => {
        if (category) {
            setTitle(category.title || '');
            setStatus(category.status || '');
            setDescription(category.description || '');
            setImage(null);
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('status', status);
        if (image) {
            formData.append('image', image);
        }

        try {
            await updateCategory({ id: category._id, formData });
            notify.success('Category updated successfully');
            close();
        } catch (error) {
            notify.error(error.message || 'Something went wrong');
        }
    };

    return (
        <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
            <DialogContent>
                <h2 className='font-semibold mb-4'>Edit Category</h2>
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
                    <AddImageField onFileSelect={(file) => setImage(file)} />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        {!isLoading && <Button onClick={close}>Cancel</Button>}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditCategoryForm;
