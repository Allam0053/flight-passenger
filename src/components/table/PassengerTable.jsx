import _ from 'lodash';
import * as React from 'react';
import { VscTriangleDown } from 'react-icons/vsc';
// import Table from '@/components/table/Table';
import {
  Column,
  createTableMultiSort,
  SortDirection,
  Table,
} from 'react-virtualized';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '../links/UnstyledLink';
import NextImage from '../NextImage';

export default function PassengerTable({ passengers = [] }) {
  // const [sortByState, setSortByState] = React.useState<string[]>(['name']);
  const [sortDirectionState, setSortDirectionState] = React.useState(
    new Map([['name', SortDirection.ASC]])
  );

  React.useEffect(() => {
    // console.log('sort state', sortDirectionState);
  }, [sortDirectionState]);

  const sortFn = React.useCallback(
    ({ sortBy, sortDirection }) => {
      // const { sortBy: prevSortBy, sortDirection: prevSortDirection } =
      //   this.state;
      // const prevSortBy = sortByState;
      const prevSortDirection = sortDirectionState;

      // If list was sorted DESC by this column.
      // Rather than switch to ASC, return to "natural" order.
      if (prevSortDirection.get(sortBy[0]) === SortDirection.DESC) {
        setSortDirectionState((prevSortDirection) => {
          const newSortDirectionState = new Map(prevSortDirection);
          newSortDirectionState.delete(sortBy[0]);
          // console.log('delete', newSortDirectionState);
          return newSortDirectionState;
        });
        return;
      }

      setSortDirectionState((prevSortDirection) => {
        const newSortDirectionState = new Map(prevSortDirection);
        for (const key in sortDirection) {
          newSortDirectionState.set(key, SortDirection.DESC);
        }
        return newSortDirectionState;
      });
    },
    [sortDirectionState]
  );

  const sortState = React.useMemo(() => {
    return createTableMultiSort(sortFn, {
      defaultSortBy: ['name', 'trips'],
      defaultSortDirection: {
        name: 'ASC',
        trips: 'ASC',
      },
    });
  }, [sortFn]);

  const headerRenderer = React.useCallback(
    ({ dataKey, label }) => {
      // const isSortedDesc = sortState.sortBy.includes(dataKey);
      const isSortedDesc = sortDirectionState.has(dataKey);
      return (
        <div className='border-b border-gray-200 bg-gray-50 '>
          <span title={label} className='inline-block text-slate-500'>
            {label}
            <VscTriangleDown
              className={clsxm(
                isSortedDesc
                  ? 'inline-block w-3 fill-gray-700 '
                  : 'inline-block w-3 rotate-180 fill-gray-700 '
              )}
            />
          </span>
        </div>
      );
    },
    [sortDirectionState]
  );

  const sortedPassengers = React.useMemo(() => {
    const sortingPassenger = [...passengers];
    sortDirectionState.forEach((value, key) => {
      sortingPassenger.sort((a, b) => {
        const direction = value === 'ASC' ? 1 : -1;
        const aLocal = a[key];
        const bLocal = b[key];
        if (aLocal < bLocal) {
          return -1 * direction;
        }
        if (aLocal > bLocal) {
          return 1 * direction;
        }
        return 0;
      });
    });
    return sortingPassenger;
  }, [passengers, sortDirectionState]);

  // React.useEffect(() => {
  //   console.log('pass props', passengers);
  // }, [passengers]);

  if (!passengers.length) return <>no data</>;

  return (
    <Table
      className='divide-y divide-gray-200'
      width={1100}
      height={500}
      headerHeight={30}
      rowHeight={50}
      rowCount={sortedPassengers.length}
      rowGetter={({ index }) => sortedPassengers[index]}
      sort={sortState.sort}
      // sort={this.sortFn}
      sortBy={undefined}
      sortDirection={undefined}
    >
      <Column
        className='h-[50px]'
        label='Name'
        dataKey='name'
        width={300}
        headerRenderer={headerRenderer}
      />
      <Column
        className='h-[50px]'
        label='ID'
        dataKey='_id'
        width={500}
        cellRenderer={({ cellData }) => {
          return (
            <UnstyledLink href={`/passenger/${cellData}`}>
              {cellData}
            </UnstyledLink>
          );
        }}
        headerRenderer={headerRenderer}
      />
      <Column
        className='h-[50px]'
        label='Airline'
        dataKey='airline'
        cellDataGetter={(airline) => {
          // console.log('airline', airline);
          return _.get(airline, 'rowData.airline[0].name', 'unknown flights');
        }}
        width={300}
        headerRenderer={headerRenderer}
      />
      <Column
        className='h-[50px]'
        label='Airline'
        dataKey='airline'
        cellDataGetter={(airline) => {
          // console.log('airline', airline);
          return _.get(
            airline,
            'rowData.airline[0].logo',
            'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/EVA_Air_logo.svg/250px-EVA_Air_logo.svg.png'
          );
        }}
        cellRenderer={({ cellData }) => {
          return <NextImage width={100} height={50} src={cellData} />;
        }}
        width={300}
        headerRenderer={headerRenderer}
      />
      <Column
        className='h-[50px]'
        label='Trips'
        dataKey='trips'
        width={300}
        headerRenderer={headerRenderer}
      />
    </Table>
  );
}
