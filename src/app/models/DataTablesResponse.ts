export interface DataTablesResponse<T> {
    data: T[];                // The actual data for the current page
    recordsTotal: number;     // The total number of records in the database (without pagination)
    recordsFiltered: number;  // The total number of records that match the search/filter query
  }
  