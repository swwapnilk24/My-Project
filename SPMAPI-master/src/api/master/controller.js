import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Master } from '.'
import { MasterComp } from './model';
var paramsId = '';
// Checking the json or nested array is empty or not
// Check if record exist or not 
// If record doesn't exists adding new record
export const create = (data, res, next) => {  
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
         if(Object.keys(data.body.masterData).length === 0)
            res.send("Array is empty ")
         else if(Object.keys(data.body.masterData.masterDataType).length === 0)
            res.send("masterDataType array is empty")
         else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
            res.send("Names array is empty")
         else{
            
            Master.create(data.body.masterData)
            .then((master) => master.view(false))
            .then(() => {
                Master.find({},(err, resp) => {
                   res.send(resp);
                });
            })
            .catch(next)
            // // res.send("Array is empty !")
            // var customerId = data.body.masterData.masterDataType.customer_id;
            // var typeCode = data.body.masterData.masterDataType.code;
            // var enLabel = data.body.masterData.masterDataType.names.en_label;
            // var frLabel = data.body.masterData.masterDataType.names.fr_label;

            // Master.find({$or: [{ "masterDataType.code": { $exists: true, $in: [ typeCode ]}},{
            //             $and: [
            //                 { "masterDataType.customer_id": { $exists: true, $in: [ customerId ]}},
            //                 { "masterDataType.code":  { $exists: true, $in: [ typeCode ] } },
            //                 { "masterDataType.names.en_label": { $exists: true, $in: [ enLabel ] } },
            //                 { "masterDataType.names.fr_label": { $exists: true, $in: [ frLabel ] } }
            //             ]
            //     }]
                    
            //     },function(err,resultSet){
            //         if(err)
            //             res.send("Error "+err)
            //         if(resultSet.length >= 1)
            //             res.send("Data already exists");
            //         else{
                       
            //         }
            // })   
         }
           
     }      
}
export const checkForInsert = (data, res, next) => {
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
         if(Object.keys(data.body.masterData).length === 0)
            res.send("Array is empty ")
         else if(Object.keys(data.body.masterData.masterDataType).length === 0)
            res.send("masterDataType array is empty")
         else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
            res.send("Names array is empty")
         else{
             // res.send(data.body.masterData);
             const query = { 
                  $and: [ 
                      { 
                        'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                        'masterDataType.code': data.body.masterData.masterDataType.code
                      },
                      { $or:[{'masterDataType.names.name': { $regex: new RegExp(data.body.masterData.masterDataType.names[0].name, 'i') }},
                                 { 'masterDataType.names.code':{ $regex: new RegExp(data.body.masterData.masterDataType.names[0].code, 'i')}  }       
                           ]
                        }
                        ]
             };
             Master.find(query,(err, resp) => {
                   if (err) {
                       res.send(err);
                   } else {
                      if (resp.length === 0) {
                          res.send(true);
                      } else {
                          res.send(false);
                      }
                   }
             });
         }
        }
}

export const updateDocument = (data, res, next) => {  
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
         if(Object.keys(data.body.masterData).length === 0)
            res.send("Array is empty ")
         else if(Object.keys(data.body.masterData.masterDataType).length === 0)
            res.send("masterDataType array is empty")
         else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
            res.send("Names array is empty")
         else{
            // res.send("Array is empty !")
            var customerId = data.body.masterData.masterDataType.customer_id;
            var typeCode = data.body.masterData.masterDataType.code;

            Master.find({$or: [{
                        $and: [
                            { "masterDataType.customer_id": { $exists: true, $in: [ customerId ]}},
                            { "masterDataType.code":  { $exists: true, $in: [ typeCode ] } }
                        ]
                }]
                    
                },function(err,resultSet){
                    if(err)
                        res.send("Error "+err)
                    if(resultSet.length >= 1) {
                        var query = {
                            'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                            'masterDataType.code': data.body.masterData.masterDataType.code
                        };
                        Master.findOneAndUpdate(query,  data.body.masterData, {new: true, upsert: true})
                        .then(() => {
                            // Master.find({},(err, resp) => {
                            //     res.send(resp);
                            // });
                            show({}, res, next);
                        })
                        .catch(next)
                        }
                    else{
                        res.send('something');
                    }
            })
         }
           
     }      
}

export const deleteDocument = (data, res, next) => {  
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
         if(Object.keys(data.body.masterData).length === 0)
            res.send("Array is empty ")
         else if(Object.keys(data.body.masterData.masterDataType).length === 0)
            res.send("masterDataType array is empty")
         else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
            res.send("Names array is empty")
         else{
            // res.send("Array is empty !")
            var customerId = data.body.masterData.masterDataType.customer_id;
            var typeCode = data.body.masterData.masterDataType.code;

            Master.find({$or: [{
                        $and: [
                            { "masterDataType.customer_id": { $exists: true, $in: [ customerId ]}},
                            { "masterDataType.code":  { $exists: true, $in: [ typeCode ] } }
                        ]
                }]
                    
                },function(err,resultSet){
                    if(err)
                        res.send("Error "+err)
                    if(resultSet.length >= 1) {
                        resultSet[0].masterDataType.names.map((lData, index)=> {
                            if (data.body.masterData.masterDataType.names[0].code === lData.code && data.body.masterData.masterDataType.names[0].name === lData.name) {
                                resultSet[0].masterDataType.names[index].status = 'inActive';
                            }
                        });
                        data.body.masterData.masterDataType.names = resultSet[0].masterDataType.names;
                        var query = {
                            'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                            'masterDataType.code': data.body.masterData.masterDataType.code
                        };
                        Master.findOneAndUpdate(query,  data.body.masterData, {new: true, upsert: true})
                        .then(() => {
                            // Master.find({},(err, resp) => {
                            //     res.send(resp);
                            // });
                            show({}, res, next);
                        })
                        .catch(next)
                        }
                    else{
                        res.send('something');
                    }
            })
         }
           
     }      
}


export const updateDocuments = (data, res, next) => {  
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
         if(Object.keys(data.body.masterData).length === 0)
            res.send("Array is empty ")
         else if(Object.keys(data.body.masterData.masterDataType).length === 0)
            res.send("masterDataType array is empty")
         else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
            res.send("Names array is empty")
         else{
            // res.send("Array is empty !")
            var customerId = data.body.masterData.masterDataType.customer_id.trim();
            var typeCode = data.body.masterData.masterDataType.code.trim();

            Master.find({$or: [{
                        $and: [
                            { "masterDataType.customer_id": { $exists: true, $in: [ customerId ]}},
                            { "masterDataType.code":  { $exists: true, $in: [ typeCode ] } }
                        ]
                }]
                    
                },function(err,resultSet){
                    if(err)
                        res.send("Error "+err)
                    if(resultSet.length >= 1) {
                         function arrayUnion(arr1, arr2, equalityFunc) {
                            var union = arr1.concat(arr2);
                        
                            for (var i = 0; i < union.length; i++) {
                                for (var j = i+1; j < union.length; j++) {
                                    if (equalityFunc(union[i], union[j])) {
                                        union.splice(j, 1);
                                        j--;
                                    }
                                }
                            }
                        
                            return union;
                        }
                        
                        function areGamesEqual(g1, g2) {
                            let decision = false;
                            if (g1.name === g2.name && g1.code === g2.code) {
                                 decision = true;
                            }
                            if (g1.name === "" || g2.code === "") {
                                decision = true;
                            }
                            return  decision;
                        }
                        
                        // Function call example
                        const finalArray = arrayUnion(resultSet[0].masterDataType.names, data.body.masterData.masterDataType.names, areGamesEqual);
                        // res.send(finalArray);
                        var query = {
                            'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                            'masterDataType.code': data.body.masterData.masterDataType.code
                        };
                        data.body.masterData.masterDataType.names = finalArray;
                        Master.findOneAndUpdate(query,  data.body.masterData, {new: true, upsert: true})
                        .then((employee) => employee.view(true))
                        .then(() => {
                            // const resultRet = showForAll();
                            // res.send(resultRet);
                            // Master.find({},(err, resp) => {
                            //     res.send(resp);
                            // });
                            show({}, res, next);
                        })
                        .catch(next)
                        }
                    else{
                        if(resultSet.length === 0) {
                            var query = {
                                'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                                'masterDataType.code': data.body.masterData.masterDataType.code
                            };
                            Master.findOneAndUpdate(query,  data.body.masterData, {new: true, upsert: true})
                            .then(() => {
                                Master.find({},(err, resp) => {
                                    res.send(resp);
                                });
                            })
                            .catch(next)
                        }
                        //res.send('something');
                    }
            })   
            // res.send(data.body);
         }
           
     }      
}

export const show = ({}, res, next) => {
    console.log("Welcome");
    // Master.find({})
    //       .then(success(res, 201))
    //       .catch(next)
    // const query = {
    //      "masterDataType.names": { "$elemMatch": { status : 'Active' }},
    //      "masterDataType.status" : 'Active'
    //     }
    Master.aggregate([
        {
            $match :{ 
                 $and: [ 
                         {"masterDataType.status" : {$in: ["Active"]}}]
                }
            },
        {
           
           $project: {
               "masterDataType.status" : 1,
               "masterDataType.customer_id" : 1,
               "masterDataType.code" : 1,
              "masterDataType.names" : {
                 $filter: {
                    input: "$masterDataType.names",
                    as: "item",
                    cond: { $eq: [ "$$item.status", 'Active' ] }
                 }
              }
           }
        }
        
     ], (err, resultset) => {
       res.send(resultset);
    });
}

const showForAll = () => {
    Master.aggregate([
        {
            $match :{ 
                 $and: [ 
                         {"masterDataType.status" : {$in: ["Active"]}}]
                }
            },
        {
           
           $project: {
               "masterDataType.status" : 1,
               "masterDataType.customer_id" : 1,
               "masterDataType.code" : 1,
              "masterDataType.names" : {
                 $filter: {
                    input: "$masterDataType.names",
                    as: "item",
                    cond: { $eq: [ "$$item.status", 'Active' ] }
                 }
              }
           }
        }
        
     ], (err, resultset) => {
       return resultset;
    });
}

export const tempShow = (req, res, next) => {
    Master.find({},(err, resultset) => {
       res.send(resultset);
    });
};
export const getRecordsById = ({ params }, res, next) => {
    console.log("Find By Id", params);    
    Master.findById(params.id)
          .exec()
          .then((master) => {
            res.send(master);
          } )
}

export const getIdAndUpdate = ({ params }, data, res, next) => {
  console.log('Params ', params.id);
  res.send('Params ', params);
  paramsId = params.id

  Master.findOne(params.id)
  .then((master) => master ? master.view(true) : update(data, res, next))
  .then(success(res))
  .catch(next)
 // update(paramsId, data, res, next)
}

export const update = (data, res, next) => {
    var customerId = '';
    var codeType = '';
    var enLabel = '';
    var frLabel = '';
    var bodyData = data.body.masterData;
    if(Object.keys(data.body).length === 0){
        res.send("empty body")
    }else{
        if(Object.keys(data.body.masterData).length === 0)
        res.send("Array is empty ")
     else if(Object.keys(data.body.masterData.masterDataType).length === 0)
        res.send("masterDataType array is empty")
    //  else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
    //     res.send("Names array is empty")
     else{
         Master.findOne({ "masterDataType._id": data.params.id},function(err, resultSet){
            if(err)
                res.send("Error in "+err)
            else{              
                
                if(bodyData.masterDataType.code == null || bodyData.masterDataType.code == undefined)
                    codeType = resultSet.masterDataType.code;
                else
                    codeType = bodyData.masterDataType.code;

                if(bodyData.masterDataType.customer_id == null || bodyData.masterDataType.customer_id == undefined)
                    customerId = resultSet.masterDataType.customer_id;
                else
                     customerId = bodyData.masterDataType.customer_id;

                if(!data.body.masterData.masterDataType.names){
                    enLabel = resultSet.masterDataType.names.en_label;
                    frLabel = resultSet.masterDataType.names.fr_label;
                }else{
                    if(bodyData.masterDataType.names.en_label ==null || bodyData.masterDataType.names.en_label == undefined)
                        enLabel = resultSet.masterDataType.names.en_label;
                    else
                        enLabel = bodyData.masterDataType.names.en_label;

                    if(bodyData.masterDataType.names.fr_label == null || bodyData.masterDataType.names.fr_label == undefined)
                        frLabel = resultSet.masterDataType.names.fr_label;
                    else
                        frLabel = bodyData.masterDataType.names.fr_label;
                }               


                var modifyParams = {
                    "masterDataType.code": codeType,
                    "masterDataType.customer_id": customerId,
                    "masterDataType.names.en_label": enLabel,
                    "masterDataType.names.fr_label": frLabel,
                } 

                Master.findOneAndUpdate( { 'masterDataType._id': data.params.id }, 
                                                { $set: modifyParams },
                                                {new: true, upsert: true}
                                            )
                                .then((master) => master.view(true))
                                .then(success(res, 201))
                                .catch(next)
            }
         })
     }
    }
    // // console.log('Id', paramsId);
    // // const paramsid = '59f9ae21771b8d0c709a129e'
    // Master.findOneAndUpdate({ _id: data.params.id }, data.body.masterData, { new: true, upsert: true })
    // .then((master) => master.view(true))
    // .then(success(res, 201))
    // .catch(next)    
}
export const EmptyCollection = (data, res, next) => {
    if(Object.keys(data.body).length === 0){
        res.send("empty body")
    }else{
        if(Object.keys(data.body.masterData).length === 0)
        res.send("Array is empty ")
     else if(Object.keys(data.body.masterData.masterDataType).length === 0)
        res.send("masterDataType array is empty");
     else{
        var query = {
            'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id
        };
        Master.remove(query, (err, resp) => {
            if (err) { 
               res.send('failed');
            } else {
             res.send('sucess');
            }
         });
     }
    }
   
};
export const initialCheckForFullUpload = (data, res, next) => {
    if(Object.keys(data.body).length === 0){
        res.send("empty body")
    }else{
        if(Object.keys(data.body.masterData).length === 0)
        res.send("Array is empty ")
     else if(Object.keys(data.body.masterData.masterDataType).length === 0)
        res.send("masterDataType array is empty");
     else{
        var query = {
            'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id
        };
        const responseFormat = {
            allowInitialUpload: false
        }
        Master.find(query, (err, resp) => {
            if (err) { 
               res.send('failed');
            } else {
              if (resp.length >= 1) {
               responseFormat.allowInitialUpload = false;
               res.send(responseFormat);
              } else {
                responseFormat.allowInitialUpload = true;
                res.send(responseFormat);
              }
            }
         });
     }
    }
   
};
export const destroy = ({ params }, res, next) =>
    Master.findById(params.id)
        .then(notFound(res))
        .then((master) => master ? master.remove() : null)
        .then(success(res, 204))
        .catch(next)
 