export const PaginationOptions = {
    page: number, // default to 1
    limit: number, // default to 3 (number of items to return in response)
    skip: number, // num of items to skip while fetching data ((page-1) * limit)
    searchTerm: string, // q query param for search
    search: string, // regex to match names of items in recipe cawse insensitive gi
}