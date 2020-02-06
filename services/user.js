
const users= [{
    name: 'fabio',
    role: 'admin',
    id: 1
},{
    name: 'liz',
    role: 'admin',
    id: 2
},
{
    name: 'kumar',
    role: 'superadmin',
    id: 3
},
{
    name: 'dayanand',
    role: 'admin',
    id: 4
}]

const userData = ()=> users;
const singleUser = (id)=> {
  let matchedUser =  users.find(user => {
       return user.id == id;
   });
   return matchedUser?matchedUser: undefined;
};


   const deleteUser = (id) => {
       return new Promise((resolve,reject)=> {
        if(id) {
            const index = users.findIndex((item)=> {
                return item.id ==id;
            });
            users.splice(index,1);  
            resolve({status: 'success'});
        } else {
            reject({status: 'fail'});
        }  
   })
};


const createUser = (data) => {
    return new Promise((resolve,reject)=> {
     if(data && typeof data == 'object' && Object.keys(data).length > 0) {
         users.push(data);  
         resolve({status: 'success'});
     } else {
         reject({status: 'fail'});
     }  
})
};



const updateUser = (data) => {
    return new Promise((resolve,reject)=> {
     let valid = false;   
     if(data && typeof data == 'object' && Object.keys(data).length > 0) {
         for(let i=0;i<users.length;i++) {
             if (users[i].id == Number(data.id)) {
                 users[i] = data;
                 valid = true;
                 break;
             }
         } 
         
     } 
     
     if (valid) {
        resolve({status: 'success'});
     }else {
         reject({status: 'fail'});
     }  
  });
};
module.exports =  {
    userData: userData,
    singleUser: singleUser,
    deleteUser: deleteUser,
    createUser: createUser,
    updateUser: updateUser
}