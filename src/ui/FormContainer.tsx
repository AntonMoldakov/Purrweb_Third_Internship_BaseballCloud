import React, { ReactNode } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

interface FormContainerProps {
  children: ReactNode;
}

function FormContainer({ children }: FormContainerProps) {
  return <Root>{children}</Root>;
}

export default FormContainer;

const Root = styled.div`
  background: ${colors.white2};
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(10px);
  width: 100%;
  max-width: 450px;
`;
