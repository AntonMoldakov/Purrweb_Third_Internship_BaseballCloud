import { ArrowIcon } from 'assets/icons/components';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';
import { DropdownMenu } from 'ui';

const Selector = ({ options, onReturnValue, title }: SelectorButtonProps) => {
  const [isOpen, setOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(options[0]);
  useEffect(() => onReturnValue(currentValue), []);
  return (
    <Root onClick={() => setOpen(!isOpen)}>
      <>
        {title}
        {currentValue.value ? currentValue.label : 'Type'}
        <Arrow $isOpen={isOpen}>
          <ArrowIcon />
        </Arrow>
        <DropdownMenu isOpen={isOpen}>
          {!options
            ? ''
            : options.map(item => (
                <button
                  key={'key: ' + item.value}
                  onClick={() => {
                    setCurrentValue(item);
                    onReturnValue(item);
                  }}>
                  {item.label}
                </button>
              ))}
        </DropdownMenu>
      </>
    </Root>
  );
};

export default Selector;

type Value = {
  value: string;
  label: string;
};

interface SelectorButtonProps {
  title?: string;
  options: Array<Value>;
  onReturnValue: (value: Value) => void;
}

const Root = styled.div`
  position: relative;
  display: flex;
  padding: 0;
  font-size: 16px;
  background: none;
  border: none;
  line-height: 1.19;
  cursor: pointer;
  color: ${colors.lightBlue};
  &&:focus,
  &&:active {
    outline: none;
  }
`;
const Arrow = styled.span<{ $isOpen: boolean }>`
  margin-left: 6px;
  transform: ${({ $isOpen }) => ($isOpen ? `rotate(180deg)` : `none`)};
  &&:focus,
  &&:active {
    outline: none;
  }
`;
