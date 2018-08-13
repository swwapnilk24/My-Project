import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { CantonTaxes } from '.'

// this code is for creat only

// export const create = (data, res, next) => {
//   if (Object.keys(data.body).length === 0) {
//     res.send("empty body")
//  }else{
//      if(Object.keys(data.body.masterData).length === 0)
//         res.send("Array is empty ")
//      else if(Object.keys(data.body.masterData.masterDataType).length === 0)
//         res.send("masterDataType array is empty")
//      else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
//         res.send("Names array is empty")
//      else{
//           var query = {
//             'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
//             'masterDataType.code': data.body.masterData.masterDataType.code
//         };
//         CantonTaxes.findOneAndUpdate(query, data.body.masterData, (err, result) => {
//                 if (err) {
//                   res.send(err);
//                 } else {
//                   showAll(data, res);
//                 }
//         });
//      }
//     }

// };

// this code is for create only

// backup of create

        // var query = {
        //   'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
        //   'masterDataType.code': data.body.masterData.masterDataType.code
        // };
        // CantonTaxes.find(query, (err, result) => {
        //    if (err) {
        //      res.send(err);
        //    } else {
        //      if (result.length >= 1) {
        //       // res.send(result[0].masterDataType.names);
        //       // res.send(data.body.masterData.masterDataType.names);

        //       // filtering

        //       function arrayUnion(arr1, arr2, equalityFunc) {
        //         var union = arr1.concat(arr2);
            
        //         for (var i = 0; i < union.length; i++) {
        //             for (var j = i+1; j < union.length; j++) {
        //                 if (equalityFunc(union[i], union[j])) {
        //                     union.splice(j, 1);
        //                     j--;
        //                 }
        //             }
        //         }
            
        //         return union;
        //     }
            
        //     function areGamesEqual(g1, g2) {
        //         let decision = false;
        //         if ((g1.Canton === g2.Canton && g1.MonthlyGrossTo === g2.MonthlyGrossTo) ||(g1.Canton === g2.Canton && g1.MonthlyGrossFrom === g2.MonthlyGrossFrom)) {
        //              decision = true;
        //         }
        //         return  decision;
        //     }
          
        //     // Function call example
        //     const finalArray = arrayUnion(result[0].masterDataType.names, data.body.masterData.masterDataType.names, areGamesEqual);
        //     //res.send(finalArray);
        //       //filtering
        //         result[0].masterDataType.names = finalArray;
        //         CantonTaxes.findOneAndUpdate(query, result[0], (err, resultUpdated) => {
        //                 if (err) {
        //                   res.send(err);
        //                 } else {
        //                   showActive(data, res);
        //                 }
        //         });
        //      } else {
        //        CantonTaxes.findOneAndUpdate(query, data.body.masterData,{ new: true, upsert: true }, (err, result) => {
        //                 if (err) {
        //                   res.send(err);
        //                 } else {
        //                   showActive(data, res);
        //                 }
        //         });
        //      }
        //    }
        // });

// backup of create

export const update = (data, res, next) => {
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
                    var query = {
                        'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                        'masterDataType.code': data.body.masterData.masterDataType.code,
                        'masterDataType.names._id': data.body.masterData.masterDataType.names[0]._id
                    };
                    console.log(data.body.masterData.masterDataType.names);
                    CantonTaxes.update(query, { $set: { "masterDataType.names.$": data.body.masterData.masterDataType.names[0] }}, (err, result) => {
                            if (err) {
                              res.send(err);
                            } else {
                               // res.send(result);
                              showActive(data, res);
                            }
                    });
        }
    }
};

// export const create = (data, res, next) => {
//   if (Object.keys(data.body).length === 0) {
//     res.send("empty body")
//  }else{
//      if(Object.keys(data.body.masterData).length === 0)
//         res.send("Array is empty ")
//      else if(Object.keys(data.body.masterData.masterDataType).length === 0)
//         res.send("masterDataType array is empty")
//      else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
//         res.send("Names array is empty")
//      else{
//          data.body.masterData.masterDataType.names.map((doc, index) => {
//            // res.send(doc);
//                     var query = {
//                       'masterDataType.customer_id': doc.masterData.masterDataType.customer_id,
//                       'masterDataType.code': doc.masterData.masterDataType.code
//                     };
//                     CantonTaxes.find(query, (err, result) => {
//                         if (err) {
//                           res.send(err);
//                         } else {
//                           if (result.length >= 1) {
//                             // res.send(result[0].masterDataType.names);
//                             // res.send(data.body.masterData.masterDataType.names);

//                             // filtering

//                             function arrayUnion(arr1, arr2, equalityFunc) {
//                               var union = arr1.concat(arr2);
                          
//                               for (var i = 0; i < union.length; i++) {
//                                   for (var j = i+1; j < union.length; j++) {
//                                       if (equalityFunc(union[i], union[j])) {
//                                           union.splice(j, 1);
//                                           j--;
//                                       }
//                                   }
//                               }
                          
//                               return union;
//                           }
                          
//                           function areGamesEqual(g1, g2) {
//                               let decision = false;
//                               if ((g1.Canton === g2.Canton && g1.MonthlyGrossTo === g2.MonthlyGrossTo) ||(g1.Canton === g2.Canton && g1.MonthlyGrossFrom === g2.MonthlyGrossFrom)) {
//                                   decision = true;
//                               }
//                               return  decision;
//                           }
                        
//                           // Function call example
//                           const finalArray = arrayUnion(result[0].masterDataType.names, doc.masterData.masterDataType.names, areGamesEqual);
//                           //res.send(finalArray);
//                             //filtering
//                               result[0].masterDataType.names = finalArray;
//                               CantonTaxes.findOneAndUpdate(query, result[0], (err, resultUpdated) => {
//                                       if (err) {
//                                         res.send(err);
//                                       } else {
//                                         // showActive(data, res);
//                                       }
//                               });
//                           } else {
//                             CantonTaxes.findOneAndUpdate(query, doc.masterData,{ new: true, upsert: true }, (err, result) => {
//                                       if (err) {
//                                         res.send(err);
//                                       } else {
//                                         // showActive(data, res);
//                                       }
//                               });
//                           }
//                         }
//                     });
//                     if (index === data.body.masterData.masterDataType.names.length - 1) {
                      
//                       setTimeout(() => {
//                         showActive(data, res);
//                       }, 30)
//                     }
//             });
//          }
//     }

// };

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
         CantonTaxes.findOneAndUpdate({ "masterDataType.customer_id": "McBitss" }, data.body.masterData, { new: true, upsert: true }, (err, result) => {
            if (err) {
                res.send(err);
            } else {
                // res.send(result);
                showActive(data, res);
            }
         });
    }
 }
};

export const showActive = (data, res) => {
  CantonTaxes.aggregate([
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
// check Bakup
            // export const checkForInsert = (data, res, next) => {
            //     if (Object.keys(data.body).length === 0) {
            //         res.send("empty body")
            //      }else{
            //          if(Object.keys(data.body.masterData).length === 0)
            //             res.send("Array is empty ")
            //          else if(Object.keys(data.body.masterData.masterDataType).length === 0)
            //             res.send("masterDataType array is empty")
            //          else if(Object.keys(data.body.masterData.masterDataType.names).length === 0)
            //             res.send("Names array is empty")
            //          else{
            //              // res.send(data.body.masterData);
            //              const query = { 
            //                   $and: [ 
            //                       { 
            //                         'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
            //                         'masterDataType.code': data.body.masterData.masterDataType.code,
            //                         'masterDataType.names.Canton': data.body.masterData.masterDataType.names[0].Canton
            //                       },
            //                       { $or:[{'masterDataType.names.MonthlyGrossTo': data.body.masterData.masterDataType.names[0].MonthlyGrossTo },
            //                                  { 'masterDataType.names.MonthlyGrossFrom':  data.body.masterData.masterDataType.names[0].MonthlyGrossFrom }
            //                            ]
            //                         }
            //                         ]
            //              };
            //              CantonTaxes.find(query,(err, resp) => {
            //                    if (err) {
            //                        res.send(err);
            //                    } else {
            //                       if (resp.length === 0) {
            //                           res.send(true);
            //                       } else {
            //                           res.send(false);
            //                       }
            //                    }
            //              });
            //          }
            //         }
            //   }
// check backup

// Worked Code

        // if ((data.body.masterData.masterDataType.names[0].MonthlyGrossFrom === data2.MonthlyGrossFrom) || (data.body.masterData.masterDataType.names[0].MonthlyGrossTo === data2.MonthlyGrossTo) || ((data.body.masterData.masterDataType.names[0].MonthlyGrossTo === data2.MonthlyGrossFrom)|| (data.body.masterData.masterDataType.names[0].MonthlyGrossFrom === data2.MonthlyGrossTo))) {
        //     flag.push('invalid');
        // } else {
        //   if (index === resultset[0].masterDataType.names.length - 1) {
        //       if (index === 0) {
        //           if (data.body.masterData.masterDataType.names[0].MonthlyGrossFrom < data2.MonthlyGrossFrom) {
        //               if (data.body.masterData.masterDataType.names[0].MonthlyGrossTo > data2.MonthlyGrossFrom || data.body.masterData.masterDataType.names[0].MonthlyGrossTo > data2.MonthlyGrossTo ) {
        //                flag.push('invalid');
        //               }
        //            }
        //       } else {
        //               if (data.body.masterData.masterDataType.names[0].MonthlyGrossFrom > data2.MonthlyGrossFrom) {
        //               if (data.body.masterData.masterDataType.names[0].MonthlyGrossFrom < data2.MonthlyGrossTo) {
        //                   flag.push('invalid');
        //               }
        //               }
        //       }
        //       console.log('bug here in fist');
        //   } else if (index === 0) {
        //       if (data.body.masterData.masterDataType.names[0].MonthlyGrossFrom < data2.MonthlyGrossFrom) {
        //           if (data.body.masterData.masterDataType.names[0].MonthlyGrossTo > data2.MonthlyGrossFrom || data.body.masterData.masterDataType.names[0].MonthlyGrossTo > data2.MonthlyGrossTo ) {
        //            flag.push('invalid');
        //           }
        //        }
        //        console.log('bug here in second');
        //   } else {
        //        if(data.body.masterData.masterDataType.names[0].MonthlyGrossFrom < data2.MonthlyGrossFrom) {
        //           if ((data.body.masterData.masterDataType.names[0].MonthlyGrossFrom < resultset[0].masterDataType.names[index -1].MonthlyGrossTo) || (data.body.masterData.masterDataType.names[0].MonthlyGrossTo > resultset[0].masterDataType.names[index +1].MonthlyGrossFrom)) {
        //            flag.push('invalid');
        //           }
        //        }
        //        console.log('bug here in third');
        //   }
        // }

// Worked Code
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
       else {
           const query = { 
                $and: [ 
                    { 
                      'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                      'masterDataType.code': data.body.masterData.masterDataType.code,
                      'masterDataType.names.Canton': data.body.masterData.masterDataType.names[0].Canton
                    }
                      ]
                };
                CantonTaxes.aggregate([
                
                    {
                        $match :{ 
                            $and: [ 
                                { 
                                'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                                'masterDataType.code': data.body.masterData.masterDataType.code,
                                'masterDataType.names.Canton': data.body.masterData.masterDataType.names[0].Canton
                                }
                                ]
                        }
                        },
                        
                    
                    {
                    
                    $project: {
                        "masterDataType.names" : {
                            $filter: {
                                input: "$masterDataType.names",
                                as: "item",
                                cond: { $eq: [ "$$item.Canton", data.body.masterData.masterDataType.names[0].Canton  ] }
                            }
                        }
                    }
                    }
                    // {
                    //     $sort: { 'masterDataType.names.MonthlyGrossTo' : -1, '_id': -1 }
                    //   },
                    
                ], (err, resultset) => {
                    let allow = false;
                    if (resultset.length !== 0) {
                      const result = rangeValidator(resultset[0].masterDataType.names, data.body.masterData.masterDataType.names[0]);
                      res.send(result);
                    }
                
                });
         CantonTaxes.aggregate([
                
                    {
                        $match :{ 
                            $and: [ 
                                { 
                                'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                                'masterDataType.code': data.body.masterData.masterDataType.code,
                                'masterDataType.names.Canton': data.body.masterData.masterDataType.names[0].Canton
                                }
                                ]
                        }
                        },
                        
                    
                    {
                    
                    $project: {
                        "masterDataType.names" : {
                            $filter: {
                                input: "$masterDataType.names",
                                as: "item",
                                cond: { $eq: [ "$$item.Canton", data.body.masterData.masterDataType.names[0].Canton  ] }
                            }
                        }
                    }
                    }
                    // {
                    //     $sort: { 'masterDataType.names.MonthlyGrossTo' : -1, '_id': -1 }
                    //   },
                    
                ], (err, resultset) => {
                    let allow = false;
                    if (resultset.length !== 0) {
                        
                    }
                });

       }
      }
}


// range validator code start 

function compare(a, b) {
    if (a.MonthlyGrossFrom < b.MonthlyGrossFrom) {
      return -1;
    }
    if (a.MonthlyGrossFrom > b.MonthlyGrossFrom) {
      return 1;
    }
    return 0;
  }
 function rangeValidator(existedArrayDataTemp, newComingDataTemp) {
    const existedArrayData = existedArrayDataTemp;
    const newComingData = newComingDataTemp;
    // console.log('sorted array', existedArrayData, newComingData);
    existedArrayData.sort(compare);
    // console.log('sorted array', existedArrayData, newComingData);
    const length = existedArrayData.length;
    let flag;
    for (let i = 0; i < length; i += 1) {
      // if (newComingData.MonthlyGrossFrom === existedArrayData[i].MonthlyGrossFrom || newComingData.MonthlyGrossTo === existedArrayData.MonthlyGrossFrom || newComingData.MonthlyGrossFrom === existedArrayData.MonthlyGrossTo || newComingData.MonthlyGrossTo === existedArrayData.MonthlyGrossTo) {
      //   flag = false;
      //   break;
      // }
      console.log(newComingData.MonthlyGrossFrom, newComingData.MonthlyGrossTo, 'here we go 1', existedArrayData[i].MonthlyGrossFrom, existedArrayData[i].MonthlyGrossTo);      
      existedArrayData[i].MonthlyGrossFrom = parseInt(existedArrayData[i].MonthlyGrossFrom);
      existedArrayData[i].MonthlyGrossTo = parseInt(existedArrayData[i].MonthlyGrossTo);
      console.log(typeof newComingData.MonthlyGrossFrom);
      newComingData.MonthlyGrossFrom = parseInt(newComingData.MonthlyGrossFrom);
      console.log(typeof newComingData.MonthlyGrossFrom);
      newComingData.MonthlyGrossTo = parseInt(newComingData.MonthlyGrossTo);
      if (newComingData.MonthlyGrossFrom !== existedArrayData[i].MonthlyGrossFrom && newComingData.MonthlyGrossTo !== existedArrayData.MonthlyGrossFrom && newComingData.MonthlyGrossFrom !== existedArrayData.MonthlyGrossTo && newComingData.MonthlyGrossTo !== existedArrayData.MonthlyGrossTo) {
        console.log(newComingData.MonthlyGrossFrom, newComingData.MonthlyGrossTo, 'here we go 1', existedArrayData[i].MonthlyGrossFrom, existedArrayData[i].MonthlyGrossTo);
        if (i === 0) {
          // if existed is Big
          console.log('i am there');
          if (existedArrayData[i].MonthlyGrossFrom > newComingData.MonthlyGrossFrom) {
            console.log('existed value is big', i);
            if (existedArrayData[i].MonthlyGrossFrom > newComingData.MonthlyGrossTo) {
              flag = true;
              break;
            } else {
              flag = false;
              break;
            }
          }
          if (existedArrayData[i].MonthlyGrossFrom < newComingData.MonthlyGrossFrom) {
            // if existed is small and End of the Array
            console.log('existed value is small', i);
            if (i === (length - 1)) {
              if (existedArrayData[i].MonthlyGrossTo < newComingData.MonthlyGrossFrom) {
                flag = true;
                break;
              } else {
                flag = false;
                break;
              }
            }
          }
        }
        if (i >= 1) {
            // if existed is Big
          if (existedArrayData[i].MonthlyGrossFrom > newComingData.MonthlyGrossFrom) {
            console.log('existed value is big', i);
            if (existedArrayData[i - 1].MonthlyGrossTo < newComingData.MonthlyGrossFrom && newComingData.MonthlyGrossTo < existedArrayData[i].MonthlyGrossFrom) {
              flag = true;
              break;
            } else {
              flag = false;
              break;
            }
          }
          if (existedArrayData[i].MonthlyGrossFrom < newComingData.MonthlyGrossFrom) {
              // if existed is small and End of the Array
            console.log('existed value is small', i);
            if (i === (length - 1)) {
              if (existedArrayData[i].MonthlyGrossTo < newComingData.MonthlyGrossFrom) {
                flag = true;
                break;
              } else {
                flag = false;
                break;
              }
            }
          }
        }
      } else {
        flag = false;
        break;
      }
    }
    return flag;
  }
  
// range vaidator code ends here
export const show = (data, res, next) => {

    CantonTaxes.aggregate([
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

};

export const showAll = (data, res, next) => {
    CantonTaxes.find({}, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
};

export const checkForInitialFullUpload = (data, res, nex) => {
    if (Object.keys(data.body).length === 0) {
        res.send('empty body');
    } else {
        if (Object.keys(data.body.companyData).length === 0) {
            res.send('no customer data found');
        } else {
            const query = { "masterDataType.customer_id": { $regex:  new RegExp(data.body.companyData.customer_id, 'i') } };
            CantonTaxes.find( query, (err,result) => {
             if (err) {
                 res.send('something went wrong handle it');
             } else {
                 if (result.length === 0) {
                     res.send({ "ErrorMessage": true });
                 } else {
                    res.send({ "ErrorMessage": false });                    
                 }
             }
            });
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
              var query = {
                'masterDataType.customer_id': data.body.masterData.masterDataType.customer_id,
                'masterDataType.code': data.body.masterData.masterDataType.code
              };
              CantonTaxes.find(query, (err, resultSet) => {
                  if(err)
                  res.send("Error "+err)
                  if(resultSet.length >= 1) {
                      resultSet[0].masterDataType.names.map((lData, index)=> {
                          if ((data.body.masterData.masterDataType.names[0].Canton === lData.Canton && data.body.masterData.masterDataType.names[0].MonthlyGrossFrom.toString() === lData.MonthlyGrossFrom.toString())) {
                              resultSet[0].masterDataType.names[index].status = 'inActive';
                              // res.send(lData);
                          }
                  });
                  data.body.masterData.masterDataType.names = resultSet[0].masterDataType.names;
                  CantonTaxes.findOneAndUpdate(query, resultSet[0],{ new: true, upsert: true }, (err, result) => {
                    if (err) {
                      res.send(err);
                    } else {
                      showActive(data, res);
                    }
                  });
               }
              });
             
       }
   }
  }

 