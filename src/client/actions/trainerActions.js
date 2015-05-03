"use strict";

var constants = require("./../mfConstants");
var trainerRepository = require("./../repositories/trainerRepository");

module.exports = {
        'serviceActions': {
            'AddTrainer': {
                'actionName': constants.TRAINERS.ADD_TRAINER,
                'action': function (trainer) {
                    return trainerRepository[constants.TRAINERS.ADD_TRAINER](trainer);
                }
            },
            'loadTrainerSummaries': {
                'actionName': constants.TRAINERS.LOAD_TRAINER_SUMMARIES,
                'action': function () {
                    return trainerRepository[constants.TRAINERS.LOAD_TRAINER_SUMMARIES]();
                }
            }
        }
};
