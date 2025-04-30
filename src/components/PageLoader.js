import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1410;
  animation: ${fadeIn} 0.3s ease-in;
`;

const Spinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(211, 161, 100, 0.2);
  border-radius: 50%;
  border-top-color: #d3a164;
  animation: ${Spinner} 1s linear infinite;
`;

const PageLoader = () => {
  return (
    <Container>
      <LoadingSpinner />
    </Container>
  );
};

export default PageLoader;
