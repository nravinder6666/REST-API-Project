const { emp, dept } = require('../models');

exports.getAllEmps = async (request, h) => {
  try{
  const emps = await emp.findAll({ include: [{
    model: dept,
    as: 'dept', 
  }]});
  return h.response(emps);
    }catch (error) {
        console.error('Error fetching emps:', error);
    }
};


exports.getEmpById = async (request, h) => {
    try{
  console.log();
  const emps = await emp.findOne({where: {id:request.params.id}});
  return h.response(emps);
    }catch (error) {
        console.error('Error fetching emp:', error);
    }
};

exports.createEmp = async (request, h) => {
    try{
  //const emps = await emp.create({emp_name:request.payload.name, email:request.payload.email, dept_id:request.payload.dept_id});
  console.log(request.payload);  
  const emps = await emp.create(request.payload);
  return h.response(emps);
    }catch (error) {
        console.error('Error creating the emp:', error);
    }
};

exports.updateEmp = async (request, h) => {
try{
  const emps = await emp.update({emp_name:request.payload.name, email:request.payload.email, 
    dept_id:request.payload.dept_id}, {where: {id:request.payload.id}});
  return h.response({message: "Emp Record Update Successful"});
    }catch (error) {
        return h.response('statuscode').code(400);
        console.error('Error updating the dept:', error);
    }
};

exports.deleteEmp = async (request, h) => {
    try{
      const emps = await emp.destroy({where:{id:request.params.id}})
  return h.response({message: "Deleted Successfully"});
    }catch (error) {
        console.error('Error deleting the Emp Record:', error);
    }
};