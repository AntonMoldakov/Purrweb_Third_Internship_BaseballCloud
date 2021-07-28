import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { PROFILE_EVENTS_DATA } from 'graphql/consts';
import { IProfileEventsData } from 'graphql/types';
import { Paginator, Selector, Table } from 'components';
import { sessionTypeData } from 'consts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { Loader } from 'ui';
import styled from 'styled-components';
import colors from 'styles/colors';

const SessionReports = ({ userId }: SessionReportsCardTabProps) => {
  const [typeEvent, setTypeEvent] = useState({ value: '', label: 'None' });
  const [eventsPage, setEventsPage] = useState(1);
  const [eventDate, setEventDate] = useState<Date | undefined>();
  const formatData = eventDate ? format(eventDate, 'dd-MM-yy') : '';
  const eventsPageSize = 10;
  const { data, loading } = useQuery<IProfileEventsData>(PROFILE_EVENTS_DATA, {
    variables: {
      input: {
        profile_id: userId,
        date: formatData,
        event_type: typeEvent.value,
        count: eventsPageSize,
        offset: eventsPage === 1 ? 0 : eventsPage,
      },
    },
  });
  const eventsColumnsData = [
    {
      Header: 'Date',
      accessor: 'date',
    },
    {
      Header: 'Type',
      accessor: 'event_type',
    },
    {
      Header: 'Name',
      accessor: 'event_name',
    },
    {
      Header: 'Purchased',
      accessor: 'id',
    },
  ];

  const events = data ? data.profile_events.events : [];
  const eventsTotalCount = data?.profile_events.total_count;

  const handleClearFilters = () => {
    setTypeEvent({ value: '', label: 'None' });
    setEventDate(undefined);
  };
  return (
    <Root>
      <CardHeader>
        <Title>Session</Title>
        <HeaderNav>
          <NavItem>
            <Button onClick={() => handleClearFilters}>Clear Filters</Button>
          </NavItem>
          <NavItem>
            <StyledDatePicker
              placeholderText={'Date'}
              selected={eventDate}
              onChange={(date: Date) => date && setEventDate(date)}
            />
          </NavItem>
          <NavItem>
            <Selector onReturnValue={setTypeEvent} options={sessionTypeData} />
          </NavItem>
        </HeaderNav>
      </CardHeader>
      <div>{loading ? <Loader size={50} /> : <Table columnsData={eventsColumnsData} rowsData={events} />}</div>
      <Paginator onChangeCurrentPage={setEventsPage} pageSize={eventsPageSize} totalItemCount={eventsTotalCount || 0} />
    </Root>
  );
};

export default SessionReports;

interface SessionReportsCardTabProps {
  userId: string;
}

const Root = styled.div`
  display: flex;
  flex-flow: column;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 21px;
`;

const Title = styled.h3`
  margin: 0;
  color: ${colors.gray3};
  font-weight: 400;
  line-height: 1.25;
`;

const Button = styled.button`
  cursor: pointer;
  color: ${colors.lightBlue};
  background: none;
  border: none;
  font-size: 16px;
  line-height: 1.19;
  &:hover {
    outline: none;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
`;

const NavItem = styled.div`
  margin-left: 20px;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100px;
  font-size: 16px;
  color: ${colors.lightBlue};
  background: none;
  border: none;

  &:focus {
    outline: none;
  }
`;
