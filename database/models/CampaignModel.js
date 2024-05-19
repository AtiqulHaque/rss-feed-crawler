const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const CampaignSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            trim: true,
            required: [true, 'Please fill your campaign name'],
        },
        feed_url: {
            type: String,
            unique: true,
            required: [true, 'Please fill your feed Url name'],
        },
        run_frequency: {
            type: Number,
            default: 4,
        },
        max_running_time: {
            type: Number,
            default: 30,
        },
        status: {
            type: String,
            default: 'inActive',
        },
        last_running_time: {
            type: Date,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        versionKey: false,
    }
);

CampaignSchema.plugin(mongoosePaginate);

const Campaign = mongoose.model('Campaign', CampaignSchema, 'campaigns');

module.exports = Campaign;
