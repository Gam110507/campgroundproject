import mongoose, { mongo } from "mongoose";
const CampgroundSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,'Please add a name'],
        unique: true,
        trim: true,
        maxlenght: [50,'Name can not be more than 50 characters']
    },
    address : {
        type : String,
        required : [true,'Please add an address']
    },
    district:{
        type : String,
        required : [true,'Please add a district']
    },
    province : {
        type : String,
        required : [true,'Please add a province']
    },
    postalcode : {
        type : String,
        required : [true,'PLease add a postalcode'],
        maxlenght : [5,'Postal Code can not be more than 5 digits']
    },
    tel : {
        type : String,
    },
    region: {
        type : String,
        required : [true,'Please add a region']
    },
        picture: {
        type: String,
        default: ''
    }
}) ;

const Campground = mongoose.models.Campground || mongoose.model("Campground",CampgroundSchema) ;
export default Campground ;