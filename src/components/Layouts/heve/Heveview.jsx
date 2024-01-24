import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Heveview = () => {
    var [heve,setHeve]= useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3005/viewheve")
        .then(response =>{
            setHeve(response.data)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <div>
        <Typography variant='h4'>Heve</Typography> <br /> <br />

        <TableContainer component={Paper}>
         <Table sx={{minWidth:650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Leve</TableCell>
                    <TableCell>Response</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {heve.map((value,index)=>{
                    return(
                        <TableRow key={index}>
                            <TableCell>{value.Leve}</TableCell>
                            <TableCell>{value.Response}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
         </Table>
        </TableContainer>
    </div>
  )
}

export default Heveview