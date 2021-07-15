import React from 'react';
import { Default } from 'react-spinners-css';

interface LoaderProps {
  color: string;
  size: number;
}

const Loader = ({ color, size }: LoaderProps) => {
  return <Default color={color} size={size} />;
};

export default Loader;
