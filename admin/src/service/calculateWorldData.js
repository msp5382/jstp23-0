export const calculateWorldData = (consequence = "") => {
  let consq = consequence.split("\n");
  consq = consq.filter((a) => a !== "");
  consq = consq.map((a) => ({ data: a.split(" ")[1], key: a.split(" ")[0] }));

  console.log(consq);
};
