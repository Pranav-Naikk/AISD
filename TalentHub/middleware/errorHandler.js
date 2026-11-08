exports.notFound = (req, res) => res.status(404).json({ message: 'API route not found.' });
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'This record already exists or violates a unique constraint.' });
  if (err.code === 'ER_ROW_IS_REFERENCED_2') return res.status(409).json({ message: 'This record is still used by another record and cannot be deleted.' });
  res.status(500).json({ message: 'Something went wrong on the server.' });
};
