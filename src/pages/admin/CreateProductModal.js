// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import Modal from '@mui/material/Modal';
// import './CreateCategoryModal.css'
// import { createProduct, editProduct, getAllCategories } from './service';
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: '#1B1212', // Pink background color
//     // border: '2px solid #000',
//     borderRadius: '8px', // Proper border radius
//     boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Box shadow
//     p: 4,
// };

// const CreateCategoryModal = () => {
//     const [categories, setCategories] = useState([])
//     const handleCreateProduct = () => {
//         console.log("categoryName")
//         createProduct(categoryName).then((response) => {

//             if (response.data) {
//                 fetchCategories()
//                 handleClose()
//             }
//         }).catch((error) => {
//             console.log(error)
//         })
//     };

//     const handleEditProduct = () => {
//         editProduct(categoryDetails?.id, categoryName).then((response) => {
//             if (response.data._id) {
//                 fetchCategories()
//                 handleClose()
//             }
//         }).catch((error) => {
//             console.log(error)
//         })
//     };
//     useEffect(() => {
//         getAllCategories().then((response) => {
//             if (response.data) {
//                 setCategories(response.data)
//             }
//         })
//     }, []);
//     return (
//         <div>
//             {/* <Modal
//                 open={open}
//                 onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             > */}
//             <Box sx={style}>
//                 <Typography id="modal-modal-title" variant="h6" component="h2">
//                     {isEdit ? "Edit Category" : "Create Category"}
//                 </Typography>
//                 <input
//                     type="text"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                     placeholder="Category Name"
//                     style={{ margin: '10px 0', padding: '5px', width: '100%' }}
//                 />
//                 <div class="buttonContainerStyle">
//                     <Button variant="contained" className='bg-color-ecom' onClick={() => handleCreateProduct()} >
//                         Create
//                     </Button><Button variant="contained" className='bg-color-ecom' onClick={() => handleClose()} >
//                         Cancel
//                     </Button>
//                 </div>
//             </Box>
//             {/* </Modal> */}
//         </div >
//     );
// }

// export default CreateCategoryModal;
