import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './CreateCategoryModal.css'
import { deleteCategory } from './service';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1B1212', // Pink background color
    // border: '2px solid #000',
    borderRadius: '8px', // Proper border radius
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Box shadow
    p: 4,
};

const DeleteCategoryModal = (props) => {
    const { open, handleClose, categoryId, fetchCategories } = props;

    const handleDeleteCategory = () => {
        deleteCategory(categoryId).then((response) => {
            if (response.data) {
                fetchCategories()
                handleClose()
            }
        }).catch((error) => {
            console.log(error)
        })
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        <h4 style={{ textAlign: "center", color: 'white' }}>Are you sure ?</h4>
                    </Typography>

                    <div class="buttonContainerStyle">
                        <Button variant="contained" className='bg-color-ecom' onClick={() => handleDeleteCategory()}
                        >
                            Yes
                        </Button>  <Button variant="contained" className='bg-color-ecom' onClick={() => handleClose()} >
                            No
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div >
    );
}

export default DeleteCategoryModal;
