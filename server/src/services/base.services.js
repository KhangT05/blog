// class BaseService {
//     constructor(repository) {
//         this.repository = repository;
//     }

//     static save = async (payload) => {
//     }
// }
//     // static pagination = async (queryString) => {
//     //     const excludedFields = ['page', 'size', 'keyword', 'sort', 'fields'];
//     //     excludedFields.forEach(e => delete queryString[e]);
//     //     let queryStr = JSON.stringify(queryString);
//     //     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//     //     queryStr = JSON.parse(queryStr);
//     //     console.log(queryStr);
//     //     // let query =
//     //     const page = queryString.page * 1 || 1;
//     //     const size = queryString.size * 1 || 100;
//     //     const offset = (page - 1) * size;
//     //     let query = query.skip(offset).limit(size)
//     // }
// // const advancedSearch = async (queryInput) => {
// //     const excludedFields = ['page', 'sort', 'size', 'fields'];
// //     excludedFields.forEach(el => delete queryInput[el]);

// //     //1. advanced filtering
// //     let queryStr = JSON.stringify(queryInput);
// //     queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
// //     queryStr = JSON.parse(queryStr);

// //     console.log(queryStr)
// //     let query = product.find(queryStr);

// //     //2. sorting
// //     if (queryInput.sort) {
// //         const sortBy = queryInput.sort.split(',').join(' ')
// //         console.log(sortBy)
// //         query = query.sort(sortBy)
// //     } else {
// //         query = query.sort('-createdAt')
// //     }

// //     //3. field limiting
// //     if (queryInput.fields) {
// //         const fields = queryInput.fields.split(',').join(' ')
// //         query = query.select(fields)
// //     } else {
// //         query = query.select('-__v')
// //     }

// //     //4. paging
// //     // page=0&size=10
// //     const page = queryInput.page * 1 || 1;
// //     const size = queryInput.size * 1 || 100;
// //     const offset = (page - 1) * size;

// //     query = query.skip(offset).limit(size)

// //     if (queryInput.page) {
// //         const total = await product.countDocuments();
// //         if (offset >= total) throw new BusinessLogicError('This page does not exists')
// //     }

// //     return await query;
// // }
// class BaseService {
//     constructor() {

//     }
//     static updateStatusByField = async () => {

//     }
// }