const pool = require('../../config/database')
class BaseRepository {
    constructor(models) {
        this.models = models;
    }
    static async fillable() {

    }
}