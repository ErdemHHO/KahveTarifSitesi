const {DataTypes, BelongsTo} = require('sequelize');
const sequelize = require('../data/db');

  const kahve=sequelize.define("kahve",{
    kahve_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      kategori_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'kategori',
          key: 'kategori_id'
        }
      },
      kahveAdi: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      kahveTarif: {
        type: DataTypes.STRING(10000),
        allowNull: false
      },
      kahveFoto: {
        type: DataTypes.STRING,
        allowNull: true
      },
    }, {
        sequelize,
        tableName: 'kahve',
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "kahve_id" },
            ]
          },
          {
            name: "kategori_id",
            using: "BTREE",
            fields: [
              { name: "kategori_id" },
            ]
          }
        ]
    });
// async function sync(){
//   await kahve.sync({force:true});
//   console.log("kahve tablosu eklendi");
// } 
// sync();
module.exports=kahve;