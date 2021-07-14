"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Items", [
      {
        name: "airpods",
        image: "/images/airpods.jpg",
        price: 40000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "iphone",
        image: "/images/phone.jpg",
        price: 60000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {});
  },
};
