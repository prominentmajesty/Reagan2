import mongoose from "mongoose";

const primarySchema = new mongoose.Schema(
    {
        RegNo : {
            type : String,
            required : true
        },

        firstName : {
            type : String,
            required : true
        },

        lastName : {
            type : String,
            required : true
        },

        section : {
            type : String,
            required : true
        },

        date : {
            type : String,
            required : true
        },

        term : {
            type : String,
            required : true,
        },

        image : {
            type : String,
        },

        primary : {

            studentClass : {
                activity1 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                activity2 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                activity3 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                basic1 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                basic2 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                basic3 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                basic4 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                basic5 : {
                    firstTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    secondTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    thirdTerm : {
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
            }
        }

    },
    {timestamps : true}
);

export const Primary = mongoose.models?.Primary || mongoose.model('Primary', primarySchema);