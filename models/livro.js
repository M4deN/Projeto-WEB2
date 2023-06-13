const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  anoPublicacao: {
    type: Number,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  editora: {
    type: String,
    required: true
  }
}, { versionKey: false });

const Livro = mongoose.model('Livro', livroSchema);

module.exports = Livro;