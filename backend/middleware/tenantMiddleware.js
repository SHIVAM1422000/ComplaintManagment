const { log } = require('console');
const Company = require('../models/Company');
module.exports = async (req,res,next)=>{
  // console.log("FROM TENANT: " , req.headers);
  
  const slug = req.headers['x-company-slug'] || req.query.company;
  if(!slug) return res.status(400).json({ message: 'Missing company slug header x-company-slug' });
  const company = await Company.findOne({ slug });
  if(!company) return res.status(404).json({ message: 'Company not found' });
  req.company = company;
  // console.log("Tenant Check Passed");
  next();
};
