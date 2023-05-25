class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    let queryObj = { ...this.queryString };
    let excludedFeilds = ["limit", "sort", "page", "fields"];
    excludedFeilds.forEach((e) => delete queryObj[e]);
    this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      const sortedBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortedBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginate() {
    const limit = this.queryString.limit * 1 || 100;
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
  limitFeilds() {
    if (this.queryString.fields) {
      const selectedBy = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectedBy);
    } else {
      this.query = this.query.select("");
    }
    return this;
  }
}

module.exports = APIFeatures;
