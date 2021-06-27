import mongoose from 'mongoose';

const mailSchema = mongoose.Schema({
    creater : String,
    to: String,
    cc: String,
    subject: String,
    scheduled : Boolean,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

export default mongoose.model('Mails', mailSchema);
