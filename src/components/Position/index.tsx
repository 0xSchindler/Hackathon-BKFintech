import React from 'react'
import { FormControl, InputLabel, Input, InputAdornment, OutlinedInput, Box, Card } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { imagePath } from 'src/constants/imagePath';
import CardPosition from './Card';

export default function Position() {
    return (
        // <SwapProvider>
        <div style={{
            maxWidth: "700px", rowGap: '5px'
        }} className="mx-auto" >
            <CardPosition />
            <br />
            <CardPosition />
            <br />
            <CardPosition />
        </div >
    )
}