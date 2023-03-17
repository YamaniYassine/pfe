const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, ' champ obligatoire'],
    maxlength: 32
  },
  email: {
    type: String,
    trim: true,
    required: [true, ' champ obligatoire'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, ' Address mail no valid']
  },
  password: {
    type: String,
    trim: true,
    required: [true, ' champ obligatoire'],
    minlength: [8, '8 caractères minimum'],
    // validate: {
    //   validator: function(v) {
    //     // Check if password matches the specified regex
    //     return v.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/);
    //   },
    //   message: props => `${props.value} n'est pas un mot de passe valide. Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial`
    // },
    
    
  },
  role: {
    type: Number,
    default: process.env.ROLE_USER,
  }
},{timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;