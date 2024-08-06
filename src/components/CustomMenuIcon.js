import React from 'react';
import { SvgIcon } from '@mui/material';

const CustomMenuIcon = (props) => (
  <SvgIcon {...props}>
    <rect y="5" width="24" height="2" rx="1" />
    <rect y="11" width="18" height="2" rx="1" />
    <rect y="17" width="12" height="2" rx="1" />
  </SvgIcon>
);

export default CustomMenuIcon;
