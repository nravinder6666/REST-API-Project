const { dept } = require('../models');

exports.getAllDepts = async (request, h) => {
  try{
  const depts = await dept.findAll();
  return h.response(depts);
    }catch (error) {
        console.error('Error fetching departments:', error);
    }
};


exports.getDeptById = async (request, h) => {
    try{
      //console.log("request is:", request)
  const depts = await dept.findOne({where: {dept_id:request.params.id}});
  return h.response(depts);
    }catch (error) {
        console.error('Error fetching dept:', error);
    }
};

exports.createDept = async (request, h) => {
    try{
  const depts = await dept.create({dept_name:request.payload.name});
  return h.response(depts);
    }catch (error) {
        console.error('Error creating the department:', error);
    }
};

exports.updateDept = async (request, h) => {
try{
  const depts = await dept.update({dept_name:request.payload.name}, {where: {dept_id:request.payload.id}});
  return h.response({message: "Updated Successful"});
    }catch (error) {
        return h.response('statuscode').code(400);
        console.error('Error updating the dept:', error);
    }
};

exports.deleteDept = async (request, h) => {
    try{
      const depts = await dept.destroy({where:{dept_id:request.params.id}})
  //const dept = await user.delete({name:request.payload.name, email:request.payload.email}, {where: {id:request.payload.id}});
  return h.response({message: "Deleted Successfully"});
    }catch (error) {
        console.error('Error deleting the dept:', error);
    }
};