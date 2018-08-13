import mongoose, {Schema} from 'mongoose';
const errorDescriptorSchema = new Schema({ 
    errorCode: {
        type: String,
        required: true
    },
    errorDescription: {
        type: String,
        required: true
    }
 });
const errorCodeMasterDataScheme = new Schema({
   errorDescriptor: errorDescriptorSchema
});
const model = mongoose.model('ErrorCode', errorCodeMasterDataScheme);
export default model;