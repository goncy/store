import fs from "node:fs";

import Papa from "papaparse";

const data = [];

const rows = data.flatMap((row) => {
  const draft = [
    {
      id: row.id,
      type: row.type === "available" ? "product" : row.type,
      title: row.title,
      category: row.category,
      description: row.description.split("\n").join("\\n"),
      image: row.images[0]?.replace(
        "https://admin.pency.app/api/image/production.pency.images/",
        "https://tap-pencyinfra-prod.s3.amazonaws.com/",
      ),
      price: row.price,
    },
  ];

  if (row.options?.length > 0) {
    for (let category of row.options) {
      for (let option of category.options) {
        draft.push({
          id: row.id,
          type: "option",
          title: option.title,
          category: category.title,
          description: "",
          image: "",
          price: option.price,
        });
      }
    }
  }

  return draft;
});

const csv = Papa.unparse(rows, {header: false});

fs.writeFileSync("products.csv", csv, "utf8");
