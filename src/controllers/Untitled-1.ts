db.Stores.updateOne(
  { 'menu.sections': { $elemMatch: { _id: 'section_1' } } },
  { $set: { 'menu.sections.$.position': 1 } }
);
