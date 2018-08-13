import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Leavescalc } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
    Leavescalc.find(query, select, cursor)
    .then((leavescalcs) => leavescalcs.map((leavescalc) => leavescalc.view()))
    .then(success(res))
    .catch(next)
}
export const getLeaveByEmpId = ({params}, res, next) => {
    const startDt = params.id + "-01";
    const endDt = params.id + "-31";
    Leavescalc.aggregate([
        { "$unwind": "$timeOff.timeOffOverview.myRequests"},
        // Group on the "_id" and "name" and $sum "value"
        { "$group": {
            "_id": { 
                "employee_id": "$personalInformation.biographicalInformation.biographicalInformation.employeeId",
                "name": "$timeOff.timeOffOverview.myRequests.timeOffType"           
            },        
            "value": { "$sum": { "$cond": [
                 { "$and": [ {$eq: [ "$timeOff.timeOffOverview.myRequests.status", "Approved" ]},
                 {$gte: ["$timeOff.timeOffOverview.myRequests.startDate", new Date(startDt)]},
                 {$lt: ["$timeOff.timeOffOverview.myRequests.startDate", new Date(endDt)]}
                 ] },
                 '$timeOff.timeOffOverview.myRequests.days', null
             ]} } 
        }},        
        // Put things into an array for "nice" processing
        { "$group": {      
            "_id": "$_id.employee_id", 
            "values": { "$push": { 
                "name": "$_id.name",
                "value": "$value",
                "employee_id": "$_id.employee_id"           
            }}
        }}]
        , (err, resp) => {
            if (err) {
                res.send(err);
            } else {
                res.send(resp);
            }
        }
    )
}
export const show = ({params}, res, next) => {
    // console.log('params', params.id);
    const startDt = params.id + "-01";
    const endDt = params.id + "-31";
    // console.log('endDt -', endDt, 'startDt -', startDt);
    Leavescalc.aggregate([
        {
            $match: {
                "timeOff.timeOffOverview.myRequests.startDate" : { $gte:new Date(startDt), $lt: new Date(endDt) }
            }
        }, {
            $project: {
                "personalInformation.personalInformation.personalInformation": "$personalInformation.personalInformation.personalInformation",
                "personalInformation.biographicalInformation.biographicalInformation": "$personalInformation.biographicalInformation.biographicalInformation",
                "timeOff.timeOffOverview.timeOffBalance":"$timeOff.timeOffOverview.timeOffBalance",
                "timeOff.timeOffOverview.myRequests": {
                    $filter: {
                        input: "$timeOff.timeOffOverview.myRequests",
                        as: "item",
                        cond: { $and:[{$eq: [ "$$item.status", "Approved" ]}, {
                            $gte: ["$$item.startDate", new Date(startDt)]
                        },{$lt: ["$$item.startDate", new Date(endDt)]}
                    ]}
                    }
                }
            }
        }
    ], (err, resp) => {
        if (err) {
            res.send(err);
        } else {
            res.send(resp);
        }
    })
}