const paginate = (schema) => {
  schema.statics.paginate = async function (query, options) {
    const { page = 1, limit = 10, populate } = options;
    const skip = (page - 1) * limit;

    const countPromise = this.countDocuments(query).exec();
    let docsQuery = this.find(query).skip(skip).limit(limit);

    if (populate) {
      const populateFields = populate.split(",").map((field) => field.trim());
      populateFields.forEach((field) => {
        docsQuery = docsQuery.populate(field);
      });
    }
    const docsPromise = docsQuery.exec();

    const [totalDocs, docs] = await Promise.all([countPromise, docsPromise]);

    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
      docs,
      meta: {
        totalDocs,
        totalPages,
        hasNextPage,
        hasPrevPage,
        page,
        limit,
      },
    };
  };
};

module.exports = paginate;
