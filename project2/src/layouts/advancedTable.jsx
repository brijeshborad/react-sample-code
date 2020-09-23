import { withRouter } from 'react-router'
import * as React from 'react'
import matchSorter from 'match-sorter'
import { Fragment, useEffect, useRef, useState } from 'react'
import {
  Col,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Pagination, PaginationItem, PaginationLink,
  Row,
  Table, UncontrolledPopover, PopoverHeader, PopoverBody
} from 'reactstrap'
import CustomSelect from './customSelect'
import { useAsyncDebounce, useGlobalFilter, useFilters, usePagination, useRowSelect, useSortBy, useTable } from 'react-table'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef()
    const resolvedRef = ref || defaultRef

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
        <label className="table-check"/>
      </>
    )
  }
)

function GlobalFilter ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  showStatusFilter,
  statusList,
  setUserStatus,
  currentUserStatus
}) {
  let search = undefined
  return (
    <Row className="custom-search-filter align-items-center h-100">
      <Col className={'col-auto'}>
        <input className={'form-control'}
          //value={globalFilter || ''}
               ref={ref => search = ref}
               onChange={e => {
                 // setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
               }}
               placeholder={`Search Here`}
        />
      </Col>
      {showStatusFilter && <Col className={'col-auto'}>
        <div className="table-dropdown">
          {showStatusFilter && <CustomSelect options={statusList}
                                             name="userStatus"
                                             value={currentUserStatus}
                                             changeEvent={(name, value) => setUserStatus(statusList.find(item => item.key === value.key))}/>}
        </div>
      </Col>}
      <Col className={'col-auto'}>
        <div className="button-row">
          <button className="admin-btn btn btn-primary"
                  onClick={() => setGlobalFilter(search.value || undefined)}>Search
          </button>
        </div>
      </Col>
    </Row>
  )
}

function DefaultColumnFilter ({ column: { filterValue, setFilter, type = 'text', options = [] } }) {
    if(type === 'dropdown'){
        return(
            <CustomSelect
                options={options}
                value={options.find(item => item.value === filterValue)}
                changeEvent={(name, selectedValue) => {
                    setFilter(selectedValue ? selectedValue.value ? selectedValue.value :undefined : undefined)
                }}
            />
        )
    }
      return (
        <Input
          type={type}
          value={filterValue || ''}
          onChange={e => {
            setFilter(e.target.value.trim() ? e.target.value : undefined)
          }}
          placeholder=''
        />
      )
}

function getVisiblePages (page, total) {
  if (total < 7) {
    return filterPages([1, 2, 3, 4, 5, 6], total)
  } else {
    if (page % 5 >= 0 && page > 4 && page + 2 < total) {
      return [1, page - 1, page, page + 1, total]
    } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total]
    } else {
      return [1, 2, 3, 4, 5, total]
    }
  }
}

function filterPages (visiblePages, totalPages) {
  return visiblePages.filter(page => page <= totalPages)
}

function fuzzyTextFilterFn (rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}

fuzzyTextFilterFn.autoRemove = val => !val

function AdvancedTable ({
  columns, data, history, updateMyData, viewAction, editAction,
  showActions = true, actions, pageCount,
  getRowProps = {}, showPageJump, fetchData, showStatusFilter, deleteAction,
  showPageSizeOptions, defaultPageSize, filterable = true, statusList,
  setUserStatus, currentUserStatus, setSelectedUser, onRef, hideCheckBox, hideSearch
}) {
  const buttonRef = {}
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )

  const defaultColumn = React.useMemo(
    () => ({
      // ...(filterable && {
      //   Filter: DefaultColumnFilter,
      // })
        Filter: filterable && DefaultColumnFilter
      // ...(editable && {
      //     Cell: EditableCell
      // })
    }),
    [filterable]
  )
  let {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, sortBy, filters, globalFilter },
    selectedFlatRows,
    toggleAllRowsSelected
  } = useTable(
    {
      columns,
      data,
      autoResetSortBy: true,
      autoResetPage: true,
      autoResetFilters: true,
      defaultColumn,
      filterTypes,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        sortBy: [],
        filters: [],
      },
      manualPagination: true,
      manualSortBy: true,
      manualFilters: true,
      manualGlobalFilter: true,
      pageCount,
      updateMyData
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      if (!hideCheckBox) {
        hooks.visibleColumns.push(columns => {
          return [{
            id: 'selection',
            groupByBoundary: true,
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          }, ...columns]
        })
      }
    }
  )
  onRef.resetRows = toggleAllRowsSelected
  const [visiblePages, setVisiblePages] = useState([])

  useEffect(() => {
    setSelectedUser && setSelectedUser(selectedFlatRows.map(row => row.original))
  }, [selectedFlatRows, setSelectedUser])

  const onFetchDataDebounced = useAsyncDebounce(fetchData, 500)

  useEffect(() => {
    setVisiblePages(filterPages(getVisiblePages(null, pageOptions.length), pageOptions.length))
  }, [pageOptions.length])

  useEffect(() => {
    onFetchDataDebounced({ pageIndex, pageSize, sortBy, filters, globalFilter, currentUserStatus })
  }, [currentUserStatus, filters, globalFilter, onFetchDataDebounced, pageIndex, pageSize, sortBy])

  return (
    <Fragment>
      {!hideSearch &&
      <div className="auto-cols-container">
        <Col lg={12}>
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            showStatusFilter={showStatusFilter}
            statusList={statusList}
            setUserStatus={setUserStatus}
            currentUserStatus={currentUserStatus}
          />
        </Col>
      </div>
      }
      <Table striped hover responsive className="align-items-center" {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className={`${column.canSort && column.isSorted ?
                column.isSortedDesc
                  ? '-sort-desc'
                  : '-sort-asc'
                : ''}`} scope="col"
                  {...column.getHeaderProps()}>
                <div {...(column.canSort && column.getSortByToggleProps())}>
                  <span>{column.render('Header')}</span>
                </div>
                  {column.canFilter ? column.render('Filter') : null}
              </th>
            ))}
            {showActions && <th scope="col"/>}

          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.length > 0 ?
          page.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps(getRowProps(row))}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                {showActions ?
                  (
                    <td className="">
                      {
                        actions.map((action, index) => {
                          if (action.actionType === 'delete') {
                            return <Fragment key={index}>
                              <i ref={ref => buttonRef[row.original.id] = ref} className={`fa fa-trash text-danger cursor-pointer ${index !== actions.length -1 ? 'mr-2' : ''}`} id={`deleteData-${row.original.id}`}/>
                              <UncontrolledPopover defaultOpen={false} trigger="legacy" placement="left"
                                                   target={`deleteData-${row.original.id}`}>
                                <PopoverHeader>Are you sure you want to delete?</PopoverHeader>
                                <PopoverBody>
                                  <button type="button" className="btn btn-danger btn-sm mr-2"
                                          onClick={() => {
                                            action.action(row.original)
                                            buttonRef[row.original.id].click()
                                          }}>
                                    Yes
                                  </button>
                                  <button type="button" className="btn btn-primary btn-sm mr-2"
                                          onClick={() => buttonRef[row.original.id].click()}>
                                    No
                                  </button>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </Fragment>
                          }
                          else {
                            return <i key={index} className={`fa ${action.icon} mr-2 cursor-pointer ${index !== actions.length -1 ? 'mr-2' : ''}`} onClick={() => action.type === 'route' ? history.push(`${action.action}${row.original.id}`): action.action(row.original)}/>
                          }
                        })
                      }
                    </td>)
                  : null}
              </tr>
            )
          })
          :
          <tr>
            <td colSpan={columns.length + 1}>No Data Found</td>
          </tr>
        }
        </tbody>
      </Table>
      <div className="pagination-box text-center">
        {
          showPageJump &&
          <div className="float-left pt-2"><span>Page </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {pageIndex + 1}
              </DropdownToggle>
              <DropdownMenu direction="left">
                {
                  pageOptions.map((val, index) => {
                    return (<DropdownItem key={index} onClick={() => {
                      gotoPage(index)
                      setVisiblePages(filterPages(getVisiblePages(index, pageOptions.length), pageOptions.length))
                    }}>
                      {index + 1}
                    </DropdownItem>)
                  })
                }
              </DropdownMenu>
            </UncontrolledDropdown>
            <span> of </span>{pageOptions.length}</div>
        }

        <Pagination className="d-inline-block pt-3" size="sm" listClassName="justify-content-center"
                    aria-label="Page navigation example">
          <PaginationItem className={`${!canPreviousPage && 'disabled'}`}>
            <PaginationLink
              className="prev"
              onClick={() => previousPage()}
              tabIndex="-1"
              disabled={!canPreviousPage}>
              <i className="fa fa-arrow-left"/>
              <span className="sr-only">Previous</span>
            </PaginationLink>
          </PaginationItem>
          {visiblePages.map((page, index, array) => {
            return (
              <PaginationItem key={page} active={pageIndex + 1 === page}>
                {array[index - 1] + 2 < page ?
                  <PaginationLink onClick={() => {
                    gotoPage(page - 1)
                    setVisiblePages(filterPages(getVisiblePages(page, pageOptions.length), pageOptions.length))
                  }}>
                    ...{page}
                  </PaginationLink>
                  : <PaginationLink onClick={() => {
                    gotoPage(page - 1)
                    setVisiblePages(filterPages(getVisiblePages(page, pageOptions.length), pageOptions.length))
                  }}>
                    {page}
                  </PaginationLink>
                }
              </PaginationItem>
            )
          })}
          <PaginationItem className={`${!canNextPage && 'disabled'}`}>
            <PaginationLink
              className="next"
              disabled={!canNextPage}
              onClick={() => nextPage()}>
              <i className="fa fa-arrow-right"/>
              <span className="sr-only">Next</span>
            </PaginationLink>
          </PaginationItem>
        </Pagination>
        {
          showPageSizeOptions &&
          <div className="pull-right pt-2">
            <span className="text-muted text-small mr-1">Items </span>
            <UncontrolledDropdown className="d-inline-block">
              <DropdownToggle caret color="outline-primary" size="xs">
                {pageSize}
              </DropdownToggle>
              <DropdownMenu right>
                {[50, 100, 200, 300, 500].map((size, index) => {
                  return (
                    <DropdownItem key={index} onClick={() => setPageSize(size)}>
                      {size}
                    </DropdownItem>
                  )
                })}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        }
      </div>
    </Fragment>
  )
}

export default withRouter(AdvancedTable)
