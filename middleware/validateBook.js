
module.exports = (req, res, next) => {
  const bookObject = req.file ? JSON.parse(req.body.book) : req.body;

    if (!bookObject.title || bookObject.title.trim() === '') {
      return res.status(400).json({ error: 'Le titre est obligatoire'});
    }

    if (!bookObject.author || bookObject.author.trim() === '') {
      return res.status(400).json({ error: 'L’auteur est obligatoire'  });
    }

    if (bookObject.year === undefined || bookObject.year === null || bookObject.year.toString().trim() === '') {
      return res.status(400).json({ error: "L'année est obligatoire"});
    }

    if (!bookObject.genre || bookObject.genre.trim() === '') {
      return res.status(400).json({ error: 'Le genre est obligatoire'});
    }

    next();
  };
