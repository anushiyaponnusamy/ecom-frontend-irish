import React, { useEffect, useState } from 'react';
import { getAllCategories } from './service';
import { Container, Paper, Button } from '@mui/material';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import CreateCategoryModal from './CreateCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import './CreateCategory.css'
const cardStyle = {
    // width: '90%',
    marginBottom: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative',
};

const actionButtonStyle = {
    position: 'absolute',
    top: '17px',
    right: '5px',
};

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [createCategory, setCreateCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [editCategoryDetails, setEditCategoryDetails] = useState({ name: '', id: '' });
    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const [deleteCategory, setDeleteCategory] = useState(false);

    const handleOpenDeleteCategory = (id) => {
        setDeleteCategoryId(id);
        setDeleteCategory(true);
    };

    const handleCloseDeleteCategory = () => {
        setDeleteCategory(false);
    };

    const handleOpenCreateCategoryModal = () => { setCreateCategory(true); };

    const handleCloseCreateCategoryModal = () => {
        setCreateCategory(false);
    };

    const handleEditCategory = (name, id) => {
        setEditCategoryDetails({ ...editCategoryDetails, name, id });
        setEditCategory(true);
    };

    const handleCloseEditCategory = () => {
        setEditCategory(false);
    };

    const fetchCategories = () => {
        getAllCategories()
            .then((response) => {
                if (response.data) {
                    setCategory(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Container style={{ marginTop: '20px' }}>
            <div
                variant="contained"
                className='bg-color-ecom create-category-button'
            // style={{ backgroundColor: '#333333', color: 'white', marginBottom: '10px', height: '40px', alignItems: 'center', borderRadius: '5px' }}

            >
                <AiOutlinePlus size={20} style={{ color: 'white', marginRight: '5px' }} onClick={handleOpenCreateCategoryModal} />
                add Category
            </div>
            {category.map((row, index) => (
                <Paper key={row._id} style={cardStyle}>
                    {/* <div>
                        <strong>s.No:</strong> {index + 1}
                    </div> */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {row.name}
                        </div>

                        <div style={actionButtonStyle}>

                            <AiOutlineEdit onClick={() => handleEditCategory(row.name, row._id)} />

                            <AiOutlineDelete onClick={() => handleOpenDeleteCategory(row._id)} />

                        </div>
                    </div>
                </Paper>
            ))}
            {createCategory ?
                <CreateCategoryModal
                    open={createCategory}
                    fetchCategories={fetchCategories}
                    handleClose={handleCloseCreateCategoryModal}
                /> :
                <CreateCategoryModal
                    isEdit={editCategory}
                    categoryDetails={editCategoryDetails}
                    fetchCategories={fetchCategories}
                    open={editCategory}
                    handleClose={handleCloseEditCategory}
                />}
            {deleteCategory &&
                <DeleteCategoryModal
                    categoryId={deleteCategoryId}
                    open={deleteCategory}
                    fetchCategories={fetchCategories}
                    handleClose={handleCloseDeleteCategory}
                />}
        </Container>
    );
};

export default CreateCategory;
