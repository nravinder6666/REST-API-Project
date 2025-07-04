const { user } = require('../models');

exports.getAllUsers = async (request, h) => {
  try{
  const users = await user.findAll();
  return h.response(users);
    }catch (error) {
        console.error('Error fetching users:', error);
    }
};


exports.getUserById = async (request, h) => {
    try{
      console.log("request is:", request)
  const users = await user.findOne({where: {id:request.params.id}});
  return h.response(users);
    }catch (error) {
        console.error('Error fetching user:', error);
    }
};

exports.createUser = async (request, h) => {
    try{
  const users = await user.create({name:request.payload.name, email:request.payload.email});
  return h.response(users);
    }catch (error) {
        console.error('Error creating the user:', error);
    }
};

exports.updateUser = async (request, h) => {
    try{
  const users = await user.update({name:request.payload.name, email:request.payload.email}, {where: {id:request.payload.id}});
  return h.response({message: "Updated Successful"});
    }catch (error) {
        return h.response('statuscode').code(400);
        console.error('Error updating the user:', error);
    }
};

exports.deleteUser = async (request, h) => {
    try{
      const users = await user.destroy({where:{id:request.params.id}})
  //const users = await user.delete({name:request.payload.name, email:request.payload.email}, {where: {id:request.payload.id}});
  return h.response({message: "Deleted Successfully"});
    }catch (error) {
        console.error('Error deleting the user:', error);
    }
};