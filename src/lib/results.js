import mongoose from "mongoose";

const resultsSchema = new mongoose.Schema(
    {
        firstname : {
            type : String
        },

        othernames : {
            type : String
        },

        regNo : {
            type : String
        },

        date : {
            type : String
        },

        image : {
            type : String,
        },

        primary : {

            section : {
                type : String
            },

            studentClass : {

                activity1 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                activity2 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                activity3 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                basic1 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },
                        
                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                basic2 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                basic3 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                basic4 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                basic5 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
            },
        },

        secondary : {

            section : {
                type : String
            },
            
            studentClass : {

                JSS1 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                JSS2 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                JSS3 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                SS1 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
                SS2 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                },
                SS3 : {

                    class : {
                        type : String
                    },

                    Firstterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },

                    Secondterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    },
                    Thirdterm : {

                        term : {
                            type : String,
                        },

                        firstTest : [],
                        secondTest : [],
                        exam : [],
                        overall : []
                    }
                },
            }
        },

    },
    
);

export const Results = mongoose.models?.Results || mongoose.model('Results', resultsSchema);