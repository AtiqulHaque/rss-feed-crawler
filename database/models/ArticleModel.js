const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ArticleSchema = new mongoose.Schema(
    {
        campaign_id: {
            type: String,
        },
        title: {
            type: String,
        },
        topic: {
            type: String,
        },
        content: {
            type: String,
        },
        pub_Date: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    }
);

ArticleSchema.plugin(mongoosePaginate);

const Article = mongoose.model('Article', ArticleSchema, 'articles');

module.exports = Article;
