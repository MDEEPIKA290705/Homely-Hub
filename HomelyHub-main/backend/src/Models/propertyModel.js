import mongoose from "mongoose";
import slugify from "slugify";

const propertySchema = new mongoose.Schema(
    {
        propertyName: {
            type: String,
            required: [true, "Please enter your Property name"],
            trim: true
        },

        description: {
            type: String,
            required: [true, "Please enter your Property description"],
            trim: true
        },

        extraInfo: {
            type: String,
            default: "Check-in on time."
        },

        propertyType: {
            type: String,
            enum: ["House", "Flat", "Guest House", "Hotel"],
            default: "House"
        },

        roomType: {
            type: String,
            enum: [
                "Anytype",
                "Entire Home",
                "Room"
            ],
            default: "Anytype"
        },

        maximumGuest: {
            type: Number,
            required: [true, "Please enter maximum guest"]
        },

        amenities: [
            {
                name: {
                    type: String,
                    required: true,
                    trim: true,
                    set: (value) => {
                        const normalized = String(value || "").trim();
                        const map = {
                            wifi: "Wifi",
                            kitchen: "Kitchen",
                            ac: "AC",
                            "washing machine": "Washing Machine",
                            tv: "TV",
                            pool: "Pool",
                            "free parking": "Free Parking"
                        };
                        return map[normalized.toLowerCase()] || normalized;
                    },
                    enum: [
                        "Wifi",
                        "Kitchen",
                        "AC",
                        "Washing Machine",
                        "TV",
                        "Pool",
                        "Free Parking"
                    ]
                },

                icon: {
                    type: String,
                    required: true
                }
            }
        ],

        images: {
            type: [
                {
                    public_id: {
                        type: String
                    },

                    url: {
                        type: String,
                        required: true
                    }
                }
            ],

            validate: {
                validator: function (arr) {
                    return arr.length >= 6;
                },
                message: "Please upload at least 6 images"
            }
        },

        price: {
            type: Number,
            required: [true, "Please enter your Property price"],
            default: 500
        },

        address: {
            area: {
                type: String
            },

            city: {
                type: String
            },

            state: {
                type: String
            },

            pincode: {
                type: Number
            }
        },

        currentBookings: [
            {
            bookingId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Booking"
            },
            fromDate:{
                type:Date
            },
            toDate:{
                type:Date,
            },
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
                
            }
            }
        ],
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        slug: String,
        checkInTime: {type: String,default: "11:00"},
        checkOutTime: {type: String,default: "13:00"}


    }

)

propertySchema.pre("save", function () {
    this.slug = slugify(this.propertyName, { lower: true });
    
})

propertySchema.index("save",function(){
    this.address.city = this.address.city.toLowerCase().replace(" ","");
    
})

//const Property = mongoose.model("Property", propertySchema);
const Property=mongoose.model.Property||mongoose.model("Property",propertySchema);

export default Property ;
