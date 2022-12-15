const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

  const kategori=sequelize.define("kategori",{
    kategori_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
    kategoriAdi: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        sequelize,
        tableName: 'kategori',
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "kategori_id" },
            ]
          }
        ]
    });
// async function sync(){
//   await kategori.sync({alter:true});
//   console.log("kategori tablosu eklendi");
// } 
// sync();
module.exports=kategori;