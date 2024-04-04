// // const mongoose = require("mongoose");
// // const cardCategorySchema = new mongoose.Schema({
// //   type: {
// //     type: String,
// //     required: true,
// //     enum: ["videocard"],
// //   },

// //   brandName: String,

// //   dateOfCreation: {
// //     type: Date,
// //     default: Date.now(),
// //   },
// //   // type brandName drName DOC

// //   drName: String,
// //   topic: String,
// //   speakerName: String,
// //   day: String,
// //   date: Date,
// //   time: String,
// //   // videoname:String,
// //   layoutname: String,
// // });

// // const userSchema = new mongoose.Schema({
// //   USERNAME: {
// //     type: String,
// //     // required: true,
// //   },
// //   COMPANYNAME: {
// //     type: String,
// //     // required: true,

// //   },

// //   MRID: {
// //     type: String,
// //     // required: true,
// //     unique: true,
// //   },
// //   PASSWORD: {
// //     type: String,
// //     // required: true,
// //   },

// //   loginLogs: [
// //     {
// //       timestamp: {
// //         type: Date,
// //         default: Date.now,
// //       },
// //       cnt: {
// //         type: Number,
// //         required: false,
// //         default: 0,
// //       },
// //     },
// //   ],
// //   cardCategories: [cardCategorySchema],
// // });

// // const User = mongoose.model("User", userSchema);

// // module.exports = User;


// const mongoose = require("mongoose");

// const cardCategorySchema = new mongoose.Schema({
//   type: {
//     type: String,
//     required: true,
//     enum: ["videocard"],
//   },
//   brandName: String,
//   dateOfCreation: {
//     type: Date,
//     default: Date.now(),
//   },
//   drName: String,
//   topic: String,
//   speakerName: String,
//   day: String,
//   date: Date,
//   time: String,
//   layoutname: String,
//   expiryDates: {
//     type: Map,  // Using Map to store dynamic keys (company names) and their corresponding expiry dates
//     of: Date,
//   },
// });


// const expiryschema = new mongoose.Schema({
//      expiryDates: {
//     type: Map,  // Using Map to store dynamic keys (company names) and their corresponding expiry dates
//     of: Date,
//   },
// })








// const userSchema = new mongoose.Schema({
//   USERNAME: {
//     type: String,
//   },
//   COMPANYNAME: {
//     type: String,
//   },
//   MRID: {
//     type: String,
//     unique: true,
//   },
//   PASSWORD: {
//     type: String,
//   },
//   loginLogs: [
//     {
//       timestamp: {
//         type: Date,
//         default: Date.now,
//       },
//       cnt: {
//         type: Number,
//         required: false,
//         default: 0,
//       },
//     },
//   ],
//   cardCategories: [cardCategorySchema],
//   expirydates:[{}]
// });

// const User = mongoose.model("User", userSchema);

// module.exports = User;

const mongoose = require('mongoose');
const cardCategorySchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['videocard']
    },
    doctorName: String,
    videoname: String,
    fileName: String,
    dateOfCreation: {
        type: Date,
        default: Date.now // Automatically stores the current date and time
    },
    timeOfCreation: {
        type: String,
        default: () => {
            const currentTime = new Date();
            const hours = currentTime.getHours().toString().padStart(2, '0'); // Ensure two digits with leading zero
            const minutes = currentTime.getMinutes().toString().padStart(2, '0'); // Ensure two digits with leading zero
            const seconds = currentTime.getSeconds().toString().padStart(2, '0'); // Ensure two digits with leading zero
            return `${hours}:${minutes}:${seconds}`;
        }
    },
    cardCategories: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
const userSchema = new mongoose.Schema({
    USERNAME: {
        type: String,
        // required: true,

    },
    MRID: {
        type: String,
        // required: true,
        unique: true
    },
    PASSWORD: {
        type: String,
        // required: true,
    },
    EMAIL: {
        type: String,
        //  required: true,
        // unique: true,
    },
    ROLE: {
        type: String,
        // required: true,
    },
    HQ: {
        type: String,
        // required : true,
    },

    REGION: {
        type: String,
        // required:true,
    },
    BUSINESSUNIT: {
        type: String,
        // required:true

    },
    DOJ: {
        type: String,
        // required:true
    },


    loginLogs: [
        {
            timestamp: {
                type: Date,
                default: Date.now,
            },
            cnt: {
                type: Number,
                required: false,
                default: 0
            },
        },
    ],
    cardCategories: [cardCategorySchema],
});

// userSchema.pre('save', function (next) {
//     // Check if this is a new user (first login)
//     if (this.isNew) {
//         this.loginLogs = [{
//             timestamp: Date.now(),
//             cnt: 1,
//         }];
//     } else {
//         // This is an existing user; update the loginLogs
//         const lastLog = this.loginLogs[this.loginLogs.length - 1];
//         this.loginLogs.push({
//             timestamp: Date.now(),
//             cnt: lastLog.cnt + 1,
//         });
//     }
//     next();
// });


const User = mongoose.model('User', userSchema);
const UsageModel = mongoose.model('UsageData', cardCategorySchema);

module.exports = { User, UsageModel };
