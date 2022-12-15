const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

const kullanici=sequelize.define("kullanici",{
    kullaniciNumara: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kullaniciAd: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    kullaniciSoyad: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    kullaniciParola: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    kullaniciMail: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
}, {
    sequelize,
    tableName: 'kullanici',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "kullaniciNumara" },
        ]
      }
    ]
});

// async function sync(){
//     await kullanici.sync({force: true});
//     const count=await kullanici.count();
//   }
//   sync();
  module.exports=kullanici;