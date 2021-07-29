import React, { useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/colors';

const Paginator = ({ totalItemCount, pageSize, onChangeCurrentPage, showButtonsBeside = 1 }: PaginatorProps) => {
  const buttonsCount = Math.ceil(totalItemCount / pageSize);
  const buttons: Array<number> = [];
  const [activeButton, setActiveButton] = useState(1);

  let showRestLeftButton = false;
  let showRestRightButton = false;
  const handleChangePage = (page: number) => {
    setActiveButton(page);
    onChangeCurrentPage(page);
  };

  for (let i = 1; i <= buttonsCount; i++) {
    buttons.push(i);
  }

  const showButtons = buttons.filter(item => {
    if (
      item === 1 ||
      item === buttonsCount ||
      (item >= activeButton - showButtonsBeside && item <= activeButton + showButtonsBeside)
    ) {
      return true;
    } else if (item > activeButton) {
      showRestRightButton = true;
    } else if (item < activeButton) {
      showRestLeftButton = true;
    }
    return false;
  });

  return (
    <div>
      {buttonsCount > 1 && (
        <>
          <Button $active={false} onClick={() => handleChangePage(1)} disabled={activeButton === 1}>
            «
          </Button>
          {showButtons.map((item, index, buttons) => {
            return (
              <React.Fragment key={index}>
                {((index === 1 && showRestLeftButton) || (index === buttons.length - 1 && showRestRightButton)) && (
                  <Button $rest={false} key={'rest' + item} $active={false}>
                    ...
                  </Button>
                )}
                <Button $active={activeButton === item} key={item} onClick={() => handleChangePage(item)}>
                  {item}
                </Button>
              </React.Fragment>
            );
          })}
          <Button
            $active={false}
            onClick={() => handleChangePage(buttonsCount)}
            disabled={activeButton === buttonsCount}>
            »
          </Button>
        </>
      )}
    </div>
  );
};

export default Paginator;

interface PaginatorProps {
  totalItemCount: number;
  pageSize: number;
  onChangeCurrentPage: (value: number) => void;
  showButtonsBeside?: number;
}
interface ButtonProps {
  $active: boolean;
  $rest?: boolean;
}

const Button = styled.button<ButtonProps>`
  position: relative;
  float: left;
  padding: 6px 12px;
  line-height: 1.42857143;
  color: ${({ $active }) => ($active ? colors.white : colors.gray3)};
  border: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  border-radius: 4px;
  margin: 0 2px;
  cursor: pointer;
  background-color: ${({ $active, $rest }) => ($active ? colors.lightBlue : $rest ? colors.white : colors.gray5)};
`;
