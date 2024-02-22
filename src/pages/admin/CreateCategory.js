import React, { useEffect, useState } from 'react';
import { getAllCategories } from './service';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import CreateCategoryModal from './CreateCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1B1212',
        color: 'white',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [createCategory, setCreateCategory] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [editCategoryDetails, setEditCategoryDetails] = useState({ name: '', id: '' });
    const [deleteCategoryId, setDeleteCategoryId] = useState('');

    const [deleteCategory, setDeleteCategory] = useState(false);
    const handleOpenDeleteCategory = (id) => {
        setDeleteCategoryId(id)
        setDeleteCategory(true)
    }
    const handleCloseDeleteCategory = () => {
        setDeleteCategory(false)
    }

    const handleOpenCreateCategoryModal = () => { setCreateCategory(true); }

    const handleCloseCreateCategoryModal = () => {
        setCreateCategory(false);
    }
    const handleEditCategory = (name, id) => {
        setEditCategoryDetails({ ...editCategoryDetails, name, id })
        setEditCategory(true)
    }
    const handleCloseEditCategory = () => {
        setEditCategory(false)
    }
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
            <div>
                <Button variant="contained" className='bg-color-ecom' style={{ backgroundColor: 'black', color: 'white' }} onClick={handleOpenCreateCategoryModal}>
                    <AiOutlinePlus size={20} style={{ color: 'white', marginRight: '5px' }} />
                    Create Category
                </Button>
            </div>
            <TableContainer component={Paper} style={{ marginTop: '10px' }}>
                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead className='bg-color-ecom' >
                        <TableRow >
                            <StyledTableCell>s.No</StyledTableCell>
                            <StyledTableCell>name</StyledTableCell>
                            <StyledTableCell>date</StyledTableCell>
                            <StyledTableCell>actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {category && category.map((row, index) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.createdDate}</StyledTableCell>
                                <StyledTableCell style={{ display: "flex", flexDirection: "row" }}>
                                    <Button variant="contained" className='bg-color-ecom' size="small" style={{
                                        backgroundColor: 'black', color: 'white'
                                    }}
                                        onClick={() => handleEditCategory(row?.name, row?._id)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" className='bg-color-ecom' size="small"
                                        style={{ marginLeft: '10px', backgroundColor: 'black', color: 'white' }} onClick={() => handleOpenDeleteCategory(row?._id)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {createCategory ?
                <CreateCategoryModal
                    open={createCategory}
                    fetchCategories={fetchCategories}
                    handleClose={handleCloseCreateCategoryModal} /> :
                <CreateCategoryModal isEdit={editCategory}
                    categoryDetails={editCategoryDetails}
                    fetchCategories={fetchCategories}
                    open={editCategory}
                    handleClose={handleCloseEditCategory} />}
            {deleteCategory &&
                <DeleteCategoryModal
                    categoryId={deleteCategoryId}
                    open={deleteCategory}
                    fetchCategories={fetchCategories}
                    handleClose={handleCloseDeleteCategory} />}
        </Container>
    );
};

export default CreateCategory;
