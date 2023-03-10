class SearchQuery {
  private query: string;
  private filters: Map<string, any>;
  private pagination: { limit: number, offset: number };
  private sort: { field: string, order: 'asc' | 'desc' };

  constructor() {
    this.filters = new Map<string, any>();
    this.pagination = { limit: 10, offset: 0 };
    this.sort = { field: 'id', order: 'asc' };
  }

  setQuery(query: string): SearchQuery {
    this.query = query;
    return this;
  }

  addFilter(field: string, value: any): SearchQuery {
    this.filters.set(field, value);
    return this;
  }

  setPagination(limit: number, offset: number): SearchQuery {
    this.pagination = { limit, offset };
    return this;
  }

  setSort(field: string, order: 'asc' | 'desc'): SearchQuery {
    this.sort = { field, order };
    return this;
  }

  build(): object {
    return {
      query: this.query,
      filters: Array.from(this.filters),
      pagination: this.pagination,
      sort: this.sort
    };
  }
}

const search = new SearchQuery();
search.setQuery('movie').addFilter('genres', ['Action', 'Drama']).setPagination(20,0).setSort('rating', 'desc').build();
