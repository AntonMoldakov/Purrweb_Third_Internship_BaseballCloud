import React from 'react';
import { Default } from 'react-spinners-css';
import colors from '../styles/colors';

interface LoaderProps {
  color?: string;
  size: number;
}

const Loader = ({ color = colors.lightBlue, size }: LoaderProps) => {
  return <Default color={color} size={size} />;
};

export default Loader;
