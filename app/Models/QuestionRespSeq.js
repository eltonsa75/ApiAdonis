'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class QuestionRespSeq extends Model {
    static get table() {
        return "question_resps_seq"
    }

    static get createdAtColumn(){
        return null
    }

    static get updatedAtColumn(){
        return null
    }

}

module.exports = QuestionRespSeq
