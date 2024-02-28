import { model } from "../../models/index.js";

async function createShop() {
  await model.shop.deleteMany();

  return model.shop.create({
    data: {
      name: "ANGGA JAYA",
      city: "SLEMAN",
      address:
        "JL ANGGA JAYA I NO 282A RT02 RW09 CONDONGCATUR KEC DEPOK KAB SLEMAN",
      zip_code: "55283",
      code: "2744462952",
    },
  });
}

async function createProduct() {
  await model.product.deleteMany();

  return model.product.create({
    data: {
      name: "LE MINERAL 1500ML",
      price: 6500,
    },
  });
}

/**
 * @param {import("../../models/index.js").prisma.Shop} shop
 */
async function createTransaction(shop) {
  await model.transaction.deleteMany();

  return model.transaction.create({
    data: {
      code: "915349/LARIS/01",
      total: 33100,
      shop: {
        connect: {
          id: shop.id,
        },
      },
    },
  });
}

/**
 * @param {import("../../models/index.js").prisma.Transaction} transaction
 * @param {import("../../models/index.js").prisma.product} product
 */
async function createItem(transaction, product) {
  await model.item.deleteMany();

  return model.item.create({
    data: {
      name: "LE MINERAL 1500ML",
      quantity: "5",
      price: 6500,
      subtotal: 32500,
      transaction: {
        connect: {
          id: transaction.id,
        },
      },
      product: {
        connect: {
          id: product.id,
        },
      },
    },
  });
}

/**
 * @param {import("../../models/index.js").prisma.transaction} transaction
 */
async function createPayment(transaction) {
  await model.payment.deleteMany();

  return model.payment.create({
    data: {
      code: "133439",
      method: "not_cash",
      cost: 50000,
      transaction: {
        connect: {
          id: transaction.id,
        },
      },
    },
  });
}

try {
  const shop = await createShop();

  const product = await createProduct();

  const transaction = await createTransaction(shop);

  const item = await createItem(transaction, product);

  const payment = await createPayment(transaction);
} catch (e) {
  console.error(e);
  process.exit(1);
} finally {
  await model.$disconnect();
}
