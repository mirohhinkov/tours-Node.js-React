class APIFeatures {
  constructor(query, reqQuery) {
    this.query = query;
    this.reqQuery = reqQuery;
  }

  filtering() {
    const queryObj = { ...this.reqQuery };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.reqQuery.sort) {
      const sortBy = this.reqQuery.sort.replace(/,/g, ' ');
      this.query.sort(sortBy);
    } else {
      //default sorting
      this.query.sort('-createdAt');
    }
    return this;
  }

  projecting() {
    if (this.reqQuery.fields) {
      const selectedFields = this.reqQuery.fields.replace(/,/g, ' ');
      this.query.select(selectedFields);
    } else {
      // if the name of the field is prefixed with - the field hes been excluded
      this.query.select('-__v');
    }
    return this;
  }

  paginating(numDocs) {
    const page = +this.reqQuery.page || 1;
    const limit = +this.reqQuery.limit || 100;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);

    if (this.reqQuery.page && skip >= numDocs)
      throw new Error('This page does not exist');
    return this;
  }
}

module.exports = APIFeatures;
