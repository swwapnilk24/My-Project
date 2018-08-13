import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { MasterValue } from '.'

// Checking the json or nested array is empty or not
// Check if record exist or not 
// If record doesn't exists adding new record
export const create = (data, res, next) => {
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
        if(Object.keys(data.body.masterData).length === 0 ){
            res.send("Array is empty ")
         }else if(Object.keys(data.body.masterData.masterDataValue).length === 0){
            res.send("MasterDataValue array is empty")
         }else if(Object.keys(data.body.masterData.masterDataValue.names).length === 0){
            res.send("Names array is empty")
         }else{
            var code = data.body.masterData.masterDataValue.code;
            var enName = data.body.masterData.masterDataValue.names.en_label;
            var frName = data.body.masterData.masterDataValue.names.fr_label;

            if(data.body.masterData.masterDataValue.type_id == null || data.body.masterData.masterDataValue.type_id == undefined){
                res.send('Type id is empty or null')
            }else{
                MasterValue.find({ $or: [{ "masterDataValue.code": { $exists: true, $in: [ code ] }},
                    {
                        $and: [
                            { "masterDataValue.code": { $exists: true, $in: [ code ] } },
                            { "masterDataValue.names.en_label": { $exists: true, $in: [ enName ] } },
                            { "masterDataValue.names.fr_label": { $exists: true, $in: [ frName ] } }  
                        ] 
                    }                    
                ]                    
                 },function(err,resultSet){
                         if(err) {
                             res.send("Error"+err)
                         }else if(resultSet.length >= 1) {
                             res.send("Data already exists")
                         }else {
                             MasterValue.create(data.body.masterData)
                             .then((mastervalue) => mastervalue.view(false))
                             .then(success(res, 201))
                             .catch(next)
                         }
                    })
            } 
         }
     } 
}

export const showData = ({}, res, next) => {
    MasterValue.find()
               .then(notFound(res))
               .then(success(res,201))
               .catch(next)
}

export const getRecordsById = ({ params }, res, next) => {

    MasterValue.findById(params.id, function(err, resultSet){
        if(err){
            // res.send('Error '+err);
            res.send('No data found')
        }else{
            res.send(resultSet)
        }          
    })    
}

// Checking the json or nested array is empty or not
// Updating the records if data passwed as null
// If record doesn't exists adding new record
export const updateRecordsById = (data, res, next) => {    
    var code ='',typeId ='',enLabel='',frLabel='';
    var bodyData = data.body.masterData;
    if (Object.keys(data.body).length === 0) {
        res.send("empty body")
     }else{
         if(Object.keys(data.body.masterData).length === 0 ){
            res.send("Array is empty ")
         }else if(Object.keys(data.body.masterData.masterDataValue).length === 0){
            res.send("masterDataValue array is empty")
         }
        //  else if(Object.keys(data.body.masterData.masterDataValue.names).length === 0){
        //     res.send("Names array is empty")
        //  }
         else{
            MasterValue.findOne( { 'masterDataValue._id': data.params.id }, function(err,resultSet){
                if(err)
                    res.send('Err ' +err)
                else{
                    
                    
        
                    if(bodyData.masterDataValue.code == null || bodyData.masterDataValue.code == undefined)
                        code = resultSet.masterDataValue.code;
                    else
                        code = bodyData.masterDataValue.code;
        
                    if(bodyData.masterDataValue.type_id == null || bodyData.masterDataValue.type_id == undefined)
                        typeId = resultSet.masterDataValue.type_id;
                    else
                        typeId = bodyData.masterDataValue.type_id;

                    if(!bodyData.masterDataValue.names){
                        enLabel = resultSet.masterDataValue.names.en_label;
                        frLabel = resultSet.masterDataValue.names.fr_label;
                    }else{
                        if(bodyData.masterDataValue.names.fr_label == null || bodyData.masterDataValue.names.fr_label == undefined)
                            frLabel = resultSet.masterDataValue.names.fr_label;
                        else
                            frLabel = bodyData.masterDataValue.names.fr_label;
            
                        if(bodyData.masterDataValue.names.en_label ==null || bodyData.masterDataValue.names.en_label == undefined)
                            enLabel = resultSet.masterDataValue.names.en_label;
                        else
                            enLabel = bodyData.masterDataValue.names.en_label;
                    }
                   
                    
                    var modifyParams = {
                        "masterDataValue.code": code,
                        "masterDataValue.type_id": typeId,
                        "masterDataValue.names.en_label": enLabel,
                        "masterDataValue.names.fr_label": frLabel,
                    } 
                    MasterValue.findOneAndUpdate( { 'masterDataValue._id': data.params.id }, 
                                          { $set: modifyParams },
                                          {new: true, upsert: true}
                                        )
                       .then((mastervalue) => mastervalue.view(true))
                       .then(success(res, 201))
                       .catch(next)
                    // res.send(modifyParams);
                }
            }) 
         }
     }         
}

export const destroy = ({ params }, res, next) =>
    MasterValue.findById(params.id)
        .then(notFound(res))
        .then((mastervalue) => mastervalue ? mastervalue.remove() : null)
        .then(success(res, 204))
        .catch(next)