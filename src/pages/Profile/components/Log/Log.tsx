import React from "react";
import { IconInput, Loader } from "ui";
import { SearchIcon } from "assets/icons/components";
import { Selector, Paginator, Table } from "components";
import { pitchTypeData } from "consts";
import styled from "styled-components";
import colors from "styles/colors";
import { IPitchingLog, IBattingLog } from "graphql/types";
import { IColumnsData } from "types";
import { Row } from "react-table";

const Log = ({
  setTypeSelector,
  pitcherName,
  setPitcherName,
  totalCount,
  pageSize,
  setPage,
  values,
}: ILogProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPitcherName(e.target.value);

  const renderRowSubComponent = React.useCallback(
    <T extends Record<string, any>>(row: Row<T>) => (
      <Table rowsData={[row.original]} columnsData={values.subColumnsData} />
    ),
    []
  );

  return (
    <div>
      <CardHeader>
        <IconInput
          staticWidth
          right={false}
          placeholder={"Search"}
          type="text"
          value={pitcherName}
          onChange={handleSearch}
        >
          <SearchIcon />
        </IconInput>
        <div>
          <Selector onReturnValue={setTypeSelector} options={pitchTypeData} />
        </div>
      </CardHeader>
      {values.loading ? (
        <Loader size={50} />
      ) : values.rowsData ? (
        values.type === "pitcher" ? (
          <Table
            rowsData={values.rowsData as IPitchingLog[]}
            columnsData={values.columnsData}
            renderRowSubComponent={renderRowSubComponent}
          />
        ) : (
          <Table
            rowsData={values.rowsData as IBattingLog[]}
            columnsData={values.columnsData}
            renderRowSubComponent={renderRowSubComponent}
          />
        )
      ) : (
        <TabMessage>There's no info yet!</TabMessage>
      )}

      <CardFooter>
        <Paginator
          onChangeCurrentPage={setPage}
          pageSize={pageSize}
          totalItemCount={totalCount || 0}
        />
      </CardFooter>
    </div>
  );
};

export default Log;

interface ILogProps {
  setTypeSelector: (values: { value: string; label: string }) => void;
  pitcherName: string;
  setPitcherName: (value: string) => void;
  totalCount: number | undefined;
  pageSize: number;
  setPage: (value: number) => void;
  values: {
    type: "pitcher" | "batter";
    rowsData: Array<IPitchingLog> | Array<IBattingLog> | undefined;
    columnsData: IColumnsData;
    subColumnsData: IColumnsData;
    loading: boolean;
  };
}

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
`;

const TabMessage = styled.div`
  min-height: 420px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: ${colors.gray};
  font-size: 16px;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
